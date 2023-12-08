import React from 'react';

const CouponItem = ({ item, issuedCnt }) => {
  const { seqCoupon, title, content, couponType, discount, cnt } = item;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text text-truncate mb-0 pb-0 text-secondary">
          {couponType === 'discount' ? <>금액 할인권</> : <>퍼센트 할인권</>}
        </p>
        <div className="card-title text-truncate row">
          <p className="col fs-4 fw-bold">{title}</p>
          <p className="col text-end text-truncate text-secondary">
            {issuedCnt}/{cnt}
          </p>
        </div>
        <p className="card-text text-truncate">{content}</p>
      </div>
    </div>
  );
};

export default CouponItem;
