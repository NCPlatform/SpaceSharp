import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import SelectRegister from "./SelectRegister/SelectRegister";
import ModalPicture from "./modal/ModalPicture";

const ListView = ({ data, index }) => {
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

  return (
    <div className="p-3" style={{ border: "1px solid #6d3afb" }}>
      <div className="p-3" style={{ display: `${true ? "block" : "none"}` }}>
        <Row className="pt-3 pb-3">
          <button
            className="btn justify-content-end"
            onClick={() => modalShow()}
            style={{
              backgroundSize: "100% 100%",
              backgroundImage: `url(${data?.pictureLink[0]})`,
              height: "300px",
              textAlign:"end",
              display:"flex",
              flexDirection:"column"
            }}
          >
            {/* <img
              width="100%"
              src={data?.pictureLink[0]}
              alt="이미지 배열"
            ></img> */}
            {
              data?.pictureLink?.length > 1
              &&
              <em className="bg-white" style={{ marginLeft: "98%"}} >+{data?.pictureLink?.length}</em>
            }
          </button>
        </Row>
        <Row className="pt-3 pb-3" style={{ whiteSpace: "pre-line" }}>
          {/* ☆ 시간제 예약은 평일만 가능합니다. :)
          <br />
          <br />
          1. 평일 낮 시간 당 12,000(10~17시)
          <br />
          2. 평일 저녁 시간 당 15,000(18~09시) */}
          {data?.contents}
        </Row>
        <Row className="border-2 border-top  pt-2 pb-2">
          <Col md={4}>● 공간 유형</Col>
          {/* <Col md={8}>파티룸</Col> */}
          <Col md={8}>{data?.spaceType}</Col>
        </Row>
        <Row className="border-2 border-top  pt-2 pb-2">
          <Col md={4}>● 공간 면적</Col>
          {/* <Col md={8}>53 m^3</Col> */}
          <Col md={8}>{data?.spaceArea} m^3</Col>
        </Row>
        <Row className="border-2 border-top  pt-2 pb-2">
          <Col md={4}>● 예약 시간</Col>
          {/* <Col md={8}>최소 4시간 부터</Col> */}
          <Col md={8}>{data?.registerTime}</Col>
        </Row>
        <Row className="border-2 border-top  pt-2 pb-2">
          <Col md={4}>● 수용 인원</Col>
          {/* <Col md={8}>최소 1명 ~ 최대 10명</Col> */}
          <Col md={8}>{data?.registerPeople}</Col>
        </Row>
        <Row className="border-2 border-top  pt-2 pb-2">
          <Col md={4}>● 예약 기준</Col>
          {/* <Col md={8}>4명 초과시 10,000원/인</Col> */}
          <Col md={8}>{data?.registerPoint}</Col>
        </Row>
      </div>
      {/* 아래는 예약 선택 시 */}
      <Row className="pt-2 pb-2" style={{ borderTop: "2px solid #6d3afb" }}>
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
      </div>

      {isCalendarView && (
        <>
          <br />
          <SelectRegister data={data} index={index} />
        </>
      )}

      {/* 모달 */}
      <ModalPicture data={data} isModalView={isModalView} modalClose={modalClose} />
    </div>
  );
};

export default ListView;