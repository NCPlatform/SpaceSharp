import React, { useRef, useState, useEffect, useCallback } from 'react';

import Stomp from 'stompjs';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../../css/ChatList.css';
import ChatMine from './ChatMine';
import ChatOthers from './ChatOthers';

const ChatList = ({ backColor }) => {
  const [sessionUserDTO, setSessionUserDTO] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [stompClient, setStompClient] = useState();

  const initializeWebSocket = useCallback(() => {
    const socket = new WebSocket('ws://223.130.136.57:8080/ws');

    const client = Stomp.over(socket, { debug: true }); // 디버그 모드 활성화
    client.debug = function () {};

    client.connect({}, frame => {
      setStompClient(client);
    });
  }, [sessionUserDTO, setStompClient]);

  useEffect(() => {
    if (sessionUserDTO) {
      initializeWebSocket();
    }
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [sessionUserDTO]);

  const [opponent, setOpponent] = useState(0);

  const [chatList, setChatList] = useState([]);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [chat, setChat] = useState();

  const chatListRef = useRef(chatList);

  useEffect(() => {
    axios
      .get(`/chat/getChatList?email=${JSON.parse(sessionStorage.getItem('user')).email}`)
      .then(res => {
        setChatList(res.data.chatList);
        setChatRoomList(res.data.roomList);
        setUserList(res.data.userList);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    chatListRef.current = chatList;
  }, [chatList]);

  useEffect(() => {
    if (stompClient) {
      let subscription = stompClient.subscribe('/sub/chat/' + opponent, response => {
        console.log(response);
        setChatList([JSON.parse(response.body), ...chatListRef.current]);
      });
    }
  }, [stompClient, opponent]);

  const onsubmit = () => {
    sending();
    setChat('');
  };

  const onChatRoomNameChange = () => {
    (async () => {
      const { value: getName } = await Swal.fire({
        icon: 'question',
        title: '채팅방 이름 변경.',
        text: '채팅방 이름을 변경합니다.',
        input: 'text',
      });
      if (getName) {
        axios
          .post(`/chat/changeRoomName`, null, { params: { channelId: opponent, name: getName } })
          .then(res => {
            if (res.data === 'error') {
            } else {
              Swal.fire({
                icon: 'success',
                title: '변경에 성공하였습니다.',
              });
              setChatRoomList(
                chatRoomList.map(item => (item.channelId === opponent ? { ...item, name: getName } : item))
              );
            }
          })
          .catch(err => console.log(err));
      }
    })();
  };

  const onChatRoomDelete = () => {
    Swal.fire({
      title: '채팅방 나가기',
      text: '삭제된 채팅방은 복구할 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true,
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .get(`/chat/deleteRoom?channelId=${opponent}&email=${sessionUserDTO.email}`)
          .then(res => {
            if (res.data === 'error') {
            } else {
              Swal.fire({
                icon: 'success',
                title: '성공적으로 삭제했습니다.',
              }).then(result => {
                window.location.reload();
              });
            }
          })
          .catch(err => console.log(err));
      }
    });
  };

  const sending = () => {
    if (chat) {
      stompClient.send(
        '/pub/chat',
        {},
        JSON.stringify({
          channelId: opponent,
          senderemail: sessionUserDTO.email,
          content: chat,
        })
      );
    } else {
      Swal.fire({ position: 'top-end', icon: 'error', text: '아무런 값 없이 채팅은 보내지지 않습니다' });
    }
  };

  return (
    <div className="container-sm">
      <div className="row">
        <div className="col-4 col-lg-2 col-md-3">
          <p className="fw-bold text-center bg-dark bg-opacity-10 rounded py-2 " onClick={() => setOpponent(0)}>
            LIST
          </p>
          <ul className="list-group p-3 pb-0" style={{ height: '85vh' }}>
            {chatRoomList &&
              chatRoomList.map((item, index) => (
                <li
                  className="list-group-item list-group-item-action border-0 rounded-0 border-bottom border-top mb-1 text-center py-2 text-truncate"
                  onClick={() => setOpponent(item.channelId)}
                  key={index}
                  style={{ fontSize: '0.8rem' }}>
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        <div className={`col-8 col-lg-10 col-md-9 ${backColor} rounded p-0`}>
          {opponent !== 0 && (
            <div className="h-100 rounded position-relative">
              <div
                className={`position-absolute top-0 start-50 translate-middle-x border border-1 border-dark w-100 pt-2 ${backColor} rounded d-flex `}>
                <p
                  className="fw-bold fs-4 ms-3 pt-1 text-truncate dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown">
                  {chatRoomList.filter(item => item.channelId === opponent)[0].name}
                </p>
                <ul className="dropdown-menu">
                  <li className="dropdown-item" onClick={() => onChatRoomNameChange()}>
                    방 이름 변경
                  </li>
                  <li className="dropdown-item" onClick={() => onChatRoomDelete()}>
                    방 나가기
                  </li>
                </ul>
              </div>
              <div
                className="chatList"
                style={{
                  paddingTop: 70,
                  paddingBottom: 70,
                  maxHeight: '83vh',
                  overflowY: 'scroll',
                }}>
                {chatList
                  .filter(chat => chat.channelId === opponent)
                  .map((item, index) =>
                    item.senderemail === 'notice' ? (
                      <div>
                        <div className="bg-secondary rounded py-3 mx-3 text-center fs-3">{item.content}</div>
                        <div className="text-center">이후 채팅은 상대가 읽을 수 없습니다.</div>
                      </div>
                    ) : item.senderemail === sessionUserDTO.email ? (
                      <ChatMine
                        name={userList.filter(user => user.email === item.senderemail)[0].name}
                        date={new Date(item.releaseDate).toLocaleDateString('ko-KR')}
                        content={item.content}
                        key={index}
                      />
                    ) : (
                      <ChatOthers
                        name={userList.filter(user => user.email === item.senderemail)[0].name}
                        date={new Date(item.releaseDate).toLocaleDateString('ko-KR')}
                        content={item.content}
                        key={index}
                      />
                    )
                  )}
              </div>
              <div className="position-absolute bottom-0 start-50 translate-middle-x py-2 rounded-bottom-1 w-100 bg-white p-2">
                <div className="input-group my-2">
                  <input
                    type="text"
                    className="form-control border-3"
                    value={chat}
                    onChange={e => setChat(e.target.value)}
                  />
                  <button className="btn btn-secondary" type="button" id="button-addon2" onClick={() => onsubmit()}>
                    입력
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
