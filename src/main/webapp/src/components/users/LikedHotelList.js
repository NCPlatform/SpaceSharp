import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import HotelItemCard from "./HotelItemCard";
import { Col } from "react-bootstrap";
import axios from "axios";

const LikedHotelList = () => {
  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const navigate = useNavigate();
  const [hotelList, setHotelList] = useState([]);
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
        .get(`/user/getLikedHotel?email=${sessionUserDTO.email}`)
        .then((res) => {
          setHotelList(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [sessionUserDTO]);
  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <div className="container" style={{ minHeight: "63.8vh" }}>
        <p className="fs-5 fw-bold text-center">찜한 공간 리스트</p>
        <div className="row">
          {hotelList.length !== 0 ? (
            hotelList.map((item, idx) => (
              <div className="col-xl-4 col-lg-6" key={idx}>
                <Link
                  to={"/detail/" + item.seqHotel}
                  style={{ textDecoration: "none" }}
                >
                  <Col>
                    <HotelItemCard item={item} />
                  </Col>
                </Link>
              </div>
            ))
          ) : (
            <div className="mt-5">
              <h1>아직 찜한 숙소가 없습니다.</h1>
              <h5>마음에 드는 숙소에 좋아요를 눌러주세요.</h5>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LikedHotelList;
