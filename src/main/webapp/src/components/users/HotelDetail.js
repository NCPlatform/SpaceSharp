import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col, Carousel, Tabs, Tab } from 'react-bootstrap';
import '../../css/hotelDetail.css';
import img01 from '../../img/img01.png';
import DetailSelect from '../detail/DetailSelect';
import HotelContentMap from "./HotelContentMap";
import HotelSameSpace from "./HotelSameSpace";
import axios from "axios";

const Detail = () => {
  const [hotelName, setHotelName] = useState('');
  const [loading, setLoading] = useState(true);
  const [seqHotel, setSeqHotel] = useState(2);

  useEffect(() => {
    axios.get(`/user/getHotelName?seqHotel=${seqHotel}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setHotelName(data);
        } else {
          console.error('해당 호텔을 찾을 수 없습니다.');
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
      <div style={{ backgroundColor: '#f6f6f6' }}>
        <br />
        <br />
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <div className="h_area" style={{ overflow: 'hidden' }}>
                <span className="distance_option">해방촌 메인 거리 근처</span>
                <br />
                <br />
                <h2 className="space_name">{hotelName}</h2>
              </div>
              <p className="sub_desc">해방촌의 감성과 남산뷰를 품은 프라이빗 공간</p>
              <div className="tags">
                <span className="tag"> #태그1 </span>
                <span className="tag"> #태그2 </span>
                <span className="tag"> #태그3 </span>
              </div>
              <br /><br />
              <div className='detail_forms'>
                <Carousel interval={null} style={{ width: '90%' }}>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={img01}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={img01}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={img01}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
                <p className='sub_desc' style={{ color: '#666', fontSize: '200%' }}>해방촌의 감성과 남산뷰를 품은 프라이빗 공간</p>
              </div>
              <Tabs
                defaultActiveKey="home"
                id="fill-tab-example"
                className="mb-3"
                fill
                style={{ width: '60%' }}
              >
                <Tab eventKey="home" title={<span style={{ color: '#656565', fontWeight: 'bold' }}>공간소개</span>}>
                  <div style={{ color: '#656565' }}>
                    <strong style={{ color: 'black' }}>공간소개</strong>
                    <br />
                    <hr style={{ width: '20px', border: '4px solid #ff7402' }} />
                    - 3층: 자연광이 드는 실내 공간 + 야외 정원 테라스
                    <br />
                    - 4층: 남산타워와, 하얏트와 용산 공원뷰 루프탑
                    <br />
                    한 팀 단독으로 대관하실 수 있는 프라이빗 파티룸 입니다.
                    <br />
                    <br />
                    <p>1. 브라이덜샤워 패키지</p>
                    - 주말: 시간당 7만원 / 올나잇 40만원 / 올데이 50만원
                    <br />
                    - 평일 낮: 5H 17만원 / 평일 저녁: 5H 20만원
                    <br />
                    - 평일 올나잇: 25만원 / 평일 올데이 30만원
                    <br />
                    <br />
                    <p>2. 공간대여/파티룸</p>
                    - 주말: 시간당 7만원 / 올나잇 40만원 / 올데이 50만원
                    <br />
                    - 평일 낮: 5H 17만원 / 평일 저녁: 5H 20만원
                    <br />
                    - 평일 올나잇: 25만원 / 평일 올데이 30만원
                    <br />
                    <br />
                    <p>3. 렌탈스튜디오: 시간당 55,000원</p>
                    - 최소 예약 시간 2시간
                    <br />
                    - 인원 추가 인당 5,500/시간
                    <br />
                    <br />
                    * 기준 인원: 3인 (인당 10,000원 추가)
                    <br />
                    * 당일 예약, 반려동물 동반은 따로 문의
                    <br />
                    <br />
                    * 예약 및 문의
                    <br />
                    IG@zegmanhaus / 카카오톡 '제그만하우스'
                    <br />
                    <br />
                    <div>
                      <h5 style={{ display: 'inline', color: 'black' }}>영업시간&nbsp;&nbsp;</h5>&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5 style={{ display: 'inline' }}>0 ~ 24시</h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <h5 style={{ display: 'inline', color: 'black' }}>휴무일&nbsp;&nbsp;</h5>&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h5 style={{ display: 'inline' }}>없음</h5>
                      <br />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                          <i className="bi bi-arrow-up-right-square" style={{ color: 'black', fontSize: '40px', marginRight: '70px' }} />
                          <p style={{ fontSize: '12px' }}>지상 3층</p>
                        </div>
                        <div>
                          <i className="bi bi-car-front" style={{ color: 'black', fontSize: '40px', marginRight: '70px' }} />
                          <p style={{ fontSize: '12px' }}>주차 O</p>
                        </div>
                        <div>
                          <i className="bi bi-arrow-down-up" style={{ color: 'black', fontSize: '40px' }} />
                          <p style={{ fontSize: '12px' }}>엘리베이터 X</p>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className='mapFrame'>
                      <HotelContentMap />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="profile" title={<span style={{ color: '#656565', fontWeight: 'bold' }}>시설안내</span>}>
                  <div style={{ color: '#656565' }}>
                    <strong style={{ color: 'black' }}>공간소개</strong>
                    <br />
                    <hr style={{ width: '20px', border: '4px solid #ff7402' }} />
                    - 3층: 자연광이 드는 실내 공간 + 야외 정원 테라스
                    <br />
                    - 4층: 남산타워와, 하얏트와 용산 공원뷰 루프탑
                    <br />
                  </div>
                </Tab>
                <Tab eventKey="longer-tab1" title={<span style={{ color: '#656565', fontWeight: 'bold' }}>유의사항</span>}>
                  Tab content for Loooonger Tab
                </Tab>
                <Tab eventKey="longer-tab2" title={<span style={{ color: '#656565', fontWeight: 'bold' }}>환불정책</span>}>
                  Tab content for Loooonger Tab
                </Tab>
                <Tab eventKey="longer-tab3" title={<span style={{ color: '#656565', fontWeight: 'bold' }}>이용후기</span>}>
                  Tab content for Loooonger Tab
                </Tab>


              </Tabs>
            </Col>
            <Col xs={12} md={4} className="fixed-col">
              <DetailSelect />
            </Col>
          </Row>
          <br />
          <br />
          <HotelSameSpace />
        </Container>
        <br /><br /><br />
      </div>
      <Footer />
    </>
  );
};

export default Detail;
