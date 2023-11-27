import React, { useRef, useState, useEffect } from "react";

import axios from "axios";

const ChatList = ({ stompClient }) => {
  const [opponent, setOpponent] = useState(0);
  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [chatList, setChatList] = useState([]);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [chat, setChat] = useState();

  const chatListRef = useRef(chatList);

  useEffect(() => {
    axios
      .get(
        `/chat/getChatList?email=${
          JSON.parse(sessionStorage.getItem("user")).email
        }`
      )
      .then((res) => {
        setChatList(res.data.chatList);
        setChatRoomList(res.data.roomList);
        setUserList(res.data.userList);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    chatListRef.current = chatList;
  }, [chatList]);

  useEffect(() => {
    if (stompClient) {
      let subscription = stompClient.subscribe(
        "/sub/chat/" + opponent,
        (response) => {
          console.log(response);
          setChatList([...chatListRef.current, JSON.parse(response.body)]);
        }
      );
    }
  }, [stompClient, opponent]);

  const onsubmit = () => {
    sending();
    setChat("");
  };

  const sending = () => {
    stompClient.send(
      "/pub/chat",
      {},
      JSON.stringify({
        channelId: opponent,
        senderemail: sessionUserDTO.email,
        content: chat,
      })
    );
  };

  return (
    <div className="container-sm mt-5">
      <div className="row pt-3">
        <div className="col-4 col-lg-2 col-md-3">
          <p className="fw-bold text-center bg-dark bg-opacity-10 rounded py-2">
            LIST
          </p>
          <ul className="list-group p-3 pb-0" style={{ height: "85vh" }}>
            {chatRoomList &&
              chatRoomList.map((item, index) => (
                <li
                  className="list-group-item list-group-item-action border-0 rounded-0 border-bottom border-top mb-1 text-center p-0 py-2"
                  onClick={() => setOpponent(item.channelId)}
                  key={index}
                  style={{ fontSize: "0.8rem" }}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-8 col-lg-10 col-md-9 thirdBackColor rounded p-0">
          {opponent !== 0 && (
            <div className="h-100 rounded position-relative">
              <div className="position-absolute top-0 start-50 translate-middle-x p-2 border-1 w-100">
                <p className="fw-bold fs-4">{opponent}번 방</p>
              </div>
              <div
                className="h-100"
                style={{ paddingTop: 70, paddingBottom: 70 }}
              >
                {/* 채팅 리스트 */}
                {chatList.filter((chat) => chat.channelId === opponent) &&
                  chatList.map((item, index) => (
                    <div
                      className={
                        item.senderemail === sessionUserDTO.email
                          ? "text-end d-flex justify-content-end"
                          : "text-start d-flex"
                      }
                      key={index}
                    >
                      <div
                        className="mx-2 mt-2"
                        style={{ width: "30rem", maxWidth: "30rem" }}
                      >
                        <p className="m-0 p-0">
                          <span className="fs-5">
                            {
                              userList.filter(
                                (user) => user.email === item.senderemail
                              )[0].name
                            }
                          </span>
                          님 /{" "}
                          <span className="text-secondary">
                            {new Date(item.releaseDate).toLocaleDateString(
                              "ko-KR"
                            )}
                          </span>
                        </p>
                        <p className="bg-white rounded bg-opacity-75 p-1">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="position-absolute bottom-0 start-50 translate-middle-x py-2 rounded-bottom-1 w-100 bg-white p-2">
                <div className="input-group my-2">
                  <input
                    type="text"
                    className="form-control border-3"
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                  />
                  <button
                    className="btn btn-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={() => onsubmit()}
                  >
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
