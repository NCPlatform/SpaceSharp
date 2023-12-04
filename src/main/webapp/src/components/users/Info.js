import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";

import "../../css/MainInfo.css";

const Info = () => {
  const txt = "신개념 공간공유 플랫폼 스페이스 샤프";
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    AOS.init();
    const interval = setInterval(() => {
      setText(text + txt[count]);
      setCount(count + 1);
    }, 100);
    if (count === txt.length) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (text.length === txt.length) {
      setTimeout(() => {
        setText("");
        setCount(0);
      }, 2000);
    }
  }, [text]);

  return (
    <div>
      <Nav />
      <div style={{ minHeight: "63.8vh", wordBreak: "keep-all" }}>
        <div className="container-fluid  sectionInfo01 p-0">
          <div className="w-100 h-100 bg-dark bg-opacity-25 position-relative">
            <div className="position-absolute top-50 start-50 translate-middle text-center">
              <p className="fs-3 text-white p-0 m-0" data-aos="fade-up">
                공간 대여 서비스
              </p>
              <p className="fs-1 text-white fw-bold " data-aos="fade-up">
                SPACE SHARP
              </p>
            </div>
          </div>
        </div>
        <div
          className="container-fluid bg-body-secondary position-relative"
          style={{ height: "100vh" }}
        >
          <div className="position-absolute top-50 start-50 translate-middle text-center fs-5">
            <div className="row">
              <div className="col">
                <p data-aos="fade-up" className="mb-5">
                  공간은 소유하는 것이 아닌 공유하는 것!
                </p>
                <div data-aos="fade-up">
                  <p>저희 스페이스샵에서</p>
                  <p>소중한 사람과의</p>
                  <p>
                    소중한 시간들을 조금 더{" "}
                    <span className="fw-bold">가치있게 공유</span>하여 보세요.
                  </p>
                </div>
              </div>
              <div className="col" data-aos="flip-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="250"
                  height="250"
                  fill="currentColor"
                  className="bi bi-phone"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container-fluid bg-dark position-relative"
          style={{ height: "450px" }}
        >
          <div className="position-absolute top-50 start-50 translate-middle text-center fs-5">
            <p className="text-white fs-3">{text}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Info;
