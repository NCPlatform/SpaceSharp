import React from "react";
import Logo from "../../../img/LOGO_NO_BACK.png";
import { format } from "date-fns";

const HotelReservationItem = ({ item, hotel }) => {
  return (
    <div className="col">
      <div className="row mx-2 mb-3 border">
        <img
          className="col-4 img-thumbs bg-secondary"
          src={Logo}
          alt="logo"
        ></img>
        <div className="col-8">
          <p className="fw-bold fs-5 text-truncate mt-2 mb-0">{hotel.name}</p>
          <p style={{ fontSize: "0.8rem" }}>
            {format(new Date(item.travelStartDate), "yyyy.MM.dd HH시") +
              " ~ " +
              format(new Date(item.travelEndDate), "yyyy.MM.dd HH시") +
              " " +
              item.travelfulltime +
              "시간"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelReservationItem;
