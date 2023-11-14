import axios from "axios";
import React from "react";
import KakaoLogin from "react-kakao-login";

const Login = () => {

  const Rest_api_key='037f534097da993a9af7449a8f6cadfd' //REST API KEY
  const redirect_uri = 'http://localhost:3000/oauth/callback/kakao' //Redirect URI
  const KakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  
  const handleKaKaoLogin = () => {
    window.location.href=KakaoUrl;
  }

  return (
    <div className="container">
      <button className="btn btn-warning" onClick={handleKaKaoLogin}>카카오 로그인</button>
    </div>
  );
};

export default Login;
