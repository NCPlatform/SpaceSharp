import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import DetailHeader from "./Header/DetailHeader";
import DetailList from "./list/DetailList";
import axios from "axios";

const DetailSelect = ({ hotel }) => {
  const [rooms, setRooms] = useState([]); //rooms state 추가
  const [checkedRoom, setCheckedRoom] = useState(null);

  useEffect(() => {
    axios
      .get(`/user/getRoom?seqHotel=${hotel}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          setRooms(data);
        } else {
          console.error("해당 공간을 찾을 수 없습니다.");
        }
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      });
  }, [hotel]);

  // radio 체크 확인
  const handleRadioButtonClick = (e, data, index) => {
    setCheckedRoom(index);
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <DetailHeader />
      <hr />
      {/* 상세 내역 추가 */}
      <div className="box_form w-100">
        <Row>
          <h2 className="p-2" style={{ textAlign: "center" }}>
            결제 후 바로 예약확정
          </h2>
        </Row>
        <Row className="p-3" style={{ color: "#6d3afb", textAlign: "center" }}>
          {
            "빠르고 확실한 예약을 위해 스페이스# 에서 온라인 결제를 진행하세요 :-)"
          }
        </Row>
        <br />
        {rooms.map((room, index) => (
          <DetailList
            key={index}
            index={index}
            data={room}
            onChange={handleRadioButtonClick}
            isChecked={checkedRoom === index}
          />
        ))}

        {/* 아래는 반복문으로 돌리기 - 데이터 뿌리는 역할 */}
        {/* // 구글 콘솔에서 warning 로그 안찍히게 하기 위해 key 지정 */}
        {/* {resData?.map((data, index) => (
          <DetailList
            key={index}
            data={data}
            index={index}
            toggleIsCheckIndex={toggleIsCheckIndex}
          />
        ))} */}
      </div>
      {/* '전화' 버튼과 '예약하기' 버튼*/}
      <Row className="p-3" style={{ justifyContent: "center" }}>
        <Col sm={6}>
          <Button variant="primary" className="w-100">
            전화
          </Button>
        </Col>
        <Col sm={6}>
          <Button variant="success" className="w-100">
            예약하기
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DetailSelect;
