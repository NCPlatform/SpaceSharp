import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountUpdate from './AccountUpdate';

function UpdateKakao() {
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
      body: `grant_type=authorization_code&client_id=9ee2bf7ff3fd8c0f4da4c49d740dc522&redirect_uri=http://localhost:3000/updateKakao&code=${KAKAO_CODE}`,
    })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
        } else {
          navigate('/update');
          alert('카카오 회원정보를 불러올 수 없습니다!');
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
      const redirectUri = 'http://localhost:3000/updateKakao';

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
            setUserDTO((prevUserDTO) => ({
              ...prevUserDTO,
              iskakao: true,
              
            }));
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



  
    // 세션 스토리지에서 사용자 정보를 불러오고 userDTO에 추가
    // useEffect(() => {
    //   const storedUser = window.sessionStorage.getItem('user');
    //   if (storedUser) {
    //     const storedUserInfo = JSON.parse(storedUser);
    //     setUserDTO((prevUserDTO) => ({
    //       ...prevUserDTO,
    //       ...storedUserInfo,
    //     }));
    //   }
    // }, []);


  // useEffect((userInfo)=>{
  //   setUserDTO({
  //     ...userDTO,
  //     iskakao: true,
  //       })
  // },[userInfo]);
  
  // useEffect(() => {
  //   window.sessionStorage.setItem('user', JSON.stringify(userDTO));
  // }, []);


  console.log('카카오리다이렉트1');
  console.log(userDTO);
  console.log('카카오리다이렉트2');


  return (
    <div>

      {userDTO && <AccountUpdate userInfo={ userDTO } />}
     
    </div>
  );
}

export default UpdateKakao;

