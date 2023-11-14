import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from 'react-bootstrap/Button';

import { Card, Carousel, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from 'axios'

const List = () => {
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const [selectedOption5, setSelectedOption5] = useState(null);
  const [selectedOption6, setSelectedOption6] = useState(null);
  const [selectedOption7, setSelectedOption7] = useState(null);
  const [selectedOption8, setSelectedOption8] = useState(null);

  const handleOption1Change = (e) => {
    setSelectedOption1(e.target.value);
    setSelectedOption2(null); // 상위 드롭다운이 변경될 때 하위 드롭다운을 초기화
  };

  const handleOption2Change = (e) => {
    setSelectedOption2(e.target.value);
  };

  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }

  const {seqHotelCategory} = useParams()
  const [hotelList,setHotelList] = useState([]);

  useEffect(()=>{
    axios.post('/user/getHotelList',null,{params : {seqHotelCategory}})
    .then(res=>{
      setHotelList(res.data);
    })
    .catch(error => console.log(error))
  },[])
  
  return (

      <div>
        <Nav />
        <div className='container'>
          <Row md={5}>
          <div>
          <Col>
          <div>
      <select className="form-select ms-auto location" value={selectedOption1} onChange={handleOption1Change}>
        <option value="">지역</option>
        <option value="seoul">서울</option>
        <option value="gyung-gi">경기</option>
        <option value="incheon">인천</option>
        <option value="busan">부산</option>
        <option value="gwang-ju">광주</option>
        <option value="daegu">대구</option>
        <option value="daegeon">대전</option>
        <option value="woolsan">울산</option>
        <option value="jeju">제주</option>
        <option value="gangwon">강원</option>
        <option value="gyung-nam">경남</option>
        <option value="gyung-book">경북</option>
        <option value="jeon-nam">전남</option>
        <option value="jeon-book">전북</option>
        <option value="choong-nam">충남</option>
        <option value="choong-book">충북</option>
      </select>
      
      {selectedOption1 && (
        <select className="form-select ms-auto" value={selectedOption2} onChange={handleOption2Change}>
          <option value="">선택하세요</option>
          {selectedOption1 === "seoul" && (
            <>
              <option value="seoul1">서울 전체</option>
              <option value="seoul2">홍대, 합정, 상수, 연남</option>
              <option value="seoul3">강남역, 역삼, 선릉, 삼성</option>
              <option value="seoul4">신촌, 이대, 아현, 연희</option>
              <option value="seoul5">신사, 논현, 청담, 압구정</option>
              <option value="seoul6">망원, 성산, 상암</option>
              <option value="seoul7">서초, 교대, 방배</option>
              <option value="seoul8">명동, 을지로, 동대문역</option>
              <option value="seoul9">성수, 왕십리, 서울숲</option>
              <option value="seoul10">영등포, 여의도, 당산, 문래</option>
              <option value="seoul11">종로, 광화문, 대학로</option>
              <option value="seoul12">송파, 잠실, 방이</option>
              <option value="seoul13">용산, 이태원, 한남</option>
              <option value="seoul14">관악, 신림, 서울대입구</option>
              <option value="seoul15">광진, 건대, 구의, 군자</option>
              <option value="seoul16">동작, 사당, 이수</option>
              <option value="seoul17">성북, 성신여대, 안암</option>
              <option value="seoul18">강서, 마곡, 화곡</option>
              <option value="seoul19">도곡, 대치, 개포, 수서</option>
              <option value="seoul20">마포역, 공덕, 대흥</option>
              <option value="seoul21">구로, 신도림, 고척</option>
              <option value="seoul22">금천, 가산, 독산</option>
              <option value="seoul23">강동, 성내, 천호 길동</option>
              <option value="seoul24">동대문구, 청량리, 회기</option>
              <option value="seoul25">양천, 목동, 신정</option>
              <option value="seoul26">은평, 불광, 연신내</option>
              <option value="seoul27">노원, 상계, 공릉</option>
              <option value="seoul28">강북, 수유, 미아</option>
              <option value="seoul29">중랑, 상봉, 면목</option>
              <option value="seoul30">도봉, 쌍문, 창동</option>
            </>
          )}
          {selectedOption1 === "gyung-gi" && (
            <>
              <option value="gyung-gi1">경기 전체</option>
              <option value="gyung-gi2">고양 일산</option>
              <option value="gyung-gi3">수원역, 팔달, 권선, 장안</option>
              <option value="gyung-gi4">동수원 영통, 광교</option>
              <option value="gyung-gi5">성남 분당, 판교</option>
              <option value="gyung-gi6">부천 역곡, 상동</option>
              <option value="gyung-gi7">용인 수지, 동탄</option>
              <option value="gyung-gi8">김포 구래, 장기</option>
              <option value="gyung-gi9">파주 금촌, 헤아리</option>
              <option value="gyung-gi10">안산, 시흥, 광명</option>
              <option value="gyung-gi11">안양, 과천, 군포, 의왕</option>
              <option value="gyung-gi12">화성, 오산, 평택, 안성</option>
              <option value="gyung-gi13">남양주, 구리, 가평</option>
              <option value="gyung-gi14">의정부, 양주, 동두천</option>
              <option value="gyung-gi15">하남, 미사, 광주</option>
              <option value="gyung-gi16">여주, 이천, 양평</option>
              <option value="gyung-gi17">포천, 연천</option>
            </>
          )}
        
        
          {selectedOption1 === "incheon" && (
            <>
              <option value="incheon1">인천 전체</option>
              <option value="incheon2">부평역, 부평구청</option>
              <option value="incheon3">남동구 구월, 논현</option>
              <option value="incheon4">서구 청라, 검단</option>
              <option value="incheon5">연수구 송도, 원인재</option>
              <option value="incheon6">미추홀구 제물포, 주안</option>
              <option value="incheon7">계양구 계산, 작전</option>
              <option value="incheon8">동인천 신포, 월미도</option>
              <option value="incheon9">영종도, 인천공항, 을왕리</option>
              <option value="incheon10">강화, 옹진</option>
            </>
          )}
        
        
          {selectedOption1 === "busan" && (
            <>
              <option value="busan1">부산 전체</option>
              <option value="busan2">부산진구 서면, 전포</option>
              <option value="busan3">부산역, 남포, 자갈치</option>
              <option value="busan4">금정구 부산대, 범어사</option>
              <option value="busan5">수영구 광안리, 남천</option>
              <option value="busan6">해운대구 벡스코, 송정</option>
              <option value="busan7">남구 대연, 경성대, 부경대</option>
              <option value="busan8">동래구 사직, 온천장</option>
              <option value="busan9">기장군 정관, 오시리아</option>
              <option value="busan10">북구 덕천, 화명</option>
              <option value="busan11">강서구 명지, 가덕도</option>
              <option value="busan12">영도 흰여울</option>
            </>
          )}
        
        
          {selectedOption1 === "gwang-ju" && (
            <>
              <option value="gwang-ju1">광주 전체</option>
              <option value="gwang-ju2">북구 전대후문, 일곡</option>
              <option value="gwang-ju3">동구 동명로, 충장로, 금남로</option>
              <option value="gwang-ju4">광산구 수완지구, 첨단, 송정역</option>
              <option value="gwang-ju5">남구 양림, 봉선, 진월</option>
              <option value="gwang-ju6">서구 상무지구, 풍암, 금호</option>
            </>
          )}
        
        
          {selectedOption1 === "daegu" && (
            <>
              <option value="daegu1">대구 전체</option>
              <option value="daegu2">중구 동성로, 반월당, 중앙로</option>
              <option value="daegu3">수성구 수성못, 범어, 시지</option>
              <option value="daegu4">달서구 월성, 성서, 죽전네거리</option>
              <option value="daegu5">북구 칠곡, 경북대, 산격, 대현</option>
              <option value="daegu6">남구 명덕네거리, 대명동</option>
              <option value="daegu7">동구 동대구역, 팔공산, 신서</option>
              <option value="daegu8">달성군 현풍, 다사</option>
              <option value="daegu9">서구 비산, 두류, 내당, 평리</option>
              <option value="daegu10">군위군</option>
            </>
          )}
        
        
          {selectedOption1 === "daegeon" && (
            <>
              <option value="daegeon1">대전 전체</option>
              <option value="daegeon2">서구 둔산, 도안</option>
              <option value="daegeon3">유성구 궁동, 대덕연구단지</option>
              <option value="daegeon4">중구 서대전네거리, 은행</option>
              <option value="daegeon5">동구 소제, 용전, 동구청</option>
              <option value="daegeon6">대덕구 송촌</option>
            </>
          )}
        
        
          {selectedOption1 === "woolsan" && (
            <>
              <option value="woolsan1">울산 전체</option>
              <option value="woolsan2">남구 무거, 삼산, 신정</option>
              <option value="woolsan3">중구 성남, 태화, 병영</option>
              <option value="woolsan4">북구 송정, 진장, 화봉</option>
              <option value="woolsan5">울주군 언양, 범서, 서생</option>
              <option value="woolsan6">동구 일산, 방어, 화정</option>
            </>
          )}
        
        
          {selectedOption1 === "jeju" && (
            <>
              <option value="jeju1">제주 전체</option>
              <option value="jeju2">제주시 전체</option>
              <option value="jeju3">서귀포시 전체</option>
              <option value="jeju4">제주시청, 삼양, 삼화</option>
              <option value="jeju5">서귀포시내, 중문</option>
              <option value="jeju6">노형, 아라, 제주대</option>
              <option value="jeju7">성산, 섭지코지, 온평</option>
              <option value="jeju8">조천, 함덕, 김녕, 월정리</option>
            </>
          )}
        
        
          {selectedOption1 === "gangwon" && (
            <>
              <option value="gangwon1">강원 전체</option>
              <option value="gangwon2">강릉 교동, 경포대, 주문진</option>
              <option value="gangwon3">춘천 명동, 강원대, 남춘천</option>
              <option value="gangwon4">원주 중앙, 무실, 반곡</option>
              <option value="gangwon5">속초 영랑, 조양, 노학</option>
              <option value="gangwon6">동해 묵호, 망상</option>
              <option value="gangwon7">삼척 장호, 맹방</option>
              <option value="gangwon8">태백 황지, 장성</option>
            </>
          )}
      
        
          {selectedOption1 === "gyung-nam" && (
            <>
              <option value="gyung-nam1">경남 전체</option>
              <option value="gyung-nam2">창원 상남, 용호</option>
              <option value="gyung-nam3">창원 마산, 진해</option>
              <option value="gyung-nam4">양산 물금, 하북, 서창</option>
              <option value="gyung-nam5">진주 신안, 초전, 충무공</option>
              <option value="gyung-nam6">김해 장유, 봉황</option>
              <option value="gyung-nam7">사천 삼천포, 사천읍</option>
              <option value="gyung-nam8">밀양 위양지, 산외, 단장</option>
              <option value="gyung-nam9">거제 고현, 옥포</option>
              <option value="gyung-nam10">통영, 고성</option>
              <option value="gyung-nam11">남해, 하동, 산청</option>
              <option value="gyung-nam12">의령, 함안, 창녕</option>
              <option value="gyung-nam13">합천, 거창, 함양</option>
            </>
          )}
        
        
          {selectedOption1 === "gyung-book" && (
            <>
              <option value="gyung-book1">경북 전체</option>
              <option value="gyung-book2">포항 육거리, 구룡포, 흥해</option>
              <option value="gyung-book3">구미 인동, 원평</option>
              <option value="gyung-book4">경산 임당, 하양</option>
              <option value="gyung-book5">경주 보문, 황남, 양남</option>
              <option value="gyung-book6">안동 남문, 삼산, 옥동</option>
              <option value="gyung-book7">김천 교동, 율곡</option>
              <option value="gyung-book8">영천 시청, 임고</option>
              <option value="gyung-book9">영주 가흥, 풍기, 무섬</option>
              <option value="gyung-book10">문경 점촌, 산양, 마성</option>
              <option value="gyung-book11">상주 무향, 함창</option>
              <option value="gyung-book12">청도 화양, 이서, 각북</option>
              <option value="gyung-book13">울릉도</option>
              <option value="gyung-book14">봉화, 영양, 울진</option>
              <option value="gyung-book15">칠곡, 성주, 고령</option>
              <option value="gyung-book16">의성, 예천</option>
              <option value="gyung-book17">영덕, 청송</option>
            </>
          )}
        
        
          {selectedOption1 === "jeon-nam" && (
            <>
              <option value="jeon-nam1">전남 전체</option>
              <option value="jeon-nam2">여수 돌산, 종화, 부삼</option>
              <option value="jeon-nam3">목포 평화광장, 죽교</option>
              <option value="jeon-nam4">순천 신대, 연향, 조례</option>
              <option value="jeon-nam5">나주 송월, 남평</option>
              <option value="jeon-nam6">광양 중마</option>
              <option value="jeon-nam7">화순, 담양, 장성</option>
              <option value="jeon-nam8">고흥, 보성, 장흥</option>
              <option value="jeon-nam9">곡성, 구례</option>
              <option value="jeon-nam10">무안, 신안, 영암</option>
              <option value="jeon-nam11">영광, 함평</option>
              <option value="jeon-nam12">해남, 강진</option>
              <option value="jeon-nam13">완도, 진도</option>
            </>
          )}
    
        
          {selectedOption1 === "jeon-book" && (
            <>
              <option value="jeon-book1">전북 전체</option>
              <option value="jeon-book2">전주 객사, 전북대, 중동</option>
              <option value="jeon-book3">익산 영등, 모현, 신동</option>
              <option value="jeon-book4">군산 영동, 나운, 수송</option>
              <option value="jeon-book5">완주 소양, 삼례</option>
              <option value="jeon-book6">남원 도통, 동충</option>
              <option value="jeon-book7">김제 만경, 금산</option>
              <option value="jeon-book8">정읍 수성, 내장산</option>
              <option value="jeon-book9">고창, 부안</option>
              <option value="jeon-book10">순창, 임실</option>
              <option value="jeon-book11">무주, 진안, 장수</option>
            </>
          )}

          {selectedOption1 === "choong-nam/ sejong" && (
            <>
              <option value="choong-nam/ sejong1">충남/세종 전체</option>
              <option value="choong-nam/ sejong2">세종 정부청사, 조치원</option>
              <option value="choong-nam/ sejong3">천안 목천, 성환, 직산, 성거</option>
              <option value="choong-nam/ sejong4">아산 온양온천, 배방</option>
              <option value="choong-nam/ sejong5">공주 제민천, 신관</option>
              <option value="choong-nam/ sejong6">서산 해미, 성연, 호수공원</option>
              <option value="choong-nam/ sejong7">보령 대천, 동대, 웅천, 청라</option>
              <option value="choong-nam/ sejong8">태안 안면도, 만리포</option>
              <option value="choong-nam/ sejong9">당진 송악, 고대, 신평, 합덕</option>
              <option value="choong-nam/ sejong10">논산 취암, 내동, 연무, 가야곡</option>
              <option value="choong-nam/ sejong11">계룡 금암, 엄사, 두마</option>
              <option value="choong-nam/ sejong12">금산 상리, 추부</option>
              <option value="choong-nam/ sejong13">예산, 홍성</option>
              <option value="choong-nam/ sejong14">청양, 부여, 서천</option>
              
            </>
          )}
        
        {selectedOption1 === "choong-book" && (
          <>
            <option value="choong-book1">충북 전체</option>
            <option value="choong-book2">청주 수암골, 율량, 흥덕, 사창</option>
            <option value="choong-book3">충주 연수, 호암, 성서</option>
            <option value="choong-book4">제천 의림지, 청풍, 하소</option>
            <option value="choong-book5">단양 대강, 영춘, 단양읍</option>
            <option value="choong-book6">진천, 음성</option>
            <option value="choong-book7">증평, 괴산</option>
            <option value="choong-book8">보은, 옥천, 영동</option>
            
          </>
        )}

        </select>
        )}
        </div>
        </Col>    
        
    </div>
        <Col>
        <div>
    <select className="form-select ms-auto" value={selectedOption3} onChange={handleOption1Change}>
      <option value="">선택하세요</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
    </select>
    
    {selectedOption3 && (
      <select className="form-select ms-auto" value={selectedOption4} onChange={handleOption2Change}>
        <option value="">선택하세요</option>
        {selectedOption3 === "option1" && (
          <>
            <option value="option1-1">옵션 1-1</option>
            <option value="option1-2">옵션 1-2</option>
          </>
        )}
        {selectedOption3 === "option2" && (
          <>
            <option value="option2-1">옵션 2-1</option>
            <option value="option2-2">옵션 2-2</option>
          </>
        )}
      </select>
    )}
  </div>
  </Col>
        <Col>
        <div>
    <select className="form-select ms-auto" value={selectedOption5} onChange={handleOption1Change}>
      <option value="">선택하세요</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
    </select>
    
    {selectedOption5 && (
      <select className="form-select ms-auto" value={selectedOption6} onChange={handleOption2Change}>
        <option value="">선택하세요</option>
        {selectedOption5 === "option1" && (
          <>
            <option value="option1-1">옵션 1-1</option>
            <option value="option1-2">옵션 1-2</option>
          </>
        )}
        {selectedOption5 === "option2" && (
          <>
            <option value="option2-1">옵션 2-1</option>
            <option value="option2-2">옵션 2-2</option>
          </>
        )}
      </select>
    )}
  </div>
  </Col>

        <Col>
        <div>
    <select className="form-select ms-auto" value={selectedOption7} onChange={handleOption1Change}>
      <option value="">선택하세요</option>
      <option value="option1">옵션 1</option>
      <option value="option2">옵션 2</option>
    </select>
    
    {selectedOption7 && (
      <select className="form-select ms-auto" value={selectedOption8} onChange={handleOption2Change}>
        <option value="">선택하세요</option>
        {selectedOption7 === "option1" && (
          <>
            <option value="option1-1">옵션 1-1</option>
            <option value="option1-2">옵션 1-2</option>
          </>
        )}
        {selectedOption7 === "option2" && (
          <>
            <option value="option2-1">옵션 2-1</option>
            <option value="option2-2">옵션 2-2</option>
          </>
        )}
      </select>
    )}
  </div>
  </Col>
  
  <Col className="d-flex justify-content-end">
  <div>
    <button>필터</button>
    <button>지도</button>
  </div>
  </Col>
  </Row>

  <div>
    <Row md={3}>
        <Col>
        <div>
          <Button variant="outline-secondary">바로결제</Button>
          <Button variant="outline-secondary">쿠폰 할인</Button>
        </div>
        </Col>
        
        <Col className="d-flex justify-content-end">
        <div>
          <button>전체</button> 
          <button>시간단위</button>
          <button>패키지단위</button>
          <button>월단위</button>
        </div>
        </Col>

        <Col className="d-flex justify-content-end">
        <div>
          <select>
            <option>베스트 공간 순</option>
            <option>가격 낮은 순</option>
            <option>가격 높은 순</option>
            <option>이용후기 많은 순</option>
          </select>
        </div>
        </Col>

    </Row>
  </div>


  <div>
        <div className="container">
          <div className="row">
            {
              (hotelList.length !== 0) ? hotelList.map((item, idx) => (
                <div className='col-lg-4' key={idx}>
                <Col>
                  <Card>
                      <Card.Body>
                          <div id="carouselExample" className="carousel slide">
                              <div className="carousel-inner">
                                  <div className="carousel-item active">
                                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLnJ320k-frEUlbocmV31DntmD5RmkF-UURA&usqp=CAU" className="d-block w-100" style={{height: '250px', objectFit:'cover'}} alt="..." />
                                  </div>
                                  <div className="carousel-item">
                                      <img src="https://mn.kbs.co.kr/data/news/2017/03/10/3442678_Fc6.png" className="d-block w-100" style={{height: '250px', objectFit:'cover'}} alt="..." />
                                  </div>
                                  <div className="carousel-item">
                                      <img src="https://webimage.10x10.co.kr/image/basic600/274/B002748587.jpg" className="d-block w-100" style={{height: '250px', objectFit:'cover'}} alt="..." />
                                  </div>
                              </div>
                              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                  <span className="visually-hidden">Previous</span>
                              </button>
                              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                  <span className="visually-hidden">Next</span>
                              </button>
                          </div>
                          <Card.Title>{item.name}</Card.Title>
                          <div className='mb-0 pb-0 text-truncate' style={{fontSize: '0.8rem'}}>
                              {item.addr} | {item.keyword}
                          </div>
                          <div className='d-flex justify-content-between' style={{fontSize: '0.8rem'}}>
                              <p>
                                  <span style={{color: 'purple', fontWeight: 'bold', fontSize: '1rem'}}>16,000</span>원/시간
                              </p>
                              <p>
                                  <span>최대 3인</span>
                                  <span>평가 15개</span>
                                  <span>좋아요 3개</span>
                              </p>
                          </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              )):
              <div className="mt-5">
                <h1>해당 카테고리에 숙소가 아직 없습니다.</h1>
                <h5>추가될 숙소를 기대해주세요</h5>
              </div>
            }
          </div>
        </div>
      </div>
        </div>
      </div>
  );
};

export default List;
