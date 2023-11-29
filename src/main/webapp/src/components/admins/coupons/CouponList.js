import React, { useState } from 'react';
import CouponItem from './CouponItem';
import Swal from 'sweetalert2';

const CouponList = ({ couponList, totalPages, issuedCouponList, setPage, page }) => {
  const [semiPage, setSemiPage] = useState(0);

  const goLastPage = () => {
    if (page + 1 === totalPages) {
      Swal.fire({ icon: 'warning', title: '마지막 페이지입니다', text: '페이지 이동이 불가능합니다' });
    } else {
      setPage(totalPages - 1);
    }
    if ((semiPage + 1) * 5 < totalPages) {
      setSemiPage(semiPage + 5);
    }
  };

  return (
    <div className="container couponList" style={{ height: '80vh', overflowY: 'scroll' }}>
      <p className="fs-2 fw-bold">쿠폰</p>
      {couponList.map((item, index) => (
        <CouponItem
          item={item}
          key={index}
          issuedCnt={issuedCouponList.filter(issued => issued.seqCoupon === item.seqCoupon).length}
        />
      ))}
      <div className="text-center">
        <button
          className="btn btn-outline-dark mx-1 px-2"
          onClick={() => {
            page === 0
              ? Swal.fire({ icon: 'warning', title: '첫번째 페이지입니다', text: '페이지 이동이 불가능합니다' })
              : setPage(0);
            semiPage !== 0 && setSemiPage(0);
          }}>
          <i class="bi bi-chevron-double-left"></i>
        </button>
        <button
          className="btn btn-outline-dark mx-1 px-2"
          onClick={() =>
            semiPage === 0
              ? page === 0
                ? Swal.fire({ icon: 'warning', title: '첫번째 페이지입니다', text: '페이지 이동이 불가능합니다' })
                : setPage(0)
              : (setPage(semiPage - 1), setSemiPage(semiPage - 5))
          }>
          <i class="bi bi-chevron-left"></i>
        </button>
        {Array.from({ length: 5 }).map(
          (item, idx) =>
            semiPage + idx < totalPages && (
              <button
                key={idx}
                className={page === idx + semiPage ? 'btn btn-dark mx-1' : 'btn btn-secondary mx-1'}
                onClick={() => setPage(idx + semiPage)}>
                {idx + 1 + semiPage}
              </button>
            )
        )}
        <button
          className="btn btn-outline-dark mx-1 px-2"
          onClick={() =>
            semiPage + 5 > totalPages || semiPage + 5 === totalPages
              ? page + 1 === totalPages
                ? Swal.fire({ icon: 'warning', title: '마지막 페이지입니다', text: '페이지 이동이 불가능합니다' })
                : setPage(totalPages - 1)
              : (setPage(semiPage + 5), setSemiPage(semiPage + 5))
          }>
          <i class="bi bi-chevron-right"></i>
        </button>
        <button
          className="btn btn-outline-dark mx-1 px-2"
          onClick={() => {
            goLastPage();
          }}>
          <i class="bi bi-chevron-double-right"></i>
        </button>
      </div>
    </div>
  );
};

export default CouponList;
