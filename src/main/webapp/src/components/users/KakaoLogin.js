import React from 'react';
//카카오 소셜로그인을 시작할(버튼이 위치할) 페이지
const KakaoLogin = () => {
    const REST_API_KEY = '9ee2bf7ff3fd8c0f4da4c49d740dc522';//developers.kakao.com 에서 발급받은 restAPI_Key
    const REDIRECT_URI = 'http://localhost:3000/KakaoRedirect';//developers.kakao.com 에서 설정해놓은 REDIRECT_URI
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    const loginHandler = () => {
      window.location.href = link;
    };
  
    return (
      //카카오 소셜로그인 버튼 위치
      <button type='button' onClick={loginHandler}>
        로그인 하기
      </button>
    );
};

export default KakaoLogin;
