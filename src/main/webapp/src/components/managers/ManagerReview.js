import React, { useEffect, useState } from "react";
import ManagerHeader from "./ManagerHeader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ImStarFull } from "react-icons/im";

const Review = () => {
  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const navigate = useNavigate();

  const [hotelList, setHotelList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [reservationList, setReservationList] = useState([]);
  const [commentList, setCommentList] = useState([]);

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
        .get(`/manager/getReviewList?email=${sessionUserDTO.email}`)
        .then((res) => {
          console.log(res.data);
          setHotelList(res.data.hotelList);
          setRoomList(res.data.roomList);
          setReservationList(res.data.reservationList);
          setCommentList(res.data.commentList);
        })
        .catch((err) => console.log(err));
    }
  }, [sessionUserDTO]);

  return (
    <>
      <ManagerHeader />
      <div className="container mt-5 pt-5">
        {commentList && commentList.length > 1 ? (
          <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3">
            {commentList &&
              commentList.map((comment, index) => (
                <div className="col" key={index}>
                  <div className="card">
                    {comment.picture && comment.picture.length !== 0 ? (
                      <img
                        src={comment.picture.split(", ")[0]}
                        alt="img"
                        style={{
                          objectFit: "cover",
                          height: "200px",
                          width: "100%",
                        }}
                      />
                    ) : (
                      <img
                        src="https://adventure.co.kr/wp-content/uploads/2020/09/no-image.jpg"
                        alt="img"
                        style={{
                          objectFit: "cover",
                          height: "200px",
                          width: "100%",
                        }}
                      />
                    )}
                    <div className="card-body">
                      <div className="card-title mt-1 mb-1 fw-bold">
                        {
                          hotelList.filter(
                            (hotel) =>
                              hotel.seqHotel ===
                              roomList.filter(
                                (room) =>
                                  room.seqRoom ===
                                  reservationList.filter(
                                    (reservation) =>
                                      reservation.seqReservation ===
                                      comment.seqReservation
                                  )[0].seqRoom
                              )[0].seqHotel
                          )[0].name
                        }
                      </div>
                      <div className="d-flex">
                        <p className="me-3 m-0">
                          {Array.from({ length: "5" }).map((_, index2) => (
                            <ImStarFull
                              key={index2}
                              className={
                                index2 < comment.rating
                                  ? "starLatingGray"
                                  : "starLatingBlack"
                              }
                              size="15"
                            />
                          ))}
                        </p>
                        <p
                          className="m-0 pt-1"
                          style={{ justifyContent: "center" }}
                        >
                          <span className="firstFontColor fw-bold">
                            {
                              roomList.filter(
                                (room) =>
                                  room.seqRoom ===
                                  reservationList.filter(
                                    (reservation) =>
                                      reservation.seqReservation ===
                                      comment.seqReservation
                                  )[0].seqRoom
                              )[0].price
                            }
                          </span>
                          원/시간
                        </p>
                      </div>
                      <div
                        className="my-3"
                        style={{
                          fontSize: "0.9rem",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          height: "3rem",
                        }}
                      >
                        {comment.comment}
                      </div>
                      <div className="text-truncate">
                        {hotelList
                          .filter(
                            (hotel) =>
                              hotel.seqHotel ===
                              roomList.filter(
                                (room) =>
                                  room.seqRoom ===
                                  reservationList.filter(
                                    (reservation) =>
                                      reservation.seqReservation ===
                                      comment.seqReservation
                                  )[0].seqRoom
                              )[0].seqHotel
                          )[0]
                          .keyword.split(",")
                          .map((item, index) => (
                            <span key={index} className="tag">
                              {"#" + item}
                            </span>
                          ))}
                      </div>
                      <div className="d-grid gap-2 mt-3">
                        <button
                          className="btn btn-dark"
                          type="button"
                          onClick={() =>
                            navigate(
                              `/detail/${
                                roomList.filter(
                                  (room) =>
                                    room.seqRoom ===
                                    reservationList.filter(
                                      (reservation) =>
                                        reservation.seqReservation ===
                                        comment.seqReservation
                                    )[0].seqRoom
                                )[0].seqHotel
                              }`
                            )
                          }
                        >
                          호텔 정보 보러가기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="bg-secondary-subtle rounded">
            <div className="mt-5 py-5 mb-5 text-center">
              <h1>
                {sessionUserDTO.name}사장님의 방에 작성된 후기가 없습니다.
              </h1>
              <h3>이용자분들의 후기를 기다려주세요</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Review;
