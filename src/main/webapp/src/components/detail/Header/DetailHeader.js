import React, { useEffect, useState } from 'react';
import { Col, Nav, Navbar, Row } from 'react-bootstrap';
import '../../../css/navheader.css';
import ShortURL from './ShortURL';
import Sharekakao from './Sharekakao';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const openUrlInNewTab = () => {
  const url =
    'https://form.office.naver.com/form/responseView.cmd?formkey=MzFmNjE0ZDAtMTU5Ni00Y2E3LWIwN2UtNjcyMDZhMzkyYjUy&sourceId=urlshare';
  window.open(url, '_blank');
};
const headerStyle = {
  margin: '-10px', // '세부공간 선택' 문구와 아이콘 사이의 간격을 조절
};

const DetailHeader = ({ hotel, name, img1, img2, img3, path }) => {
  // shareKakao parameters

  const [sessionUserDTO, setSessionUserDTO] = useState(JSON.parse(sessionStorage.getItem('user')));

  const navigate = useNavigate();

  const onCreateChat = () => {
    if (sessionUserDTO !== null) {
      axios
        .get(`/chat/createRoom?seqHotel=${hotel}&email=${sessionUserDTO.email}`)
        .then(res => {
          console.log(res.data);
          if (res.data === 'same') {
            Swal.fire({ icon: 'warning', title: 'ERROR', text: '본인에게 채팅을 보낼 수 없습니다.' });
          } else if (res.data === 'exist') {
            navigate('/chat');
          } else {
            Swal.fire({ icon: 'success', title: 'SUCCESS', text: '성공적으로 채팅방을 만들었습니다.' }).then(
              navigate('/chat')
            );
          }
        })
        .catch(err => console.log(err));
    } else {
      Swal.fire({ icon: 'error', title: 'ERROR', text: '채팅은 회원 전용 기능입니다.' });
    }
  };

  return (
    <div className="box_form p-3 pt-1 pb-1">
      <div className="collapse" id="collapseExample">
        <div
          className="card card-body"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Sharekakao name={name} img1={img1} img2={img2} img3={img3} url={path} /> &nbsp;&nbsp;&nbsp;
          <ShortURL />
        </div>
      </div>
      <Row className="box_form_header mt-2" style={{ fontWeight: 'bold' }}>
        <Col xs={8} sm={8} md={12} lg={12} xl={8} style={headerStyle}>
          <h4 className="pt-3 text-break">세부공간 선택</h4>
        </Col>
        <Col xs={4} sm={4} md={12} lg={12} xl={4} className="justify-content-end p-0">
          <Navbar className="justify-content-end">
            <Nav
              className="px-1 me-2"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-controls="collapseExample">
              <i className="bi bi-upload" style={{ fontSize: '20px' }} />
            </Nav>
            <Nav className="px-1 me-2">
              <i className="bi bi-suit-heart" style={{ fontSize: '20px' }} />
            </Nav>
            <Nav className="px-1 me-2">
              <i className="bi bi-chat" style={{ fontSize: '20px' }} onClick={() => onCreateChat()} />
            </Nav>
            <Nav className="px-1">
              <i className="bi bi-lightning-fill" style={{ fontSize: '20px' }} onClick={openUrlInNewTab} />
            </Nav>
          </Navbar>
        </Col>
      </Row>
    </div>
  );
};

export default DetailHeader;
