import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const NavEventDetail = ({ item, couponList }) => {
  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const getCoupon = (e) => {
    if (sessionUserDTO == null) {
      Swal.fire({
        title: "로그인 해주세요.",
        text: "로그인 후 이용 가능한 서비스입니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    } else {
      axios
        .get(
          `/user/getCoupon?email=${sessionUserDTO.email}&seqCoupon=${e.target.name}`
        )
        .then((res) => {
          if (res.data === "success") {
            Swal.fire({ icon: "success", text: "쿠폰 발급에 성공했습니다." });
          } else if (res.data === "fail") {
            Swal.fire({
              icon: "success",
              text: "발행된 쿠폰이 모두 소진되었습니다.",
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "쿠폰의 중복 소유는 불가능합니다.",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className="modal fade text-center"
      id={"event" + item.seqEvent}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-secondary">
            <h5 className="modal-title fw-bold">{item.title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body couponList">
            <div className="container py-5 bg-secondary rounded bg-opacity-10">
              <p className="fs-4 fw-bold">이벤트 상세 설명</p>
              <div className="">{item.content}</div>
            </div>

            {item.img && (
              <>
                <hr />
                <div className="container py-5 border border-2 border-secondary rounded">
                  <p className="fs-4 fw-bold">이벤트 상세 이미지</p>
                  {item.img.split(", ").map((item, index2) => (
                    <img
                      key={index2}
                      className="img-fluid"
                      src={item}
                      alt={item}
                    />
                  ))}
                </div>
              </>
            )}
            {item.couponSeq && (
              <>
                <hr />
                <div className="container py-5 bg-secondary rounded bg-opacity-10">
                  <p className="fs-4 fw-bold">이벤트 쿠폰</p>
                  {item.couponSeq.split(",").map((item, index2) => (
                    <div className="w-100 bg-dark-subtle border p-1 rounded my-2">
                      <div
                        key={index2}
                        className="d-flex justify-content-between"
                      >
                        <p className="fw-bold">
                          {
                            couponList.filter(
                              (coupon) => coupon.seqCoupon * 1 === item * 1
                            )[0].title
                          }
                        </p>
                        <button
                          name={item * 1}
                          className="btn"
                          onClick={(e) => getCoupon(e)}
                        >
                          발급받기
                        </button>
                      </div>
                      <div className="m-0 p-0">
                        <p className="text-start m-0 p-0">
                          {
                            couponList.filter(
                              (coupon) => coupon.seqCoupon * 1 === item * 1
                            )[0].content
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavEventDetail;
