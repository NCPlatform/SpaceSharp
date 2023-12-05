import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import HotelReservationItem from "./NavComponents/HotelReservationItem";

const HotelReserveList = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const [sort, setSort] = useState("seqReservation");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [semiPage, setSemiPage] = useState(0);

  const goLastPage = () => {
    if (page + 1 === totalPages) {
      Swal.fire({
        icon: "warning",
        title: "마지막 페이지입니다",
        text: "페이지 이동이 불가능합니다",
      });
    } else {
      setPage(totalPages - 1);
      setSemiPage(5 * Math.floor(totalPages / 5));
    }
  };

  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [reservationPage, setReservationPage] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [receiptList, setReceiptList] = useState([]);
  const [totalPages, setTotalPages] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionUserDTO == null) {
      Swal.fire({
        title: "로그인 해주세요.",
        text: "로그인 후 이용 가능한 서비스입니다.",
        icon: "error",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } else {
      axios
        .get(
          `/user/getReservationList?page=${page}&size=${size}&sort=${sort},${sortDirection}&email=${sessionUserDTO.email}`
        )
        .then((res) => {
          setReservationPage(res.data.reservationPage.content);
          setTotalPages(res.data.reservationPage.totalPages);
          setRoomList(res.data.roomList);
          setHotelList(res.data.hotelList);
          setReceiptList(res.data.receiptList);
        })
        .catch((err) => console.log(err));
    }
  }, [sessionUserDTO, page, size, sort, sortDirection]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <div className="container" style={{ minHeight: "63.8vh" }}>
        <p className="fs-5 fw-bold text-center">예약 내역 리스트</p>
        <div className="text-end">
          <button
            className="btn"
            onClick={() => (
              setSort("travelStartDate"), setPage(0), setSemiPage(0)
            )}
          >
            이용일자순정렬
          </button>
          /
          <button
            className="btn"
            onClick={() => (
              setSort("seqReservation"), setPage(0), setSemiPage(0)
            )}
          >
            예약번호순정렬
          </button>
        </div>
        {reservationPage && hotelList && (
          <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
            {reservationPage.map((item, index) => (
              <HotelReservationItem
                key={index}
                item={item}
                hotel={hotelList[index]}
                room={roomList[index]}
                receipt={receiptList[index]}
              />
            ))}
          </div>
        )}
        <div className="text-center mb-3">
          <button
            className="btn btn-outline-dark mx-1 px-2"
            onClick={() => {
              page === 0
                ? Swal.fire({
                    icon: "warning",
                    title: "첫번째 페이지입니다",
                    text: "페이지 이동이 불가능합니다",
                  })
                : setPage(0);
              semiPage !== 0 && setSemiPage(0);
            }}
          >
            <i className="bi bi-chevron-double-left"></i>
          </button>
          <button
            className="btn btn-outline-dark mx-1 px-2"
            onClick={() =>
              semiPage === 0
                ? page === 0
                  ? Swal.fire({
                      icon: "warning",
                      title: "첫번째 페이지입니다",
                      text: "페이지 이동이 불가능합니다",
                    })
                  : setPage(0)
                : (setPage(semiPage - 1), setSemiPage(semiPage - 5))
            }
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          {Array.from({ length: 5 }).map(
            (item, idx) =>
              semiPage + idx < totalPages && (
                <button
                  key={idx}
                  className={
                    page === idx + semiPage
                      ? "btn btn-dark mx-1"
                      : "btn btn-secondary mx-1"
                  }
                  onClick={() => setPage(idx + semiPage)}
                >
                  {idx + 1 + semiPage}
                </button>
              )
          )}
          <button
            className="btn btn-outline-dark mx-1 px-2"
            onClick={() =>
              semiPage + 5 > totalPages || semiPage + 5 === totalPages
                ? page + 1 === totalPages
                  ? Swal.fire({
                      icon: "warning",
                      title: "마지막 페이지입니다",
                      text: "페이지 이동이 불가능합니다",
                    })
                  : setPage(totalPages - 1)
                : (setPage(semiPage + 5), setSemiPage(semiPage + 5))
            }
          >
            <i className="bi bi-chevron-right"></i>
          </button>
          <button
            className="btn btn-outline-dark mx-1 px-2"
            onClick={() => {
              goLastPage();
            }}
          >
            <i className="bi bi-chevron-double-right"></i>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HotelReserveList;
