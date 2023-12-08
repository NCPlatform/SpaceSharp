import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";
import NavEventDetail from "./NavComponents/NavEventDetail";

const NavEvent = () => {
  const [eventList, setEventList] = useState();
  const [deadline, setDeadline] = useState([]);
  const [couponList, setCouponList] = useState([]);

  useEffect(() => {
    axios
      .get(`user/getEventList`)
      .then((res) => {
        setEventList(res.data.eventList);
        setDeadline(res.data.deadline);
        setCouponList(res.data.couponList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Nav />
      <div className="container" style={{ minHeight: "63.8vh" }}>
        {deadline &&
          deadline.map((item, index) => (
            <div className="border-bottom mb-3 pb-3 text-center">
              <p className="fs-5 fw-bold">마감 임박 이벤트</p>
              <div className="position-relative">
                <img
                  style={{ width: "60%", height: "10rem", objectFit: "cover" }}
                  src={item.mainImg}
                  alt={item.mainImg}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={"#" + item.seqEvent}
                />
                <div
                  className="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-25"
                  style={{ width: "60%", height: "10rem" }}
                >
                  <div className="position-relative h-100">
                    <p className="position-absolute top-50 start-50 translate-middle fs-5 text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
              <NavEventDetail item={item} couponList={couponList} />
            </div>
          ))}
        <div className="mb-3 pb-3 text-center">
          {eventList && (
            <p className="fs-5 fw-bold text-center">진행중인 이벤트 목록</p>
          )}
          {eventList ? (
            eventList.map((item, index) => (
              <div key={index}>
                <div
                  className="position-relative mb-3"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={"#event" + item.seqEvent}
                >
                  <img
                    style={{
                      width: "60%",
                      height: "10rem",
                      objectFit: "cover",
                    }}
                    src={item.mainImg}
                    alt={item.mainImg}
                  />
                  <div
                    className="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-25"
                    style={{ width: "60%", height: "10rem" }}
                  >
                    <div className="position-relative h-100">
                      <p className="position-absolute top-50 start-50 translate-middle fs-5 text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
                <NavEventDetail item={item} couponList={couponList} />
              </div>
            ))
          ) : (
            <div>
              <p className="fs-4 fw-bold text-center">
                진행중인 이벤트가 아직 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NavEvent;
