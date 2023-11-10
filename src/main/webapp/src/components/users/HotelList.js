import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from 'axios'

const List = () => {

  const {seqHotelCategory} = useParams()
  const [hotelList,setHotelList] = useState();

  useEffect(()=>{
    console.log(seqHotelCategory)
    axios.post('/user/getHotelList',null,{params : {seqHotelCategory}})
    .then(res=>{
      console.log(res.data)
      setHotelList(res.data);
    })
    .catch(error => console.log(error))
  },[])

  return (
    <>
      <Nav />
      {console.log(hotelList)}
      <div>
        <div className="container">
          <div className="row">
            {hotelList.map((item, idx) => (
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
                        <Card.Title>가게이름</Card.Title>
                        <div className='mb-0 pb-0' style={{fontSize: '0.8rem'}}>
                            주소 | #태그 #태그
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
