import React, { useRef, useState } from "react";
import Logo from "../../../img/LOGO_NO_BACK.png";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import Receipt from "./Receipt";

const HotelReservationItem = ({ item, hotel, room, receipt }) => {
  const ref = useRef();

  return (
    <div className="col mb-3">
      <div
        className="row mx-2 mb-3 border"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#collapseExample${item.seqReservation}`}
      >
        <img
          className="col-4 img-thumbs bg-secondary"
          src={Logo}
          alt="logo"
        ></img>
        <div className="col-8 position-relative">
          <p className="fw-bold fs-5 text-truncate mt-2 mb-0">{hotel.name}</p>
          <p className="text-truncate" style={{ fontSize: "0.8rem" }}>
            {format(new Date(item.travelStartDate), "yyyy.MM.dd HH시") +
              " ~ " +
              format(new Date(item.travelEndDate), "yyyy.MM.dd HH시") +
              " " +
              item.travelfulltime +
              "시간"}
          </p>
        </div>
      </div>
      <div
        className="collapse m-2"
        id={`collapseExample${item.seqReservation}`}
      >
        <Receipt ref={ref} item={item} hotel={hotel} room={room} />
        <div className="">
          {/* 바로가기 */}
          <div>
            <p className="d-flex justify-content-end mx-3 mt-3">
              <ReactToPrint
                trigger={() => (
                  <p className="text-dark text-decoration-none bg-secondary-subtle p-2 rounded fw-bold mb-0">
                    <i className="bi bi-printer"></i>
                    영수증 출력
                  </p>
                )}
                content={() => ref.current}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelReservationItem;
