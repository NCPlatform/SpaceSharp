import React, { useEffect, useState } from "react";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
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
  const { navigate } = useNavigate()

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
            })
            window.sessionStorage.setItem("user", JSON.stringify(res.data));
            setSessionUserDTO(res.data);
            navigate("/");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const navigate = useNavigate();

  const [sessionUserDTO, setSessionUserDTO] = useState(
    window.sessionStorage.getItem("user")
  );
  const { naver } = window;

  const [userInfo, setUserInfo] = useState(
    {
    'email' : '',
    'name' : '',
    'nickname' : '',
    'password': '',
    'addr': '',
    'tel': '',
    'businessRegistrationNumber': 0,//
    'companyName': '',//
    'usergrade': 1,
    'payment':''
  }
  )


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


    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        // 아래처럼 선택하여 추출이 가능하고,
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        const usernickname = naverLogin.user.getNickName();

        setUserInfo({
          email: userid,
          name: username,
          nickname: usernickname
        });
      
        console.log(naverLogin.user)

        console.log(userid)
        console.log(username)
        console.log(usernickname)

        try {
          const checkUserResponse = await axios.get(`/user/${userid}`);
          
          if (checkUserResponse.data.exists) {
            const response = await axios.post('/user/login', {
              email: userid,
              name: username,
              nickname: usernickname
              // ... 기타 필요한 정보 추가
            });
        
            if (response.data) {
              window.sessionStorage.setItem('user', JSON.stringify(response.data));
              navigate('/'); // 로그인 완료 페이지로 이동
            } else {
              alert('로그인에 실패했습니다.');
            }
          } else {
            localStorage.setItem('userInfo', JSON.stringify({
              email: userid,
              name: username,
              nickname: usernickname
              // ... 기타 필요한 정보 추가
            }));
            navigate('/signin'); // 회원가입 페이지로 이동
          }
        } catch (error) {
          console.error('로그인 요청 에러:', error);
          alert('로그인 요청 중 에러가 발생했습니다.');
        }
      }

    });
  };
    let access_token;
    let regresh_token;
    let domain = 'naver';

   

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
