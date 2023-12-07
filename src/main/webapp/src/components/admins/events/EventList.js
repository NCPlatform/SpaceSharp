import React, { useState } from 'react';
import EventItem from './EventItem';
import Swal from 'sweetalert2';

const EventList = ({ eventList, totalPages, page, deadline, setPage, searchKey, setSearchKey }) => {
  const [semiPage, setSemiPage] = useState(0);

  const goLastPage = () => {
    if (page + 1 === totalPages) {
      Swal.fire({
        icon: 'warning',
        title: '마지막 페이지입니다',
        text: '페이지 이동이 불가능합니다',
      });
    } else {
      setPage(totalPages - 1);
      setSemiPage(5 * Math.floor(totalPages / 5));
    }
  };

  return (
    <div className="container couponList" style={{ height: '80vh', overflowY: 'scroll' }}>
      <p className="fs-2 fw-bold">이벤트</p>
      <div className="border-bottom">
        <p className="fs-5">마감 임박 이벤트</p>
        {deadline.map((item, index) => (
          <EventItem item={item} key={index} />
        ))}
      </div>
      <div>
        <div className="mt-3 mb-3 pt-3 border-dark border-top row">
          <div className="col-6 col-xs-12 col-sm-12 col-md-6">
            <p className="fs-5 fw-bold">이벤트 목록</p>
          </div>
          <div className="col-6 col-xs-12 col-sm-12 col-md-6 text-end mt-0">
            <div className="btn-group w-100" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-dark" onClick={() => (setSearchKey('all'), setPage(0))}>
                전체
              </button>
              <button type="button" className="btn btn-dark" onClick={() => (setSearchKey('onGoing'), setPage(0))}>
                진행중
              </button>
              <button type="button" className="btn btn-dark" onClick={() => (setSearchKey('Termination'), setPage(0))}>
                종료
              </button>
            </div>
          </div>
        </div>
        {eventList.map(
          (item, index) =>
            new Date(item.finishDate).toLocaleDateString('ko-KR') !== new Date().toLocaleDateString('ko-KR') && (
              <EventItem item={item} key={index} />
            )
        )}
      </div>
      <div className="text-center">
        <button
          className="btn btn-outline-dark mx-1 px-2"
          onClick={() => {
            page === 0
              ? Swal.fire({
                  icon: 'warning',
                  title: '첫번째 페이지입니다',
                  text: '페이지 이동이 불가능합니다',
                })
              : setPage(0);
            semiPage !== 0 && setSemiPage(0);
          }}>
          <i className="bi bi-chevron-double-left"></i>
        </button>
        <button
          className="btn btn-outline-dark mx-1 px-2"
          onClick={() =>
            semiPage === 0
              ? page === 0
                ? Swal.fire({
                    icon: 'warning',
                    title: '첫번째 페이지입니다',
                    text: '페이지 이동이 불가능합니다',
                  })
                : setPage(0)
              : (setPage(semiPage - 1), setSemiPage(semiPage - 5))
          }>
          <i className="bi bi-chevron-left"></i>
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
                ? Swal.fire({
                    icon: 'warning',
                    title: '마지막 페이지입니다',
                    text: '페이지 이동이 불가능합니다',
                  })
                : setPage(totalPages - 1)
              : (setPage(semiPage + 5), setSemiPage(semiPage + 5))
          }>
          <i className="bi bi-chevron-right"></i>
        </button>
        <button
          className="btn btn-outline-dark mx-1 px-2"
          onClick={() => {
            goLastPage();
          }}>
          <i className="bi bi-chevron-double-right"></i>
        </button>
      </div>
    </div>
  );
};

export default EventList;
