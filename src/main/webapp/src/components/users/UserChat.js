import React, { useState } from 'react';
import ChatList from '../chat/ChatList';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const UserChat = () => {
  const [sessionUserDTO, setSessionUserDTO] = useState(JSON.parse(sessionStorage.getItem('user')));
  const navigate = useNavigate();

  return (
    <div>
      <Nav />
      {sessionUserDTO ? (
        <ChatList backColor={'thirdBackColor'} />
      ) : (
        <div
          className="container bg-secondary bg-opacity-25 rounded text-center position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center"
          style={{ height: '80vh' }}>
          <div className="">
            <div className="border border-2 border-dark m-3 pt-5 p-3 rounded bg-white bg-opacity-10">
              <p className="text-center fs-2 mb-0 text-wrap">
                채팅은 <span className="fw-bold">회원 전용</span> 기능입니다
              </p>
              <p className="text-center fs-5 text-secondary m-0">로그인 후 이용해주세요</p>

              <div className="d-grid gap-2 col-12 mx-auto m-3 p-3 ">
                <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/login')}>
                  로그인
                </button>
                <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/signin')}>
                  회원가입
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserChat;
