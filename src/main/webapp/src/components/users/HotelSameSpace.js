import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelItemCard from './HotelItemCard';
import { Col, Container, Row } from 'react-bootstrap';

const HotelSameSpace = ({ hotelCategory, hotel }) => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    axios
      .post('/user/getHotelList', null, {
        params: { seqHotelCategory: hotelCategory },
      })
      .then(res => {
        
        setSpaces(
          res.data.filter(space => space.seqHotel !== Number(hotel)).slice(0, 6) //6개 까지만 출력
        );
      })
      .catch(error => console.log(error));
  }, []);

  const handleCardClick = seqHotel => {
    window.location.href = `/detail/${seqHotel}`;
  };

  return (
    <div>
      <strong style={{ color: 'black' }}>비슷한 공간</strong>
      <br />
      <hr style={{ width: '20px', border: '4px solid #ff7402' }} />
      {spaces.length === 0 && <strong style={{ color: 'black' }}>비슷한 공간이 없습니다.</strong>}

      <Container>
        <Row>
          {spaces.map((space, index) => (
            <Col key={index} xs={12} md={4} className="mb-3">
              <div onClick={() => handleCardClick(space.seqHotel)} style={{ cursor: 'pointer' }}>
                <HotelItemCard item={space} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HotelSameSpace;
