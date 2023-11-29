import axios from 'axios';
import React, { useState } from 'react';

const CouponAdd = () => {
  const [couponDTO, setCouponDTO] = useState({
    title: '',
    content: '',
    couponType: '',
    discount: 0,
    cnt: 0,
  });

  const onSubmit = () => {
    axios
      .post('/admin/addCoupon', null, { params: couponDTO })
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="rounded bg-dark bg-opacity-25 couponList" style={{ height: '80vh', overflowY: 'scroll' }}>
      <p className="fs-4 p-2 pb-0 pt-3">쿠폰 추가</p>
      <hr />
      {/* 쿠폰 제목, 내용, 쿠폰타입, 할인금액, 몇명에게 발급가능한지 */}
      <div className="mb-2 p-2">
        <label htmlFor="title" className="form-label">
          쿠폰 이름
        </label>
        <input
          className="form-control"
          id="title"
          value={couponDTO.title}
          onChange={e => setCouponDTO({ ...couponDTO, title: e.target.value })}
        />
      </div>
      <div className="mb-2 p-2">
        <label htmlFor="content" className="form-label">
          쿠폰 내용
        </label>
        <textarea
          className="form-control"
          id="content"
          value={couponDTO.content}
          onChange={e => setCouponDTO({ ...couponDTO, content: e.target.value })}></textarea>
      </div>
      <div className="mb-2 p-2">
        <label htmlFor="discount" className="form-label">
          쿠폰 타입
        </label>
        <div className="input-group ">
          <select
            className="form-select"
            value={couponDTO.couponType}
            onChange={e => setCouponDTO({ ...couponDTO, couponType: e.target.value })}>
            <option value="none">🎫 쿠폰 타입</option>
            <option value="discount">금액권</option>
            <option value="percentage">비율할인권</option>
          </select>
          <input
            className="form-control text-end"
            id="discount"
            value={couponDTO.discount}
            onChange={e => setCouponDTO({ ...couponDTO, discount: e.target.value })}
          />
          {couponDTO.couponType !== 'none' && (
            <span className="input-group-text">{couponDTO.couponType === 'discount' ? <>원</> : <>%</>}</span>
          )}
        </div>
      </div>
      <div className="mb-2 p-2">
        <label htmlFor="cnt" className="form-label">
          발급 가능 개수
        </label>
        <div className="input-group ">
          <input
            className="form-control"
            id="cnt"
            value={couponDTO.cnt}
            onChange={e => setCouponDTO({ ...couponDTO, cnt: e.target.value })}
          />
          <span className="input-group-text">개</span>
        </div>
      </div>
      <div className="d-grid gap-2 p-2">
        <button className="btn btn-dark" onClick={() => onSubmit()}>
          버튼
        </button>
      </div>
    </div>
  );
};

export default CouponAdd;
