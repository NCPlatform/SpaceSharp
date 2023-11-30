import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "../../css/main_nav_tab.css";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { $ } from "react-jquery-plugin";
import { Card } from "react-bootstrap";

import axios from "axios";
import { Link } from "react-router-dom";
import { options } from "@fullcalendar/core/preact";
import Footer from "./Footer";
import HotelItemCard from "./HotelItemCard";
import ReviewItemCard from "./ReviewItemCard";

const Main = () => {
  const [activeTab, setActiveTab] = useState("total");
  const [hotelCategoryList, setHotelCategoryList] = useState([]);
  const [newHotelList, setNewHotelList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    axios
      .post("/user/mainPage", null, {})
      .then((res) => {
        setNewHotelList(res.data.hotelList);
        setHotelCategoryList(res.data.categoryList);
        setReviewList(res.data.reviewCardList);
        setEventList(res.data.eventList);
      })
      .catch((error) => console.log(error));
  }, []);

  const options = {
    loop: true,
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
      992: {
        items: 2,
      },
      1400: {
        items: 3,
      },
    },
  };

  return (
    <>
      {/* <NavOffcanvas /> */}
      <Nav />

      {/* Carousel */}
      <div className="container">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner rounded">
            <div className="carousel-item active">
              <img
                src="https://tourimage.interpark.com/BBS/Tour/FckUpload/202011/6374206851388933880.jpg"
                className="d-block w-100"
                style={{ height: "15vw", objectFit: "cover" }}
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://joyparty.co.kr//data/goods/20/09/38/1000068206/1000068205_detail_048.jpg"
                className="d-block w-100"
                style={{ height: "15vw", objectFit: "cover" }}
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://t1.daumcdn.net/cfile/tistory/99CCBB455C46B97235"
                className="d-block w-100"
                style={{ height: "15vw", objectFit: "cover" }}
                alt=""
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
            style={{ margin: 0, padding: 0, left: 0, width: "5%" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-caret-left-fill"
              viewBox="0 0 16 16"
            >
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
            style={{ margin: 0, padding: 0, right: 0, width: "5%" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* main mid select category */}
      <div className="container pt-4">
        <h5 className="fw-bold text-center">찾는 공간이 있나요?</h5>
        <div
          className="nav nav-tabs mb-3 mainNav row row-cols-6"
          id="place-tab"
          role="tablist"
        >
          <button
            className={
              activeTab === "total"
                ? "nav-link col border-0 active"
                : "nav-link col border-0"
            }
            id="total-tab"
            onClick={() => setActiveTab("total")}
          >
            전체
          </button>
          <button
            className={
              activeTab === "gather"
                ? "nav-link col border-0 active"
                : "nav-link col border-0"
            }
            id="gather-tab"
            onClick={() => setActiveTab("gather")}
          >
            모임
          </button>
          <button
            className={
              activeTab === "practice"
                ? "nav-link col border-0 active"
                : "nav-link col border-0"
            }
            id="practice-tab"
            onClick={() => setActiveTab("practice")}
          >
            연습
          </button>
          <button
            className={
              activeTab === "picture"
                ? "nav-link col border-0 active"
                : "nav-link col border-0"
            }
            id="picture-tab"
            onClick={() => setActiveTab("picture")}
          >
            촬영
          </button>
          <button
            className={
              activeTab === "perade"
                ? "nav-link col border-0 active"
                : "nav-link col border-0"
            }
            id="perade-tab"
            onClick={() => setActiveTab("perade")}
          >
            행사
          </button>
          <button
            className={
              activeTab === "office"
                ? "nav-link col border-0 active"
                : "nav-link col border-0"
            }
            id="office-tab"
            onClick={() => setActiveTab("office")}
          >
            오피스
          </button>
        </div>
        <div className="row row-cols-4 row-cols-sm-4 row-cols-md-6">
          {activeTab === "total"
            ? hotelCategoryList.map((item, index) => {
                return (
                  <Link
                    to={`hotelList/${item.seqHotelCategory}`}
                    key={index}
                    className="hotelCategoryList"
                  >
                    <div className="col my-3 text-center">
                      <p className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-cursor-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
                        </svg>
                      </p>
                      <span className="hotelCategoryListName">{item.name}</span>
                    </div>
                  </Link>
                );
              })
            : hotelCategoryList
                .filter((item) => item.tab === activeTab)
                .map((item, index) => {
                  return (
                    <Link
                      to={`hotelList/${item.seqHotelCategory}`}
                      key={index}
                      className="hotelCategoryList"
                    >
                      <div className="col my-3 text-center" key={index}>
                        <p className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-cursor-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
                          </svg>
                        </p>
                        <span style={{ color: "#999", fontSize: "0.8rem" }}>
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
        </div>
      </div>

      {/* Event */}
      {/* Carousel */}
      <div className="container">
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner rounded">
            {eventList &&
              eventList
                .filter(
                  (item) =>
                    new Date(item.finishDate).toLocaleDateString("ko-KR") >=
                    new Date().toLocaleDateString("ko-KR")
                )
                .map((item, index) => (
                  <div className="carousel-item active" data-bs-interval="3000">
                    <img
                      src={item.mainImg}
                      className="d-block w-100"
                      style={{ height: "25vw", objectFit: "cover" }}
                      alt=""
                    />
                    <div
                      className="carousel-caption d-none d-md-block bg-dark bg-opacity-25 w-100 px-0 mx-0"
                      style={{ right: 0, left: 0 }}
                    >
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* new Item with Owl Carousel*/}
      <div className="container mt-5">
        <h5 className="fw-bold">새로 등록됐어요</h5>
        {newHotelList.length > 0 && (
          <OwlCarousel className="owl-theme" {...options}>
            {newHotelList.map((item, index) => (
              <div className="item" key={index}>
                <Link
                  to={"/detail/" + item.seqHotel}
                  style={{ textDecoration: "none" }}
                >
                  <HotelItemCard item={item} />
                </Link>
              </div>
            ))}
          </OwlCarousel>
        )}
      </div>
      <div className="container mt-5">
        <h5 className="fw-bold">방금 올라온 이용후기에요</h5>
        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3">
          {reviewList &&
            reviewList.map((item, idx) => (
              <div className="px-3" key={idx}>
                <ReviewItemCard reviewListItem={item} />
              </div>
            ))}
        </div>
      </div>
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          <div className="px-3">
            <div className="card">
              <h1>게임</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
