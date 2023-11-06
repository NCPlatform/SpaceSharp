import React from "react";
import ManagerHeader from "./ManagerHeader";

const DashBoard = () => {
  return (
    <>
      <ManagerHeader />
      <div className="container mt-5 pt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">RECENT RESERVATION</h5>
                <p className="card-text">최근 예약</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">RESERVATION</h5>
                <p className="card-text">예약 현황</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">REVIEW</h5>
                <p className="card-text">리뷰관리</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">MY PLACE</h5>
                <p className="card-text">대여 공간</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
