import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from 'axios'

const List = () => {

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
    <>
      <Nav />
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
    </>
  );
};

export default List;
