import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

const inputNumberViewStyle = {
  width: "100%",
  height: "100%",
  padding: "0 10px",
  border: "0",
  textAlign: "center",
  fontWeight: "800",
  fontSize: "17px",
  lineHeight: 1,
};

const SelectRegister = ({ data, room }) => {
  // 기존 예약된 정보 -> 예약 불가능한 시간
  const [reservations, setReservations] = useState([]);

  // react-calendar를 위한 state 선언
  const [calendarData, setCalendarData] = useState(new Date());

  // 예약 인원에 관련된 state 값
  const [registerPeopleNumber, setRegisterPeopleNumber] = useState(1);

  // 시간 선택된 거 설정 여부
  const [isSelectedTime, setIsSelectedTime] = useState(Array(24).fill(false));

  const [startHour, setStartHour] = useState();
  const [endHour, setEndHour] = useState();

  useEffect(() => {
    axios
      .get(
        `/user/getReservation?seqRoom=${room}&date=${calendarData.toDateString()}`
      )
      .then((response) => {
        const data = response.data;
        if (data) {
          setReservations(data);
        } else {
          console.error("해당 공간을 찾을 수 없습니다.");
        }
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      });
  }, [calendarData]);

  // 예약 인원 수 증가
  const toggleIncreasePeopleNumber = () => {
    let number = registerPeopleNumber;
    number++;
    setRegisterPeopleNumber(number);
    console.log(number);
  };

  // 예약 인원 수 감소
  const toggleDecreasePeopleNumber = () => {
    let number = registerPeopleNumber;
    number--;
    setRegisterPeopleNumber(number);
    console.log(number);
  };

  // 인원수 이벤트 변경
  const onChangeRegisterPeopleNumber = (e) => {
    const { value } = e.target;

    setRegisterPeopleNumber(value);
  };

  // 숫자로 된 날짜 변환
  const dayViewText = () => {
    if (calendarData.getDay() === 0) {
      return "(일)";
    } else if (calendarData.getDay() === 1) {
      return "(월)";
    } else if (calendarData.getDay() === 2) {
      return "(화)";
    } else if (calendarData.getDay() === 3) {
      return "(수)";
    } else if (calendarData.getDay() === 4) {
      return "(목)";
    } else if (calendarData.getDay() === 5) {
      return "(금)";
    } else if (calendarData.getDay() === 6) {
      return "(토)";
    }
  };

  // calendarData 변경 시 로직 실행 (즉, 날짜 클릭 시)
  useEffect(() => {
    dayViewText();
    // 아래는 시간 관련된 데이터 모두 초기화
    setStartHour(null);
    setEndHour(null);
    setClickCount(-1);
    setIsSelectedTime(Array(24).fill(false));
  }, [calendarData]);

  // 시간 선택 이벤트용 함수
  // -1 : 초기 화면 (선택 안함), 0 : 시작 버튼 클릭 대기, 1 : 종료 버튼 클릭 대기 (이이상 은 다시 1로 시작)
  const [clickCount, setClickCount] = useState(-1);
  const toggleTime = (index) => {
    // 초기 화면 시작
    let tempClickCount = clickCount;
    if (tempClickCount === -1) {
      tempClickCount = 0;
    }

    // 이후, 로직 시작
    if (tempClickCount === 0) {
      // 시작 시간 클릭 시
      setStartHour(index);
      setEndHour(index + 1);

      let isArrSelect = Array(24).fill(false);
      isArrSelect[index] = true;
      setIsSelectedTime(isArrSelect);
    } else {
      // 종료 시간 클릭시
      if (startHour > index) {
        alert("종료시간이 시작시간이전을 선택할 수 없습니다.");
        return;
      }
      // 예약 불가 시간
      if (reservations.length > 0) {
        if (startHour <= reservations[0] && endHour >= reservations[0]) {
          alert("예약 불가능한 시간이 포함되어있습니다.");
          return;
        }
      }
      setEndHour(index + 1);
      let isArrSelect = isSelectedTime;
      for (
        let endHourIndex = startHour;
        endHourIndex <= index;
        endHourIndex++
      ) {
        isArrSelect[endHourIndex] = true;
      }
      setIsSelectedTime(isArrSelect);
    }

    console.log(tempClickCount);
    if (tempClickCount % 2 === 0) {
      setClickCount(1);
    } else {
      setClickCount(0);
    }
  };
  const checkDisabledTime = (date, view) => {
    return false;
  };
  return (
    <div>
      {/* 날짜 선택 */}
      <Row>
        <h4>날짜 선택</h4>
      </Row>
      <div
        className="pt-4 pb-2"
        style={{ borderTop: "2px solid #6d3afb" }}
      ></div>
      <Row className="justify-content-center">
        <Calendar
          editableDateInputs={true}
          calendarType={"gregory"}
          onChange={setCalendarData}
          formatDay={(locale, date) => moment(date).format("D")}
          value={calendarData}
        />
      </Row>
      <br />
      <Row style={{ paddingLeft: "1em" }}>
        <Col md={3}>예약불가</Col>
        <Col md={3}>오늘</Col>
        <Col md={3}>선택</Col>
      </Row>
      <br />
      <br />

      {/* 시간 선택 */}
      <Row>
        <h4>시간 선택</h4>
      </Row>
      <div
        className="pt-4 pb-2"
        style={{ borderTop: "2px solid #6d3afb" }}
      ></div>
      <div style={{ overflowX: "scroll" }}>
        <ul style={{ listStyle: "none", width: "1510px" }}>
          {Array(24)
            .fill()
            .map((_, index) => (
              <li
                key={index}
                style={{ width: "60px", height: "100px", float: "left" }}
              >
                <span>{index}</span> <br />
                <button
                  className={`border ${reservations.includes(index)
                    ? "bg-danger"
                    : isSelectedTime[index]
                      ? "bg-primary"
                      : "bg-warning"
                    } text-white`}
                  style={{ width: "100%", height: "70%" }}
                  onClick={() => toggleTime(index)}
                  disabled={reservations.includes(index)}
                >
                  12,000
                </button>
              </li>
            ))}
        </ul>
      </div>
      <Row style={{ paddingLeft: "1em" }}>
        <Col md={4} className="d-flex align-items-center">
          <div className="mr-2" style={{ whiteSpace: 'nowrap' }}>예약불가</div>
          <div
            style={{
              width: "1em", // Adjust the width as needed
              height: "1em", // Adjust the height as needed
              backgroundColor: "#DC3545",
            }}
          ></div>
        </Col>
        <Col md={4} className="d-flex align-items-center">
          <div className="mr-2" style={{ whiteSpace: 'nowrap' }}>가능</div>
          <div
            style={{
              width: "1em", // Adjust the width as needed
              height: "1em", // Adjust the height as needed
              backgroundColor: "#FFC107",
            }}
          ></div>
        </Col>
        <Col md={4} className="d-flex align-items-center">
          <div className="mr-2" style={{ whiteSpace: 'nowrap' }}>선택</div>
          <div
            style={{
              width: "1em", // Adjust the width as needed
              height: "1em", // Adjust the height as needed
              backgroundColor: "#0D6EFD",
            }}
          ></div>
        </Col>
      </Row>
      <br />
      <br />
      <span className="text-danger">
        <i className="bi bi-info-circle" />
        &nbsp;
        {`예약 도중 이탈하시는 경우, 결제 오류가 발생할 수 있습니다.`}
      </span>
      <br />
      <br />
      <br />
      <Row>
        <h4>예약일시</h4>
      </Row>
      <div>
        {`${calendarData.getFullYear()}. ${calendarData.getMonth() + 1
          }. ${calendarData.getDate()}. ${dayViewText()} ` +
          `${!!startHour || !!endHour ? startHour + "시 ~ " + endHour + "시" : ""
          }`}
      </div>
      <br />
      <br />

      {/* 총 예약 인원 */}
      <Row>
        <h4>총 예약 인원</h4>
        <h6>{`(${data?.reserveRule})`}</h6>
      </Row>
      <div
        className="pt-4 pb-2"
        style={{ borderTop: "2px solid #6d3afb" }}
      ></div>
      <InputGroup className="w-100">
        <input
          className="btn btn-lg border"
          type="button"
          value="-"
          onClick={() => toggleDecreasePeopleNumber()}
        />
        <span style={{ width: "70%", border: "1px solid" }}>
          <input
            style={inputNumberViewStyle}
            className="btn btn-lg w-100"
            // type="number"
            name="peopleNumber"
            value={registerPeopleNumber}
            onChange={(e) => onChangeRegisterPeopleNumber(e)}
            readOnly
          />
        </span>
        <input
          className="btn btn-lg border"
          type="button"
          value="+"
          onClick={() => toggleIncreasePeopleNumber()}
        />
      </InputGroup>
    </div>
  );
};

export default SelectRegister;
