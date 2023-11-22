import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col, Carousel, Tabs, Tab } from "react-bootstrap";
import "../../css/hotelDetail.css";
import img01 from "../../img/img01.png";
import DetailSelect from "../detail/DetailSelect";
import HotelContentMap from "./HotelContentMap";
import HotelSameSpace from "./HotelSameSpace";
import axios from "axios";
import { useParams } from "react-router-dom";
function formatFacilities(facilities) {
  // 쉼표로 문자열을 나누고 <br />로 연결하여 줄 바꿈을 만듭니다
  const formattedFacilities = facilities.split(',').map((facility, index) => (
    `<strong>${index + 1}.</strong> ${facility}<br />`
  )).join('');
  return formattedFacilities;
}
function formatAlert(alert) {
  // 쉼표로 문자열을 나누고 <br />로 연결하여 줄 바꿈을 만듭니다
  const formattedAlert = alert.split(',').map((item, index) => (
    `<strong>${index + 1}.</strong> ${item.trim()}<br />`
  )).join('');
  return formattedAlert;
}
function formatRefund(refund) {
  // 환불 조건을 줄바꿈을 기준으로 나눕니다
  const refundConditions = refund.split(',');

  // 각 환불 조건을 원하는 형식으로 변환합니다
  const formattedRefund = refundConditions.map((condition, index) => {
    const daysBefore = refundConditions.length - index; // 현재 일수를 계산합니다
    const daysBeforeText = daysBefore === 1 ? '이용 당일' : `이용 ${daysBefore - 1}일 전`; // 일수에 맞게 텍스트를 설정합니다
    return `<strong>${daysBeforeText}</strong> ${condition.trim()}<br /><br />`; // Added extra <br /> for more separation
  }).join('');

  return formattedRefund;
}
const Detail = () => {
  const [hotelDTO, setHotelDTO] = useState(null);
  const [hotelName, setHotelName] = useState('');
  const [mainKeyword, setMainKeyword] = useState('');
  const [subscribe, setSubscribe] = useState('');
  const [tags, setTags] = useState('');
  const [placeEx, setPlaceEx] = useState('');
  const [facilities, setFacilities] = useState('');
  const [alert, setAlert] = useState('');
  const [refund, setRefund] = useState('');
  const [workinghour, setWorkinghour] = useState('');
  const [holiday, setHoliday] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  // useParams를 통해 동적인 URL 파라미터 값을 가져옴
  const { seqHotel } = useParams();

  useEffect(() => {
    axios.get(`/user/getHotelName?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setHotelName(data);
        } else {
          console.error('해당 공간을 찾을 수 없습니다.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
        setLoading(false);
      });
    // 새로운 요청을 통해 main_keyword 가져오기
    axios.get(`/user/getMainKeyword?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setMainKeyword(data);
        } else {
          console.error('해당 공간의 키워드를 찾을 수 없습니다.');
        }
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
    // 새로운 요청을 통해 subscribe 가져오기
    axios.get(`/user/getSubscribe?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setSubscribe(data);
        } else {
          console.error('해당 공간의 키워드를 찾을 수 없습니다.');
        }
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
    // 새로운 요청을 통해 키워드 가져오기
    axios.get(`/user/getTags?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setTags(data);
        } else {
          console.error('해당 공간의 키워드를 찾을 수 없습니다.');
        }
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
    // 새로운 요청을 통해 공간소개 가져오기
    axios.get(`/user/getPlaceEx?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setPlaceEx(data);
        } else {
          console.error('해당 공간의 소개를 찾을 수 없습니다.');
        }
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
    // 새로운 요청을 통해 시설안내 가져오기
    axios.get(`/user/getFacilities?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setFacilities(data);
        } else {
          console.error('해당 공간의 소개를 찾을 수 없습니다.');
        }
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
    // 새로운 요청을 통해 유의사항 가져오기
    axios.get(`/user/getAlert?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setAlert(data);
        } else {
          console.error('해당 공간의 소개를 찾을 수 없습니다.');
        }
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
    // 새로운 요청을 통해 환불정책 가져오기
    axios.get(`/user/getRefund?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setRefund(data);
        } else {
          console.error('해당 공간의 소개를 찾을 수 없습니다.');
        }
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
    // 새로운 요청을 통해 영업시간 가져오기
    axios.get(`/user/getWorkinghour?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setWorkinghour(data);
        } else {
          console.error('해당 공간의 소개를 찾을 수 없습니다.');
        }
      })
    // 새로운 요청을 통해 휴무 가져오기
    axios.get(`/user/getHoliday?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setHoliday(data);
        } else {
          console.error('해당 공간의 소개를 찾을 수 없습니다.');
        }
      })
    // 새로운 요청을 통해 이미지 가져오기
    axios.get(`/user/getImages?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          // 이미지 경로를 콤마로 나누어 배열로 저장
          setImages(data.split(','));
        } else {
          console.error('해당 공간을 찾을 수 없습니다.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
        setLoading(false);
      });
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
  return (
    <>
      <Nav />
      <div style={{padding: "20px 0" }}>
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <div className="h_area" style={{ overflow: "hidden" }}>
                <span className="distance_option">{mainKeyword}</span>
                <br />
                <br />
                <h2 className="space_name">{hotelName}</h2>
              </div>
              <p className="sub_desc">{subscribe}</p>
              <div className="tags">
                {tags.split(',').map((tag, index) => (
                  <span key={index} className="tag"> {tag.trim()} </span>
                ))}
              </div>
              <br />
              <br />
              <div className="detail_forms">
                <Carousel interval={null} style={{ width: "90%" }}>
                  {images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <div style={{ overflow: 'hidden', height: '500px', width: '100%' }}>
                        <img className="d-block w-100 img-fluid" src={image} alt={`Slide ${index + 1}`} style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
                <p className='sub_scribe' style={{ color: '#666', fontSize: '200%', whiteSpace: 'pre-wrap' }}>{subscribe}</p>
              </div>
              <Tabs
                defaultActiveKey="home"
                id="fill-tab-example"
                className="mb-3"
                fill
                style={{ width: "100%" }}
              >
                <Tab
                  eventKey="home"
                  title={
                    <span style={{ color: "#656565", fontWeight: "bold" }}>
                      공간소개
                    </span>
                  }
                >
                  <div style={{ color: "#656565" }}>
                    <strong style={{ color: "black" }}>공간소개</strong>
                    <br />
                    <hr
                      style={{ width: "20px", border: "4px solid #ff7402" }}
                    />
                    <div dangerouslySetInnerHTML={{ __html: placeEx }} />
                    <br />
                    <br />
                    <div>
                      <h5 style={{ display: "inline", color: "black" }}>
                        영업시간&nbsp;&nbsp;
                      </h5>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5 style={{ display: 'inline' }}>{workinghour}</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <h5 style={{ display: "inline", color: "black" }}>
                        휴무일&nbsp;&nbsp;
                      </h5>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5 style={{ display: 'inline' }}>{holiday}</h5>
                      <br />
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {hotelDTO && (
                          <React.Fragment>
                            {hotelDTO.animal === true && (
                              <div>
                                <p style={{ fontSize: '12px' }}>반려동물 가능</p>
                              </div>
                            )}&nbsp;&nbsp;
                            {hotelDTO.parking === true && (
                              <div>
                                <p style={{ fontSize: '12px' }}>주차 가능</p>
                              </div>
                            )}&nbsp;&nbsp;
                            {hotelDTO.roofTop === true && (
                              <div>
                                <p style={{ fontSize: '12px' }}>루프탑 보유</p>
                              </div>
                            )}&nbsp;&nbsp;
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                    <br />
                    <div className="mapFrame">
                      <HotelContentMap seqHotel={seqHotel} />
                    </div>
                  </div>
                </Tab>
                <Tab
                  eventKey="profile"
                  title={
                    <span style={{ color: "#656565", fontWeight: "bold" }}>
                      시설안내
                    </span>
                  }
                >
                  <div style={{ color: "#656565" }}>
                    <strong style={{ color: "black" }}>시설안내</strong>
                    <br />
                    <hr
                      style={{ width: "20px", border: "4px solid #ff7402" }}
                    />
                    <div dangerouslySetInnerHTML={{ __html: formatFacilities(facilities) }} />
                  </div>
                </Tab>
                <Tab
                  eventKey="longer-tab1"
                  title={
                    <span style={{ color: "#656565", fontWeight: "bold" }}>
                      유의사항
                    </span>
                  }
                >
                  <div style={{ color: "#656565" }}>
                    <strong style={{ color: "black" }}>유의사항</strong>
                    <br />
                    <hr
                      style={{ width: "20px", border: "4px solid #ff7402" }}
                    />
                    {/* <div dangerouslySetInnerHTML={{ __html: alert }} /> */}
                    <div dangerouslySetInnerHTML={{ __html: formatAlert(alert) }} />
                  </div>
                </Tab>
                <Tab
                  eventKey="longer-tab2"
                  title={
                    <span style={{ color: "#656565", fontWeight: "bold" }}>
                      환불정책
                    </span>
                  }
                >
                  <div style={{ color: "#656565" }}>
                    <strong style={{ color: "black" }}>환불정책</strong>
                    <br />
                    <hr
                      style={{ width: "20px", border: "4px solid #ff7402" }}
                    />
                    {/* <div dangerouslySetInnerHTML={{ __html: refund }} /> */}
                    <div dangerouslySetInnerHTML={{ __html: formatRefund(refund) }} />
                  </div>
                </Tab>
                <Tab
                  eventKey="longer-tab3"
                  title={
                    <span style={{ color: "#656565", fontWeight: "bold" }}>
                      이용후기
                    </span>
                  }
                >
                  <div style={{ color: "#656565" }}>
                    <strong style={{ color: "black" }}>이용후기</strong>
                    <br />
                    <hr
                      style={{ width: "20px", border: "4px solid #ff7402" }}
                    />
                    
                  </div>
                </Tab>
              </Tabs>
            </Col>
            <Col xs={12} md={4} className="fixed-col">
              <DetailSelect hotel={seqHotel} />
            </Col>
          </Row>
          <br />
          <br />
          {hotelDTO && (
            <HotelSameSpace
              hotel={seqHotel}
              hotelCategory={hotelDTO.seqHotelCategory}
            />
          )}
        </Container>
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Detail;
