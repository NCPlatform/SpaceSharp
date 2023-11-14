import React from "react";

const HotelReserve = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="mt-5">
              <p className="fw-bold">예약 공간</p>
              <ul
                className="list-group list-group-flush"
                style={{ borderTop: "5px solid purple" }}
              >
                <li className="list-group-item">*normalExplain</li>
                <li className="list-group-item">공간유형 *seqHotelCategory</li>
                <li className="list-group-item">예약인원 *people</li>
                <li className="list-group-item">추가인원 *reserveRule</li>
                <li className="list-group-item">아이콘 *TV~doorlock</li>
              </ul>
            </div>
            <div className="mt-5">
              <p className="fw-bold">예약 정보</p>
              <ul
                className="list-group list-group-flush"
                style={{ borderTop: "5px solid purple" }}
              >
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">공간유형</span>
                    <span>YYYY.MM.DD</span>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">예약인원</span>
                    <span>n명</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mt-5 row  me-0">
              <p className="fw-bold">결제예정금액</p>
              <ul className="list-group list-group-flush me-0">
                <li
                  className="list-group-item me-0"
                  style={{ fontSize: "0.8rem", borderTop: "5px solid purple" }}
                >
                  <span className="fw-bold me-1">예약날짜</span>
                  <span>YYYY.MM.DD</span>
                </li>
                <li
                  className="list-group-item me-0"
                  style={{ fontSize: "0.8rem" }}
                >
                  <span className="fw-bold me-1">예약시간</span>
                  <span>start시~end시,total시간</span>
                </li>
                <li
                  className="list-group-item me-0"
                  style={{ fontSize: "0.8rem" }}
                >
                  <span className="fw-bold me-1">예약인원</span>
                  <span>n명</span>
                </li>
                <li
                  className="list-group-item"
                  style={{ borderTop: "5px solid purple" }}
                >
                  <h3
                    className="fw-bold d-flex justify-content-between"
                    style={{ color: "purple" }}
                  >
                    <span>￦</span>
                    <span>n</span>
                  </h3>
                </li>
              </ul>
              <button
                className="d-flex btn justify-content-center"
                style={{
                  backgroundColor: "purple",
                  borderRadius: 0,
                  color: "yellow",
                }}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelReserve;
