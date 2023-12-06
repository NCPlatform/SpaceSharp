import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "axios";

const NavEvent = () => {
  const [eventList, setEventList] = useState();
  const [deadline, setDeadline] = useState([]);

  useEffect(() => {
    axios
      .get(`user/getEventList`)
      .then((res) => {
        console.log(res.data);
        setEventList(res.data.eventList);
        setDeadline(res.data.deadline);
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
            </div>
          ))}
        <div className="mb-3 pb-3 text-center">
          {eventList && (
            <p className="fs-5 fw-bold text-center">진행중인 이벤트 목록</p>
          )}
          {eventList ? (
            eventList.map((item, index) => (
              <div className="position-relative mb-3">
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
