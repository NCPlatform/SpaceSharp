import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import HotelItemCard from "./HotelItemCard";
import ReviewItemCard from "./ReviewItemCard";
import styles from "../../css/BoardList.module.css";

const HotelReviewList = () => {
  const [tab, setTab] = useState("review");

  const [list, setList] = useState([]);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [semiPage, setSemiPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

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
      if (tab === "review") {
        axios
          .get(
            `/user/getReviewList?page=${page}&size=${size}&email=${sessionUserDTO.email}`
          )
          .then((res) => {
            console.log(res.data);
            setList(res.data.list);
            setTotalPages(res.data.totalPages);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .get(
            `/user/getQnAList?page=${page}&size=${size}&email=${sessionUserDTO.email}`
          )
          .then((res) => {
            console.log(res.data);
            setList(res.data.list);
            setTotalPages(res.data.totalPages);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [tab, sessionUserDTO, page, size]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <div className="container" style={{ minHeight: "63.8vh" }}>
        <p className="fs-3 fw-bold text-center">
          {tab === "review" ? <>이용 후기 관리</> : <>QnA관리</>}
        </p>
        <div className="row row-cols-2 fs-5 text-center">
          <div
            className={
              tab === "review"
                ? "col btn rounded-0 fourthBackColor py-3"
                : "col btn rounded-0 bg-secondary py-3"
            }
            style={{ borderTop: "3px solid rgb(134, 163, 184)" }}
            onClick={() => (
              setTab("review"), setPage(0), setSemiPage(0), setList([])
            )}
          >
            이용후기
          </div>
          <div
            className={
              tab === "QnA"
                ? "col btn rounded-0  fourthBackColor py-3"
                : "col btn rounded-0 bg-secondary py-3"
            }
            style={{ borderTop: "3px solid rgb(134, 163, 184)" }}
            onClick={() => (
              setTab("QnA"), setPage(0), setSemiPage(0), setList([])
            )}
          >
            Q&A
          </div>
        </div>
        {tab === "review" ? (
          list.length > 0 ? (
            <div className="row row-cols-2 mt-3">
              {list.map((item, index) => (
                <div className="col" key={index}>
                  <Link
                    to={"/detail/" + item.reservedHotel.seqHotel}
                    style={{ textDecoration: "none" }}
                  >
                    <ReviewItemCard reviewListItem={item} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 text-center">
              <h1>아직 등록하신 리뷰가 없습니다.</h1>
            </div>
          )
        ) : list.length > 0 ? (
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col-1" className={styles.BoardListTh1}></th>
                <th scope="col-5" className={styles.BoardListTh2}>
                  제목
                </th>
                <th scope="col-3" className={styles.BoardListTh3}>
                  이름
                </th>
                <th scope="col-3" className={styles.BoardListTh4}>
                  등록일
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr>
                  <td className="text-center">{item.seqBoard}</td>
                  <td>
                    <Link
                      to={`/boardDetail/${item.seqBoard}`}
                      className="text-truncate text-decoration-none text-dark"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="text-center">{item.email}</td>
                  <td className="text-center">
                    {new Date(item.releaseDate).toLocaleDateString("ko-KR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mt-5 text-center">
            <h1>아직 등록하신 글이 없습니다.</h1>
          </div>
        )}

        {totalPages ? (
          <div className="text-center my-3">
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
        ) : (
          <></>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HotelReviewList;
