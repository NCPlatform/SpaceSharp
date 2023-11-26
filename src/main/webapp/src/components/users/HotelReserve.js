import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import HotelOption from "../data/HotelOption.json";

const HotelReserve = () => {
  const [sessionUserDTO, setSessionUserDTO] = useState(JSON.parse(sessionStorage.getItem('user')));
  const { seqRoom } = useParams();
  const [ownerDTO, setOwnerDTO] = useState();
  const [hotelDTO, setHotelDTO] = useState(null);
  const [roomDTO, setRoomDTO] = useState(null);
  const [hotelCategory, setHotelCategory] = useState();
  const [reservationDate, setReservationDate] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  // useParams를 통해 동적인 URL 파라미터 값을 가져옴
  const { seqHotel } = useParams();
  const [loading, setLoading] = useState(true);



  const navigate = useNavigate();

  const fail = () => {
    Swal.fire({
      icon: 'error',
      title: '유효하지 않은 예약입니다.',
    }).then(res => {
      if (res.isConfirmed) {
        navigate('/');
      }
    });
  };

  useEffect(() => {
    axios
      .get(`/user/hotelReserve?seqRoom=${seqRoom}`)
      .then(res => {
        setRoomDTO(res.data.room);
        setOwnerDTO(res.data.owner);
        setHotelDTO(res.data.hotel);
        setHotelCategory(res.data.hotelCategory);

        const storedReservationTimeText = sessionStorage.getItem('reservationTimeText');
        setReservationDate(storedReservationTimeText || '');

        const storedCurrentDateTime = sessionStorage.getItem('currentDateTime');
        setCurrentDateTime(storedCurrentDateTime || '');
      })
      .catch(err => {
        console.log(err);
        fail();
      });
  }, [seqRoom]);


  useEffect(() => {
    //공간 정보 아이콘 넣어야함
    axios.get(`/user/getHotelInfo?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        console.log(data)
        if (data) {
          setHotelDTO(data);
        } else {
          console.error('해당 공간 정보를 찾을 수 없습니다.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
        setLoading(false);
      });
  }, [seqHotel]);

  const requestPay = () => {
    // 라이브러리 스크립트가 정상적으로 로딩되었는지 확인
    if (window.IMP) {
      const userCode = "imp14397622";
      window.IMP.init(userCode);

      window.IMP.request_pay({
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: "test_lpfkv0f2",
        name: "SPACE SHARP",
        amount: Number(sessionStorage.getItem('totalReservationCost')),
        buyer_tel: "010-0000-0000",
      });
    } else {
      console.error("IMP 객체가 정의되지 않았습니다. 라이브러리를 올바르게 로딩했는지 확인하세요.");
    }
  };

  // TRUE인 항목들을 6개씩 그룹화하여 반환하는 함수
  const groupTrueOptions = () => {
    if (!hotelDTO) {
      return [];
    }
  
    // HotelOption.json 파일을 사용하여 TRUE인 항목들을 필터링
    const trueOptions = HotelOption.filter(option => hotelDTO[option.key] === true);
  
    // 5개씩 그룹화
    const groupedOptions = [];
    for (let i = 0; i < trueOptions.length; i += 5) {
      groupedOptions.push(trueOptions.slice(i, i + 5));
    }
  
    return groupedOptions;
  };
  // 그룹화된 아이콘을 렌더링하는 함수
  const renderGroupedIcons = () => {
    return groupTrueOptions().map((group, groupIndex) => (
      <div key={groupIndex} className="row">
        {group.map((option, iconIndex) => (
          <div key={iconIndex} className="col-md-2 col-sm-2 mb-3">
            {React.createElement('div', { dangerouslySetInnerHTML: { __html: option.icon } })}
            <div>{option.name}</div>
          </div>
        ))}
      </div>
    ));
  };
  return (
    <>
      {sessionUserDTO !== null
        ? hotelDTO !== null && (
          <div className="bg-body-tertiary">
            <Nav />
            <div className="container mb-5">
              <div className="row">
                <div className="col-md-8">
                  <div className="mt-5">
                    <h5 className="fw-bold pb-3" style={{ borderBottom: '5px solid rgb(244, 132, 132)' }}>
                      예약 공간
                    </h5>
                    <span style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '150%' }}>{hotelDTO.name} / </span> <span style={{ fontWeight: 'bold' }}>{roomDTO.name}</span>
                    <p style={{ marginTop: '1rem' }}>{hotelDTO.subscribe}</p>
                    <hr />
                    <p className="row">
                      <span className="col-sm-2">공간유형</span>
                      <span className="col-sm-10">{hotelCategory}</span>
                    </p>
                    <hr />
                    <p className="row">
                      <span className="col-sm-2">예약인원</span>
                      <span className="col-sm-10">{roomDTO.people}</span>
                    </p>
                    <hr />
                    <p className="row">
                      <span className="col-sm-2">추가인원</span>
                      <span className="col-sm-10">{roomDTO.reserveRule}</span>
                    </p>
                    <hr />
                    <p className="row" style={{ paddingBottom: '1rem' }}>
                      <span className="col-sm-2">아이콘</span>
                      <span className="col-sm-10" >{renderGroupedIcons()}</span>
                    </p>
                  </div>
                  <div className="mt-5">
                    <h5 className="fw-bold pb-3" style={{ borderBottom: '5px solid rgb(244, 132, 132)' }}>
                      예약 정보
                    </h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">예약날짜</span>
                          <span id="reservationDate">{reservationDate}</span>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">예약인원</span>
                          <span>{sessionStorage.getItem('registerPeopleNumber')}명</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5">
                    <h5 className="fw-bold pb-3" style={{ borderBottom: '5px solid rgb(244, 132, 132)' }}>
                      예약자 정보
                    </h5>
                    <div className="mb-3 row">
                      <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                        Email
                      </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value={sessionUserDTO.email} />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                        예약자
                      </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value={sessionUserDTO.name} />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                        연락처
                      </label>
                      <div className="col-sm-10">
                        <div className="d-flex">
                          {sessionUserDTO.tel.split('-').map((tag, index) => (
                            <input key={index} className="col form-control" value={tag.trim()} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                        사용목적
                      </label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                        요청사항
                      </label>
                      <div className="col-sm-10">
                        <textarea type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <h5 className="fw-bold pb-3" style={{ borderBottom: '5px solid rgb(244, 132, 132)' }}>
                      호스트 정보
                    </h5>
                    {ownerDTO.companyName && (
                      <div className="my-3 row">
                        <p htmlFor="staticEmail" className="col-sm-2">
                          공간 상호
                        </p>
                        <p className="col-sm-10">{ownerDTO.companyName}</p>
                      </div>
                    )}
                    <div className="mb-3 row">
                      <p htmlFor="staticEmail" className="col-sm-2">
                        대표자명
                      </p>
                      <p className="col-sm-10">{ownerDTO.name}</p>
                    </div>
                    <div className="mb-3 row">
                      <p htmlFor="staticEmail" className="col-sm-2">
                        소재지
                      </p>
                      <p className="col-sm-10">{ownerDTO.addr}</p>
                    </div>
                    {ownerDTO.businessRegistrationNumber !== 0 && (
                      <div className="mb-3 row">
                        <p htmlFor="staticEmail" className="col-sm-2">
                          사업자번호
                        </p>
                        <p className="col-sm-10">{ownerDTO.businessRegistrationNumber}</p>
                      </div>
                    )}
                    <div className="mb-3 row">
                      <p htmlFor="staticEmail" className="col-sm-2">
                        연락처
                      </p>
                      <p className="col-sm-10">
                        <span className="me-3">{ownerDTO.tel}</span>
                        <span>{ownerDTO.email}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pt-5 row me-0 sticky-top">
                    <h5 className="fw-bold pb-3" style={{ borderBottom: '5px solid rgb(244, 132, 132)' }}>
                      결제예정금액
                    </h5>
                    <ul className="list-group list-group-flush me-0">
                      <li className="list-group-item me-0" style={{ fontSize: '0.8rem' }}>
                        <span className="fw-bold me-1">예약시각</span>
                        <span>{currentDateTime}</span>
                      </li>
                      <li className="list-group-item me-0" style={{ fontSize: '0.8rem' }}>
                        <span className="fw-bold me-1">예약날짜</span>
                        <span>{reservationDate}</span>
                      </li>
                      <li className="list-group-item me-0" style={{ fontSize: '0.8rem' }}>
                        <span className="fw-bold me-1">예약인원</span>
                        <span>{sessionStorage.getItem('registerPeopleNumber')}명</span>
                      </li>
                      <li className="list-group-item" style={{ borderTop: '5px solid rgb(244, 132, 132)' }}>
                        <h3 className="fw-bold d-flex justify-content-between" style={{ color: 'rgb(245, 80, 80)' }}>
                          <span>￦</span>
                          <span>{Number(sessionStorage.getItem('totalReservationCost')).toLocaleString()}</span>
                        </h3>
                      </li>
                    </ul>
                    <button
                      className="d-flex btn justify-content-center text-white"
                      style={{
                        backgroundColor: 'rgb(244, 132, 132)',
                        borderRadius: 0,
                        fontWeight: 'bold',
                      }}
                      onClick={() => requestPay()}>
                      결제하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )
        : fail()}
    </>
  );
};

export default HotelReserve;