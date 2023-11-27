import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import Swal from 'sweetalert2';

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

function formatDateTime(date) {
  date = new Date(date);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 표현
  const day = date.getDate().toString().padStart(2, "0");
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  const hours = date.getHours().toString().padStart(2, "0");

  return `${year}. ${month}. ${day}. (${dayOfWeek}) ${hours}시`;
}

const SelectRegister = ({ data, room, handleTimeChange }) => {
  //기존 예약된 정보 -> 예약 불가능한 시간
  const [reservations, setReservations] = useState([]);
  // react-calendar를 위한 state 선언
  const [calendarData, setCalendarData] = useState(new Date());

  // 예약 인원에 관련된 state 값
  const [registerPeopleNumber, setRegisterPeopleNumber] = useState(1);

  // 시간 선택된 거 설정 여부
  const [isSelectedTime, setIsSelectedTime] = useState(Array(24).fill(false));

  const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);

  const reservationTimeText = calculateTotalReservationTime();
  function calculateTotalReservationTime() {
    if (startHour !== null && endHour !== null) {
      const totalHours = endHour - startHour;
      const startDate = new Date(calendarData).setHours(startHour);
      const endDate = new Date(calendarData).setHours(endHour);
  
      return `${formatDateTime(startDate)} ~ ${formatDateTime(endDate)} (총 ${totalHours}시간)`;
    } else {
      return "예약된 시간이 없습니다.";
    }
  }
  // 현재 날짜와 시간을 저장하는 상태 변수 추가
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // 현재 날짜와 시간을 원하는 형식으로 포맷하는 함수
  const formatCurrentDateTime = () => {
    return moment(currentDateTime).format("YYYY.MM.DD HH:mm:ss");
  };

  // calendarData가 변경될 때마다 currentDateTime을 업데이트
  useEffect(() => {
    setCurrentDateTime(new Date());
  }, [calendarData]);

  useEffect(() => {
    // 선택한 날짜와 비교해 같은 날일 경우 시간을,
    // 다음날일 경우 시간+24를 반환하는 함수.
    const datetimeToHours = (date) => {
      const calendarNextDate = new Date(calendarData);
      calendarNextDate.setDate(calendarData.getDate() + 1);

      if (
        date.getFullYear() === calendarData.getFullYear() &&
        date.getMonth() === calendarData.getMonth() &&
        date.getDate() === calendarData.getDate()
      ) {
        return date.getHours();
      } else if (
        date.getFullYear() === calendarNextDate.getFullYear() &&
        date.getMonth() === calendarNextDate.getMonth() &&
        date.getDate() === calendarNextDate.getDate()
      ) {
        return date.getHours() + 24;
      } else {
        return null;
      }
      // if (
      // date.getFullYear() === calendarData.getFullYear() &&
      // date.getMonth() === calendarData.getMonth() &&
      // date.getDate() === calendarData.getDate()
      // ) {
      // return date.getHours();
      // } else {
      // return date.getHours() + 24;
      // }
    };
    const getUnavailableTimes = (reservations) => {
      const unavailableTimes = [];
      for (let reservation of reservations) {
        const startDate = new Date(reservation.travelStartDate);
        const endDate = new Date(reservation.travelEndDate);
        let currentDateTime = new Date(startDate);
        while (currentDateTime < endDate) {
          const hours = datetimeToHours(new Date(currentDateTime));
          console.log(hours, currentDateTime, calendarData);
          if (hours !== null) unavailableTimes.push(hours);

          currentDateTime.setHours(currentDateTime.getHours() + 1);
        }
      }

      return unavailableTimes.sort();
    };
    const endDate = new Date(
      new Date(calendarData).setDate(calendarData.getDate() + 1)
    );

    axios
      .get(
        `/user/getReservation?seqRoom=${room}&startDate=${calendarData.toDateString()}&endDate=${endDate.toDateString()}`
      )
      .then((response) => {
        const data = response.data;
        if (data) {
          console.log(data);
          const reservations = getUnavailableTimes(data);
          setReservations(reservations);
        } else {
          console.error("해당 공간을 찾을 수 없습니다.");
        }
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      });
      sessionStorage.setItem(
        "selectedDateTime",
        JSON.stringify({
          date: moment(calendarData).format("YYYY.MM.DD"),
          startHour,
          endHour,
        })
      );

    const storedDateTime = JSON.stringify({
      date: calendarData.toDateString(),
      startHour,
      endHour,
    });

    sessionStorage.setItem("selectedDateTime", storedDateTime);

    // reservationTimeText을 sessionStorage에 저장
    sessionStorage.setItem("reservationTimeText", reservationTimeText);
 // 현재 날짜와 시간을 sessionStorage에 저장
    sessionStorage.setItem("currentDateTime", formatCurrentDateTime());
  }, [calendarData, startHour, endHour, reservationTimeText]);

  // 예약 인원 수 증가
  const toggleIncreasePeopleNumber = () => {
    let number = registerPeopleNumber;
    number++;
    setRegisterPeopleNumber(number);
  };

  // 예약 인원 수 감소
  const toggleDecreasePeopleNumber = () => {
    let number = registerPeopleNumber;
    number--;
    setRegisterPeopleNumber(number);
  };

  // 인원수 이벤트 변경
  const onChangeRegisterPeopleNumber = (e) => {
    const { value } = e.target;

    setRegisterPeopleNumber(value);
  };

  // 숫자로 된 날짜 변환
  const dayViewText = (startDate) => {
    if (startDate.getDay() === 0) {
      return "(일)";
    } else if (startDate.getDay() === 1) {
      return "(월)";
    } else if (startDate.getDay() === 2) {
      return "(화)";
    } else if (startDate.getDay() === 3) {
      return "(수)";
    } else if (startDate.getDay() === 4) {
      return "(목)";
    } else if (startDate.getDay() === 5) {
      return "(금)";
    } else if (startDate.getDay() === 6) {
      return "(토)";
    }
  };

  // calendarData 변경 시 로직 실행 (즉, 날짜 클릭 시)
  useEffect(() => {
    dayViewText(new Date(calendarData));
    // 아래는 시간 관련된 데이터 모두 초기화
    setStartHour(0);
    setEndHour(0);
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
      if (startHour === index) {
        // 같은 시간을 다시 클릭하면 선택을 해제합니다.
        setStartHour(null);
        setEndHour(null);
        setIsSelectedTime(Array(24).fill(false));
        setClickCount(-1);

        // 선택 취소 시에도 handleTimeChange 함수 호출하여 정보 업데이트
        handleTimeChange(null, null);
        return;
      }

      if (startHour > index) {
        //SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '종료시간이 시작시간보다 이전을 선택할 수 없습니다.',
        });
        return;
      }

      // 선택한 시간 범위가 24시간을 초과하는지 확인합니다.
      if (index - startHour + 1 > 24) {
        //SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '예약 가능한 최대 시간은 24시간입니다.\n24시간을 초과하는 예약은 1:1 문의 부탁드립니다.',
        });
        return;
      }

      const range = Array.from(
        { length: index - startHour + 1 },
        (_, index) => startHour + index
      );
      const commonHour = range.filter((hour) => reservations.includes(hour));
      if (commonHour.length > 0) {
        // SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '예약 불가능한 시간이 포함되어 있습니다.',
        });
        return;
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

    // 클릭 횟수를 조절하여 시작과 종료를 번갈아가며 선택할 수 있도록 합니다.
    if (tempClickCount % 2 === 0) {
      setClickCount(1);
    } else {
      setClickCount(0);
    }
    // handleTimeChange 함수를 호출하여 변경된 값들을 부모 컴포넌트로 전달
    handleTimeChange(startHour, endHour);
  };
  // 시간 선택 이벤트용 함수
  const checkDisabledTime = (index) => {
    const currentDateTime = new Date();
    const currentHour = currentDateTime.getHours();

    // 선택한 날짜가 오늘이고, 현재 시간보다 이전이면 '예약불가' 상태로 만듭니다.
    if (calendarData.getDate() === currentDateTime.getDate() && index < currentHour) {
      return true;
    }

    // 그 외에는 예약된 시간인지 여부를 확인하여 '예약불가' 상태로 만듭니다.
    return reservations.includes(index);
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
          minDate={new Date()} //오늘 날짜보다 과거는 비활성화
        />
      </Row>
      <br />
      <Row style={{ paddingLeft: "1em" }}>
        <Col md={4} className="d-flex align-items-center">
          <div className="mr-2" style={{ whiteSpace: 'nowrap' }}>예약불가</div>
          <div
            style={{
              width: "1em",
              height: "1em",
              backgroundColor: "#F0F0F0",
            }}
          ></div>
        </Col>
        <Col md={4} className="d-flex align-items-center">
          <div className="mr-2" style={{ whiteSpace: 'nowrap' }}>오늘</div>
          <div
            style={{
              width: "1em",
              height: "1em",
              backgroundColor: "#FFFF76",
            }}
          ></div>
        </Col>
        <Col md={4} className="d-flex align-items-center">
          <div className="mr-2" style={{ whiteSpace: 'nowrap' }}>선택</div>
          <div
            style={{
              width: "1em",
              height: "1em",
              backgroundColor: "#006EDC",
            }}
          ></div>
        </Col>
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
          {Array(48)
            .fill()
            .map((_, index) => (
              <li
                key={index}
                style={{ width: "60px", height: "100px", float: "left" }}
              >
                <span>{index % 24}</span> <br />
                <button
                  className={`border ${checkDisabledTime(index)
                    ? "bg-danger"
                    : isSelectedTime[index]
                      ? "bg-primary"
                      : "bg-warning"
                    } text-white`}
                  style={{ width: "100%", height: "70%" }}
                  onClick={() => toggleTime(index)}
                  disabled={checkDisabledTime(index)}
                >
                  {`${data?.price}`}
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
              width: "1em",
              height: "1em",
              backgroundColor: "#DC3545",
            }}
          ></div>
        </Col>
        <Col md={4} className="d-flex align-items-center">
          <div className="mr-2" style={{ whiteSpace: 'nowrap' }}>가능</div>
          <div
            style={{
              width: "1em",
              height: "1em",
              backgroundColor: "#FFC107",
            }}
          ></div>
        </Col>
        <Col md={4} className="d-flex align-items-center">
          <div className="mr-2" style={{ whiteSpace: 'nowrap' }}>선택</div>
          <div
            style={{
              width: "1em",
              height: "1em",
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
        {`최대 인원을 초과하거나 24시간을 초과하는 예약은 1:1 문의 또는 연락 부탁드립니다. 예약 도중 이탈하시는 경우, 결제 오류가 발생할 수 있습니다.`}
      </span>
      <br />
      <br />
      <br />
      <Row>
        <h4>예약일시</h4>
      </Row>
      <div>{reservationTimeText}</div>
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