import React from "react";

import Swal from "sweetalert2";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const EventItem = ({ item }) => {
  // OwlCarousel Option
  const options = {
    loop: false,
    margin: 30,
    touchDrag: true,
    dots: false,
    navText: ["Prev", "Next"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 2,
      },
      1400: {
        items: 3,
      },
    },
  };

  return (
    <div
      className={
        new Date(item.finishDate) < new Date()
          ? "card bg-opacity-10 mb-3 bg-secondary"
          : new Date(item.finishDate) === new Date()
          ? "card bg-opacity-10 mb-3 bg-danger-subtle"
          : "card bg-opacity-10 mb-3"
      }
    >
      <div className="card-body">
        <div className="card-title text-truncate row">
          <p className="col fs-4 fw-bold">{item.title}</p>
          <p className="col text-end text-secondary">
            {new Date(item.startDate).toLocaleDateString("ko-KR")} ~{" "}
            {new Date(item.finishDate).toLocaleDateString("ko-KR")}
          </p>
        </div>
        <div>
          <pre>{item.content}</pre>
        </div>
        <div className="row mt-2 pt-3 border-top">
          <div className="col-6">
            <p className="fs-5">배너</p>
            <img
              src={item.mainImg}
              alt={item.mainImg}
              style={{ width: "100%", height: "8vw", objectFit: "cover" }}
              onClick={(e) => {
                Swal.fire({
                  imageUrl: e.target.src,
                  confirmButtonText: "닫기",
                });
              }}
            />
          </div>
          <div className="col-6">
            <p className="fs-5">이미지</p>
            <OwlCarousel className="owl-theme" {...options}>
              {item.img.split(", ").map((item, index2) => (
                <img
                  key={index2}
                  className="img col"
                  src={item}
                  alt={item}
                  style={{ height: "8vw", objectFit: "cover" }}
                  onClick={(e) => {
                    Swal.fire({
                      imageUrl: e.target.src,
                      confirmButtonText: "닫기",
                    });
                  }}
                />
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
