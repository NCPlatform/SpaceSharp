import React, { useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HotelOption from "../data/HotelOption.json";

const HotelReserve = () => {
  const [sessionUserDTO, setSessionUserDTO] = useState(JSON.parse(sessionStorage.getItem('user')));
  const { seqRoom } = useParams();
  const [ownerDTO, setOwnerDTO] = useState();
  const [hotelDTO, setHotelDTO] = useState(null);
  const [roomDTO, setRoomDTO] = useState(null);
  const [couponDTO, setCouponDTO] = useState([]);
  const [issuedCouponDTO, setIssuedCouponDTO] = useState([]);
  const [couponOptions, setCouponOptions] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountedTotalReservationCost, setDiscountedTotalReservationCost] = useState(0);
  const [hotelCategory, setHotelCategory] = useState();
  const [reservationDate, setReservationDate] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleCouponSelection = (event) => {
    const selectedCouponValue = event.target.value;
    if (selectedCouponValue === "") {
      // Default option selected, set discountAmount to 0
      setDiscountAmount(0);
      setSelectedCoupon(null); // Optional: Reset selectedCoupon if needed
    } else {
      // A coupon is selected, proceed with setting the selected coupon
      setSelectedCoupon(JSON.parse(selectedCouponValue));
    }
  };
  const [discountAmount, setDiscountAmount] = useState(0);  // 새로운 state 추가

  useEffect(() => {
    if (selectedCoupon) {
      if (selectedCoupon.couponType === "discount") {
        // 선택된 쿠폰이 할인 쿠폰인 경우, 할인을 적용하여 총 예약 금액을 계산
        const discountAmount = selectedCoupon.discount || 0;
        const totalReservationCost = sessionStorage.getItem('totalReservationCost') || 0;
        const discountedCost = totalReservationCost - discountAmount;

        setDiscountAmount(discountAmount);  // 할인 금액을 state에 저장
        setDiscountedTotalReservationCost(discountedCost > 0 ? discountedCost : 0);
      } else if (selectedCoupon.couponType === "percentage") {
        // 선택된 쿠폰이 퍼센트 할인 쿠폰인 경우, 할인율을 적용하여 총 예약 금액을 계산
        const discountPercentage = selectedCoupon.discount || 0;
        const totalReservationCost = sessionStorage.getItem('totalReservationCost') || 0;
        const discountAmount = (totalReservationCost * discountPercentage) / 100;
        const discountedCost = totalReservationCost - discountAmount;

        setDiscountAmount(discountAmount);  // 할인 금액을 state에 저장
        setDiscountedTotalReservationCost(discountedCost > 0 ? discountedCost : 0);
      }
    } else {
      // 할인 쿠폰이 아닌 경우, 기존 총 예약 금액 사용
      setDiscountAmount(0);  // 할인이 적용되지 않은 경우 할인 금액을 0으로 설정
      setDiscountedTotalReservationCost(Number(sessionStorage.getItem('totalReservationCost')) || 0);
    }
  }, [selectedCoupon]);
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

  // const formatDateString = (dateString) => {
  //   const options = {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //     fractionalSecondDigits: 3,
  //     timeZoneName: 'short',
  //   };

  //   const date = new Date(dateString);
  //   const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  //   return formattedDate;
  // };

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
    // 아이콘 넣기 위함
    if (roomDTO) {
      axios.get(`/user/getHotelInfo?seqHotel=${roomDTO.seqHotel}`)
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
    }
  }, [roomDTO]);

  // const [seqReservation, setSeqReservation] = useState();
  // const seqReservationRef = useRef(seqReservation);

  // useEffect(() => {
  //   seqReservationRef.current = seqReservation;
  // }, [seqReservation]);

  // const updateSeqReservation = (value) => {
  //   setSeqReservation(value);
  //   seqReservationRef.current = value;
  // };

  const requestPay = async () => {
    // 라이브러리 스크립트가 정상적으로 로딩되었는지 확인
    if (window.IMP) {
      const userCode = "imp14397622";
      window.IMP.init(userCode);

      try {
        const response = await new Promise((resolve, reject) => {
          window.IMP.request_pay({
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: new Date().getTime().toString(),
            name: "SPACE SHARP",
            amount: Number(discountedTotalReservationCost),

            buyer_tel: "010-0000-0000",
            // redirect_url: "http://localhost:3000/", //URL 교체
          }, (response) => {
            resolve(response);
          });
        });

        if (response.success) {
          // 성공 시 처리

          // 예약 테이블 업데이트
          const reservationData = {
            email: sessionUserDTO.email,
            seqRoom: roomDTO.seqRoom,
            reservationDate: new Date(sessionStorage.getItem('currentDateTime')).toISOString(),
            travelStartDate: new Date(sessionStorage.getItem('travelStartDate')).toISOString(),
            travelEndDate: new Date(sessionStorage.getItem('travelEndDate')).toISOString(),
            travelfulltime: parseInt(sessionStorage.getItem('travelfulltime'), 10),
            active: null,
            payment: sessionUserDTO.payment
          };

          axios.post('/user/reservation', reservationData)
            .then(response => {

              const seqReservation = response.data;

              // Update reservationDTO with the obtained seqReservation
              // updateSeqReservation(seqReservation);

              const receiptData = {
                email: sessionUserDTO.email,
                bank_name: sessionUserDTO.payment,
                seqReservation: seqReservation, // Use the updated value
                receipt_url: null,
                name: hotelDTO.name,
                paidAmount: Number(discountedTotalReservationCost),
                payDate: new Date(sessionStorage.getItem('currentDateTime')).toISOString(),
                couponDiscount: discountAmount * 1
              };

              axios.post('/user/receipt', receiptData)
                .then(receiptResponse => {
                  console.log(receiptResponse.data);
                  Swal.fire({
                    title: '결제 완료',
                    text: '결제가 성공적으로 완료되었습니다.',
                    icon: 'success',
                    confirmButtonText: '확인'
                  }).then(() => {
                    window.location.href = "http://localhost:3000/";
                  });//데이터 추가 완료 후 이동 URL
                })
                .catch(receiptError => {
                  console.error('영수증 정보 전송 실패:', receiptError);
                  alert('영수증 정보 전송에 실패했습니다.');
                });
            })
            .catch(error => {
              console.error('예약 정보 전송 실패:', error);
              alert('예약 정보 전송에 실패했습니다.');
            });
        } else {
          // 결제 실패 시 처리
          console.error('결제 실패:', response.error_msg);
          alert('결제에 실패했습니다.');
        }
      } catch (error) {
        // 예외 처리
        console.error('결제 오류:', error);
        alert('결제 중 오류가 발생했습니다.');
      }
    } else {
      // IMP 라이브러리가 로드되지 않은 경우 처리
      alert('결제 라이브러리 로드에 실패했습니다.');
    }
  };

  useEffect(() => {
    // CouponDTO 가져오기
    axios.get('/user/coupon')  // 적절한 엔드포인트로 변경
      .then(response => {
        setCouponDTO(response.data);
      })
      .catch(error => {
        console.error('Error fetching coupon information:', error);
      });

    // IssuedCouponDTO 가져오기
    axios.get('/user/issuedCoupon')  // 적절한 엔드포인트로 변경
      .then(response => {
        setIssuedCouponDTO(response.data);
      })
      .catch(error => {
        console.error('Error fetching issued coupon information:', error);
      });
  }, []);

  useEffect(() => {
    // CouponDTO와 IssuedCouponDTO를 기반으로 옵션 생성
    if (couponDTO.length > 0 && issuedCouponDTO.length > 0) {
      const userCoupons = issuedCouponDTO.filter(coupon => coupon.email === sessionUserDTO.email);

      const options = userCoupons.map(issuedCoupon => {
        const correspondingCoupon = couponDTO.find(coupon => coupon.seqCoupon === issuedCoupon.seqCoupon);
        // 위 라인 대신에, couponDTO의 모든 값을 사용하도록 수정
        return {
          value: JSON.stringify(correspondingCoupon), // 모든 값을 문자열로 저장
          label: `🎫 ${correspondingCoupon.title}`,
        };
      });

      setCouponOptions(options);
    }
  }, [couponDTO, issuedCouponDTO, sessionUserDTO.email]);
  // TRUE인 항목들을 5개씩 그룹화하여 반환하는 함수
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
                      <li className="list-group-item me-0" style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5%' }}>
                          <span className="fw-bold me-1">할인쿠폰🎫</span>
                          <span className="fw-bold me-1" style={{ color: '#aba1a1' }}>
                            보유쿠폰(
                            {issuedCouponDTO
                              ? issuedCouponDTO.filter(coupon => coupon.email === sessionUserDTO.email).length
                              : 0}
                            장)
                          </span>
                        </div>
                        <div style={{}}>
                          <select
                            className="form-select form-select-lg mb-3"
                            aria-label="Large select example"
                            style={{ color: '#aba1a1' }}
                            onChange={handleCouponSelection}
                          >
                            <option value="" selected>
                              🎫 쿠폰을 선택하세요.
                            </option>
                            {couponOptions.map((option, index) => (
                              <option key={index} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </li>
                      <li className="list-group-item" style={{ borderTop: '5px solid rgb(244, 132, 132)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5%' }}>
                          <span className="fw-bold me-1">예약금액</span>
                          <span style={{ fontSize: '150%' }}>{Number(sessionStorage.getItem('totalReservationCost')).toLocaleString()}</span>
                        </div>
                        <div style={{ color: '#F48484', display: 'flex', justifyContent: 'space-between', marginBottom: '5%' }}>
                          <span className="fw-bold me-1"><i className="bi bi-ticket-perforated-fill" />  {selectedCoupon ? selectedCoupon.title : ' '}</span>
                          <span style={{ fontSize: '150%' }}>-{Number(discountAmount).toLocaleString()}</span>
                        </div>
                        <h3 className="fw-bold d-flex justify-content-between" style={{ color: 'rgb(245, 80, 80)' }}>
                          <span>￦</span>
                          <span>{Number(discountedTotalReservationCost).toLocaleString()}</span>
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