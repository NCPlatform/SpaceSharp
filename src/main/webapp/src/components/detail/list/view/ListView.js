import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import SelectRegister from './SelectRegister/SelectRegister';
import ModalPicture from './modal/ModalPicture';

const ListView = ({ data, room, handleTimeChange }) => {
  
  // 캘린더 표시를 위한 state 값
  const [isCalendarView, setIsCalendarView] = useState(false);

  // 모달 사용을 위한 로직
  const [isModalView, setIsModalView] = useState(false);
  const modalClose = () => setIsModalView(false);
  const modalShow = () => setIsModalView(true);

  // 캘린더 표시 이벤트를 위한 로직, radio 클릭시 적용
  const toggleCalenderView = () => {
    setIsCalendarView(true);
  };

  // isCalendarView state 값 변경되면 렌더링
  useEffect(() => {
    // console.log(isCalendarView);
  }, [isCalendarView]);

  const handleImageClick = () => {
    if (data?.img) {
      const images = data.img.split(', ');
      const firstImageUrl = images[0];
      
      modalShow();
    }
  };

  return (
    <div className="p-3" style={{ border: '1px solid #6d3afb' }}>
      <div className="p-3" style={{ display: `${true ? 'block' : 'none'}` }}>
        <Row className="pt-3 pb-3">
          <button
            className="btn justify-content-end"
            onClick={handleImageClick}
            style={{
              backgroundSize: '100% 100%',
              backgroundImage: `url(${data?.img ? data?.img.split(', ')[0] : 'https://adventure.co.kr/wp-content/uploads/2020/09/no-image.jpg'
                })`,
              height: '300px',
              textAlign: 'end',
              display: 'flex',
              flexDirection: 'column',
              pointerEvents:
                data?.img === 'https://adventure.co.kr/wp-content/uploads/2020/09/no-image.jpg' ? 'none' : 'auto',
            }}>
            {/* FIXME: */}
            {/* <em className="bg-white" style={{ marginLeft: "98%" }}>
              이미지
            </em> */}
            {data?.img?.length > 1 && (
              <em className="bg-white" style={{ marginLeft: '98%' }}>
                +{data?.img?.split(', ').length - 1}
              </em>
            )}
          </button>
        </Row>
        <Row className="pt-3 pb-3" style={{ whiteSpace: 'pre-line' }}>
          {/* ☆ 시간제 예약은 평일만 가능합니다. :)
          <br />
          <br />
          1. 평일 낮 시간 당 12,000(10~17시)
          <br />
          2. 평일 저녁 시간 당 15,000(18~09시) */}
          {data?.normalExplain && (
            <div dangerouslySetInnerHTML={{ __html: data.normalExplain }} />
          )}
        </Row>

        <Row className="border-2 border-top  pt-2 pb-2">
          <Col md={4}>● 공간 면적</Col>
          {/* <Col md={8}>53 m^3</Col> */}
          <Col md={8}>{data?.placeSize}</Col>
        </Row>
        <Row className="border-2 border-top  pt-2 pb-2">
          <Col md={4}>● 예약 시간</Col>
          {/* <Col md={8}>최소 4시간 부터</Col> */}
          <Col md={8}>최소 {data?.datetime}시간 부터</Col>
        </Row>
        <Row className="border-2 border-top  pt-2 pb-2">
          <Col md={4}>● 수용 인원</Col>
          {/* <Col md={8}>최소 1명 ~ 최대 10명</Col> */}
          <Col md={8}>{data?.people}</Col>
        </Row>
        <Row className="border-2 border-top pt-2 pb-2">
          <Col md={4}>● 예약 기준</Col>
          <Col md={8}>
            {data?.reserveRule ? (
              data.reserveRule
            ) : (
              '문의 부탁드립니다'
            )}
          </Col>
        </Row>
      </div>
      {/* 아래는 예약 선택 시 */}
      {/* FIXME:  */}
      {/* <Row className="pt-2 pb-2" style={{ borderTop: "2px solid #6d3afb" }}>
        <h4>예약선택</h4>
      </Row>
      <div
        className="p-3"
        style={{
          display: `${data?.registerIsView === "Y" ? "block" : "none"}`,
        }}
      >
        <Row>
          <Col md={1}>
            <input type="radio" onClick={() => toggleCalenderView()}></input>
          </Col>
          <Col md={11}>{data?.registerSelectTitle}</Col>
        </Row>
      </div> */}

      {/* {isCalendarView && ( */}
      <>
        <br />
        <SelectRegister data={data} room={room} handleTimeChange={handleTimeChange} />
      </>
      {/* )} */}

      {/* FIXME: 모달 */}

      <ModalPicture data={data} isModalView={isModalView} modalClose={modalClose} />
    </div>
  );
};

export default ListView;
