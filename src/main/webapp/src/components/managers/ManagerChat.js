import React, { useCallback, useEffect, useState } from "react";
import ManagerHeader from "./ManagerHeader";
import Stomp from "stompjs";

import ChatList from "../chat/ChatList.js";

const ManagerChat = () => {
  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [stompClient, setStompClient] = useState();

  const initializeWebSocket = useCallback(() => {
    const socket = new WebSocket("ws://192.168.0.3:8080/ws");

    const client = Stomp.over(socket, { debug: true }); // 디버그 모드 비활성화
    client.debug = function () {};

    client.connect({}, (frame) => {
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

  return (
    <>
      <ManagerHeader />
      <ChatList stompClient={stompClient} />
    </>
  );
};

export default ManagerChat;
