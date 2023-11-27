import React, { useRef, useState, useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';
import axios from 'axios';

const ChatList = ({ seqEmail }) => {
  const [opponent, setOpponent] = useState();
  const [sessionUserDTO, setSessionUserDTO] = useState(JSON.parse(sessionStorage.getItem('user')));

  const [chatList, setChatList] = useState([]);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [chat, setChat] = useState();

  useEffect(() => {
    axios
      .get(`/chat/getChatList?email=${JSON.parse(sessionStorage.getItem('user')).email}`)
      .then(res => {
        setChatList(res.data.chatList);
        setChatRoomList(res.data.roomList);
      })
      .catch(err => console.log(err));
  }, []);

  const onsubmit = () => {};

  return (
    <div className="container-sm mt-5">
      <div className="row pt-3">
        <div className="col-4 col-lg-2 col-md-3">
          <p className="fw-bold text-center bg-dark bg-opacity-10 rounded py-2">LIST</p>
          <ul className="list-group p-3 pb-0" style={{ height: '85vh' }}>
            {chatRoomList &&
              chatRoomList.map((item, index) => (
                <li
                  className="list-group-item list-group-item-action border-0 rounded-0 border-bottom border-top mb-1 text-center p-0 py-2"
                  onClick={() => setOpponent()}
                  key={index}
                  style={{ fontSize: '0.8rem' }}>
                  {item.users.split(', ').filter(item => item !== sessionUserDTO.email)[0]}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-8 col-lg-10 col-md-9 thirdBackColor rounded p-0">
          <div className="h-100 rounded position-relative">
            <div className="position-absolute top-0 start-50 translate-middle-x p-2 border-1 w-100">
              <p className="fw-bold fs-4">홍길동님</p>
            </div>
            <div className="h-100" style={{ paddingTop: 70, paddingBottom: 70 }}>
              {/* 채팅 리스트 */}
              <div className="text-start d-flex">
                <div className="mx-2 mt-2" style={{ width: '30rem', maxWidth: '30rem' }}>
                  <p className="m-0 p-0">
                    <span className="fs-5">홍길동</span>님 / <span className="text-secondary">0000.00.00</span>
                  </p>
                  <p className="bg-white rounded bg-opacity-75 p-1">오늘 밥 머드셨나요?</p>
                </div>
              </div>
              <div className="text-end d-flex justify-content-end">
                <div className="mx-2 mt-2" style={{ width: '30rem', maxWidth: '30rem' }}>
                  <p className="m-0 p-0">
                    <span className="fs-5">나</span> / <span className="text-secondary">0000.00.00</span>
                  </p>
                  <p className="bg-white rounded bg-opacity-75 p-1">
                    <pre className="mb-0">부대찌개요 개맛있었는데 아시나요?</pre>
                  </p>
                </div>
              </div>
            </div>
            <div className="position-absolute bottom-0 start-50 translate-middle-x py-2 rounded-bottom-1 w-100 bg-white p-2">
              <div className="input-group my-2">
                <input type="text" className="form-control border-3" />
                <button className="btn btn-secondary" type="button" id="button-addon2" onClick={() => onsubmit()}>
                  입력
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
