import React from "react";
import { Col, Row } from "react-bootstrap";
import ListView from "./view/ListView";

const DetailList = ({ data, index, toggleIsCheckIndex }) => {
  return (
    <div className="">
      <Row className="m-1 mt-0 mb-0 pt-3 pb-3 border-top border-bottom">
        <Col xl={1}>
          <input
            type="radio"
            checked={data?.isCheck === "Y" ? true : false}
            onChange={(e) => {
              toggleIsCheckIndex(e, data, index);
            }}
          ></input>
        </Col>
        {/* <Col xl={6}>1. 시간단위 예약(평일)</Col> */}
        <Col xl={6}>{`${data?.no}. ${data?.menuTitle}`}</Col>
        <Col xl={5}>
          {" "}
          {/* <span style={{ color: "#6d3afb" }}>12,000</span> 원 / 시간 */}
          <span style={{ color: (data?.isCheck === "Y") ? "#6d3afb" : "#000" }}>{data?.price?.toLocaleString()}</span> 원 / 시간
        </Col>
      </Row>
      {/* <hr/> */}
      {/* 아래는 평소에 숨기고, 체크할 때만 보이게 하기 */}
      {
        data?.isCheck === "Y" &&
        <ListView data={data} index={index} />
      }
    </div>
  );
};

export default DetailList;