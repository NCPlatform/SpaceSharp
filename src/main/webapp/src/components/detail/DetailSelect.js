import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import DetailHeader from "./Header/DetailHeader";
import DetailList from "./list/DetailList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DetailSelect = ({hotel}) => {
  const [rooms, setRooms] = useState([]); //rooms state 추가
  const [checkedRoom, setCheckedRoom] = useState(null);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [location, setLocation] = useState(''); // 상세 위치 정보를 저장할 상태
  const [tel, setTel] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const navigate = useNavigate();

  const modalContent = (
    <div>
      "스페이스 샵을 통해<br /> 연락드렸어요~" <br /> 라고 말하면 더 친절하게 안내<br /> 받으실 수 있습니다.<br />
    </div>
  );// 모달내용
  useEffect(() => {
    axios.get(`/user/getAddr?seqHotel=${hotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setLocation(data);
        } else {
          console.error('해당 공간의 주소를 찾을 수 없습니다.');
        }
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
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
    // 서버로 요청을 보내 tel 값을 받아옵니다.
    axios.get(`/user/getHotelInfo?seqHotel=${hotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setLocation(data.addr);
          setOwnerEmail(data.ownerEmail);
        } else {
          console.error('해당 공간 정보를 찾을 수 없습니다.');
        }
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });

    if (ownerEmail) {
      axios.get(`/user/getUserByEmail?email=${ownerEmail}`)
        .then(response => {
          const userData = response.data;
          if (userData) {
            setTel(userData.tel);
          } else {
            console.error('해당 사용자 정보를 찾을 수 없습니다.');
          }
        })
        .catch(error => {
          console.error('데이터를 불러오는 중 에러 발생:', error);
        });
    }
  }, [hotel, ownerEmail]);

  // radio 체크 확인
  const handleRadioButtonClick = (e, data, index) => {
    setCheckedRoom(index);
  };
  const handlePhoneButtonClick = () => {
    setIsPhoneModalOpen(true);
  };

  const handleClosePhoneModal = () => {
    setIsPhoneModalOpen(false);
  };
  const handleReservationButtonClick = () => {
    if (checkedRoom === null) {
      alert('방을 선택해주세요.');
    } else {
      navigate(`/hotelReserve/${hotel}`);
    }
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
          <Button variant="primary" className="w-100" onClick={handlePhoneButtonClick}>
            전화
          </Button>
        </Col>
        <Col sm={6}>
          <Button variant="success" className="w-100" onClick={handleReservationButtonClick}>
            예약하기
          </Button>
        </Col>
      </Row>
      <Modal show={isPhoneModalOpen} onHide={handleClosePhoneModal}>
        <Modal.Body style={{ padding: "50px", textAlign: "center" }}>
          <p style={{ fontSize: '25px', fontWeight: 'lighter' }}>{modalContent}</p>
          <hr />
          <p style={{ fontSize: '25px', fontWeight: 'bold' }}>{location}</p>
          <p style={{ fontSize: '25px', fontWeight: 'lighter', color: 'purple' }}>{tel}</p>
          <hr />
          <br />
          <br />
          <Button style={{ width: '70%' }} onClick={handleClosePhoneModal}>확인</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DetailSelect;
