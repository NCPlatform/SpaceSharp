import React, { useCallback, useEffect, useState } from "react";

const EventCouponAdd = ({ couponList, eventDTO, setEventDTO }) => {
  const [checkedList, setCheckedList] = useState([]);

  const onCheckedItem = useCallback(
    (checked, item) => {
      if (checked) {
        setCheckedList((prev) => [...prev, item]);
      } else if (!checked) {
        setCheckedList(checkedList.filter((el) => el !== item));
      }
    },
    [checkedList]
  );

  return (
    <div
      className="modal fade"
      id="couponSelectList"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              CouponList
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body className">
            {couponList.map((coupon, index) => (
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={coupon.seqCoupon}
                  id={"coupon" + index}
                  onChange={(e) => {
                    onCheckedItem(e.target.checked, e.target.value);
                  }}
                />
                <label class="form-check-label" for={"coupon" + index}>
                  <span className="fs-5">{coupon.title}</span>
                  <br />
                  {coupon.content}
                </label>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              취소
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                setEventDTO({ ...eventDTO, couponSeq: checkedList.join(",") })
              }
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCouponAdd;
