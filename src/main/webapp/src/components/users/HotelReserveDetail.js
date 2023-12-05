import React, { useRef, useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { forwardRef } from 'react';
import ReactToPrint from 'react-to-print';
import Receipt from './NavComponents/Receipt';

const HotelReserveDetail = () => {
  const { seqReservation } = useParams();
  const [content, setContent] = useState('');
  const ref = useRef();

  return (
    <div style={{ minHeight: '100vh' }}>
      <Nav />
      <div className="container" style={{ minHeight: '63.8vh' }}>
        <div className="d-flex justify-content-end">
          <ReactToPrint
            trigger={() => <button className="btn btn-outline-dark">영수증 출력</button>}
            content={() => ref.current}
          />
        </div>
        <div>
          <Receipt ref={ref} content={content} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelReserveDetail;
