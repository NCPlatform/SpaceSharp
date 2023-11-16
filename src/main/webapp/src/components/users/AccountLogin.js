import React, { useEffect, useState } from "react";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import FindPassword from "./FindPassword";
import axios from "axios";

import styles from "../../css/Login.module.css";

import KakaoLogin from "react-kakao-login";

const Login = () => {
  const [userDTO, setUserDTO] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userDTO;

  const [emailDiv, setEmailDiv] = useState("");
  const [passwordDiv, setPasswordDiv] = useState("");

  const onChange = (e) => {
    setUserDTO({ ...userDTO, [e.target.name]: e.target.value });
  };

  const currentEmail = "admin";

  const onLoginSubmit = () => {
    if (!email) {
      setEmailDiv("이메일 주소를 입력하세요");
    } else if (!password) {
      setEmailDiv("");
      setPasswordDiv("비밀번호를 입력하세요");
    } else if (email && password) {
      setPasswordDiv("");

      axios
        .post("/user/login", null, { params: userDTO })
        .then((res) => {
          if (res.data.length === 0) {
            Swal.fire({
              title: "아이디 또는 비밀번호가 잘못되었습니다.",
              imageUrl:
                "https://item.kakaocdn.net/do/58119590d6204ebd70e97763ca933baf82f3bd8c9735553d03f6f982e10ebe70",
              imageWidth: 300,
              imageHeight: 200,
              imageAlt: "루피",
            });
          } else {
            Swal.fire({
              title: "성공",
              imageUrl:
                "https://item.kakaocdn.net/do/a7884a879ae30614290a1c20325e05e59cbcbe2de7f4969efc79ab353e0c19e8",
              imageWidth: 300,
              imageHeight: 200,
              imageAlt: "루피",
            });
            window.sessionStorage.setItem("user", JSON.stringify(res.data));
            setSessionUserDTO(res.data);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const [sessionUserDTO, setSessionUserDTO] = useState(
    window.sessionStorage.getItem("user")
  );
  const { naver } = window;

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "6ttVxktIhMD96aZLn_iu",
      callbackUrl: "http://localhost:3000/login",
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
      loginButton: { color: "green", type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();

    // 선언된 naverLogin 을 이용하여 유저 (사용자) 정보를 불러오는데
    // 함수 내부에서 naverLogin을 선언하였기에 지역변수처리가 되어
    // userinfo 정보를 추출하는 것은 지역변수와 같은 함수에서 진행주어야한다.

    // 아래와 같이 로그인한 유저 ( 사용자 ) 정보를 직접 접근하여 추출가능하다.
    // 이때, 데이터는 첫 연동시 정보 동의한 데이터만 추출 가능하다.

    // 백엔드 개발자가 정보를 전달해준다면 아래 요기! 라고 작성된 부분까지는
    // 코드 생략이 가능하다.

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        // 아래처럼 선택하여 추출이 가능하고,
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
        // setUserInfo(naverLogin.user)
      }
    });
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const Rest_api_key = "037f534097da993a9af7449a8f6cadfd"; //REST API KEY
  const redirect_uri = "http://localhost:3000/oauth/callback/kakao"; //Redirect URI
  const KakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleKaKaoLogin = () => {
    window.location.href = KakaoUrl;
  };

  const handleNaverLogin = () => {};

  return (
    <div className={styles.Login0}>
      <div className={styles.Login1}>
        <div className={styles.Login2}>
          <h1 className={styles.loginH1}> 로그인 화면 </h1>
          <div className="d-grid gap-2 styles.Login3">
            <Button
              variant="primary"
              size="lg"
              style={{
                color: "black",
                fontWeight: "bold",
                background: "#2db400",
                border: "none",
              }}
              id="naverIdLogin"
            >
              네이버로 로그인하기
            </Button>
            <Button
              variant="secondary"
              size="lg"
              style={{
                color: "black",
                fontWeight: "bold",
                background: "#FFEB00",
                border: "none",
              }}
            >
              카카오로 로그인하기
            </Button>
          </div>
        </div>
        <hr />
        <>
          <h5 className={styles.loginH5}>또는</h5>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              value={userDTO.email}
              onChange={onChange}
              placeholder="name@example.com"
            />
            <div id="emailDiv">{emailDiv}</div>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              name="password"
              value={userDTO.password}
              onChange={onChange}
              placeholder="Password"
            />
            <div id="passwordDiv">{passwordDiv}</div>
          </FloatingLabel>

          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" />
              아이디 기억하기
            </div>
            <div>
              <a href="">비밀번호 찾기</a>
            </div>
          </label>
        </>
        <div className="d-grid gap-2">
          <button
            variant="primary"
            size="1g"
            onClick={onLoginSubmit}
            style={{ background: "#FFEB00", border: "none" }}
          >
            이메일로 로그인
          </button>
        </div>
        <h5 className={styles.loginH5}>
          아직 회원이 아니신가요?{" "}
          <Link to="/signin" className="createBtn">
            회원가입{" "}
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
