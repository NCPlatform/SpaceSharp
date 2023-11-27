import React, { useState } from 'react';

export const ChatList = ({ room }) => {
  //   const navigate = useNavigate();
  //   const socket = io.connect(process.env.REACT_APP_SOCKET_URL);
  //   let [client, changeClient] = useState(null);
  const [opponent, setOpponent] = useState();

  const [sessionUserDTO, setSessionUserDTO] = useState(JSON.parse(sessionStorage.getItem('user')));

  //   const connect = () => {
  //     // 소켓 연결
  //     try {
  //       const clientdata = new StompJs.Client({
  //         brokerURL: 'ws://localhost:8080/chat',
  //         connectHeaders: {
  //           login: '',
  //           passcode: 'password',
  //         },
  //         debug: function (str) {
  //           console.log(str);
  //         },
  //         reconnectDelay: 5000, // 자동 재 연결
  //         heartbeatIncoming: 4000,
  //         heartbeatOutgoing: 4000,
  //       });
  //       // 구독
  //       clientdata.onConnect = function () {
  //         clientdata.subscribe('/chat/channels/' + { room }, callback);
  //       };
  //       clientdata.activate(); // 클라이언트 활성화
  //       changeClient(clientdata); // 클라이언트 갱신
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   const disConnect = () => {
  //     // 연결 끊기
  //     if (client === null) {
  //       return;
  //     }
  //     client.deactivate();
  //   };
  return (
    <div className="container-sm mt-5">
      <div className="row pt-3">
        <div className="col-4 col-lg-2 col-md-3">
          <p className="fw-bold text-center bg-dark bg-opacity-10 rounded py-2">LIST</p>
          <ul className="list-group p-3 pb-0" style={{ height: '85vh' }}>
            <li
              className="list-group-item list-group-item-action border-0 rounded-0 border-bottom border-top mb-1 text-center"
              onClick={() => setOpponent()}>
              Item 1
            </li>
            <li
              className="list-group-item list-group-item-action border-0 rounded-0 border-bottom border-top mb-1 text-center"
              onClick={() => setOpponent()}>
              Item 1
            </li>
          </ul>
        </div>
        <div className="col-8 col-lg-10 col-md-9 thirdBackColor rounded py-2">
          <div className="bg-white h-100 rounded bg-opacity-75 position-relative">
            <div className="h-100" style={{ paddingBottom: 70 }}></div>
            <div className="position-absolute bottom-0 start-50 translate-middle-x py-2 border-1 w-100 thirdBackColor">
              <div className="input-group my-2">
                <input type="text" className="form-control" />
                <button class="btn btn-secondary" type="button" id="button-addon2">
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
