import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountSignIn from './AccountSignIn';

function KakaoRedirect() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const KAKAO_CODE = new URLSearchParams(location.search).get('code');

  const [userDTO, setUserDTO] = useState({  //userDTO
    email: '',
    name: '',
    nickname: '',
    password: '',
    addr: '',
    tel: '',
    businessRegistrationNumber: 0,
    companyName: '',
    usergrade: 1,     //회원 기본 등급
    payment: '',
    // passwordChk: '',
    iskakao: false,
    isnaver: false, 
  });

  //로컬스토리지에 토큰 저장
  const getKakaoToken = () => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=authorization_code&client_id=9ee2bf7ff3fd8c0f4da4c49d740dc522&redirect_uri=http://localhost:3000/KakaoRedirect&code=${KAKAO_CODE}`,
    })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
        } else {
          navigate('/');
        }
      });
  };

  //카카오 토큰 발급
  useEffect(() => {
    // KAKAO_CODE가 있는 경우에만 사용자 정보를 요청
    if (KAKAO_CODE) {
      getKakaoToken();
      // 필요한 매개변수가 정의되어 있다고 가정 (RestApiKey, redirectUri)
      const RestApiKey = '9ee2bf7ff3fd8c0f4da4c49d740dc522';
      const redirectUri = 'http://localhost:3000/KakaoRedirect';

      // 먼저, 액세스 토큰을 요청
      axios.post(
        `https://kauth.kakao.com/oauth/token?client_id=${RestApiKey}&redirect_uri=${redirectUri}&code=${KAKAO_CODE}&grant_type=authorization_code`,
        {},
        { headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' } }
      )
        .then((res) => {
          const { access_token } = res.data;
          // 그런 다음 액세스 토큰을 사용하여 사용자 정보를 가져옴
          axios.post(
            'https://kapi.kakao.com/v2/user/me',
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              },
            }
          )
            .then((res) => {
              setUserDTO(res.data); // 상태에 사용자 정보 설정
            })
            .catch((error) => {
              console.error('사용자 정보 가져오기 실패:', error);
            });
        })
        .catch((error) => {
          console.error('액세스 토큰 가져오기 실패:', error);
        });
    }
  }, [KAKAO_CODE]);

  //카카오 소셜로그인을 했을 때, DB에 email이 존재하는 회원이면 메인이동, 아니면 회원가입페이지로 UserInfo 전달
  useEffect(() => {
    if (userInfo && userInfo.email) {
      axios.post('/user/existsByEmail', null, { params: { email: userInfo.email } })
        .then(response => {
          console.log(response.data);
          console.log('중복 이메일 검사중입니다.');
          if (response.data === true) {
            // 이미 존재하는 이메일이라면
            axios.post('/user/existsByIsKakao', null, { params: { email: userInfo.email } })
              .then(response => {
                if (response.data === true) {
                  // 이미 카카오 소셜 로그인 연동된 사용자라면
                  const user = response.data;
                  window.sessionStorage.setItem('user', JSON.stringify(user));
                  navigate('/');
                } else {
                  // 아직 카카오 소셜 로그인 연동이 안 된 사용자라면
                  if (window.confirm("카카오 소셜 로그인 연동하시겠습니까")) {
                    axios.post('/user/updateIsKakao', { email: userInfo.email, iskakao: true })
                      .then((res) => {
                        alert("카카오 소셜 로그인이 연동되었습니다.");
                        const user = response.data;
                        window.sessionStorage.setItem('user', JSON.stringify(user));
                        navigate('/');
                      })
                      .catch((error) => console.log(error));
                  } else {
                    alert("취소합니다.");
                    const user = response.data;
                    window.sessionStorage.setItem('user', JSON.stringify(user));
                    navigate('/');
                  }
                }
              })
              .catch(error => {
                console.error(error);
              });
          } else {
            // 사용 가능한 이메일이라면
            console.log('사용 가능한 이메일 입니다.');
            // SignIn 페이지로 이동하고 userInfo(userDTO) 값을 전달
            navigate('/SignIn', { state: { userInfo } });
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [userInfo]);
  
  


  return (
    <div>

      {userDTO && <AccountSignIn userInfo={userDTO} />}
     
    </div>
  );
}

export default KakaoRedirect;