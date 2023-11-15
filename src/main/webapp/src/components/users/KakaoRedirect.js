import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 카카오 소셜로그인 Redirect 페이지
const KakaoRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split('=')[1];

  // 토큰 저장 //
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

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken();
  }, [location.search, navigate]);

  return (
    <div>
      KakaoLogin 로그인 인가토큰 로컬스토리지 저장 성공! 일단 새로고침하시오
    </div>
  );
};

export default KakaoRedirect;
