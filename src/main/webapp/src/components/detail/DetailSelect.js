import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import DetailHeader from "./Header/DetailHeader";
import DetailList from "./list/DetailList";
// 샘플 데이터 가져와서 사용하기
import responseData from "./sample/responseData";

const DetailSelect = () => {
  // list radio 선택 시 변화, 조건문 참조(DetailList 참조)
  const [isCheckIndex, setIsCheckIndex] = useState(-1);
  //샘플코드로 데이터 불려옴
  const [resData, setResData] = useState(responseData);

  useEffect(() => {
    // console.log(resData);
  }, [isCheckIndex]);

  // radio 체크 확인
  const toggleIsCheckIndex = (e, data, index) => {

    let d = resData;
    d[index] = {
      ...data,
      isCheck: "Y"
    }
    // 아무것도 선택 안됫을때 (초기화 값)
    if (!(isCheckIndex < 0)) {
      // 이미 선택한 값을 다시 선택할 때 조건부로 수행 (미 선택 모드로 돌리기)
      d[isCheckIndex] = {
      ...resData[isCheckIndex],
        isCheck: "N"
      }
    } 
    setResData(d);
    setIsCheckIndex(index);
    // console.log(resData[index]);
  };

  useEffect(() => {
    // console.log(resData)
  }, [resData])

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <DetailHeader />
      <hr />
      {/* 상세 내역 추가 */}
      <div className="box_form w-100">
        <Row>
            <h2 className="p-2" style={{ textAlign: "center" }} >
              결제 후 바로 예약확정
            </h2>
        </Row>
        <Row className="p-3" style={{ color: "#6d3afb", textAlign: "center" }}>
          {"빠르고 확실한 예약을 위해 스페이스# 에서 온라인 결제를 진행하세요 :-)"}
        </Row>
        <br />

        {/* 아래는 반복문으로 돌리기 - 데이터 뿌리는 역할 */}
        {/* // 구글 콘솔에서 warning 로그 안찍히게 하기 위해 key 지정 */}
        {resData?.map((data, index) => (
          <DetailList
            key={index}
            data={data}
            index={index}
            toggleIsCheckIndex={toggleIsCheckIndex}
          />
        ))}
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