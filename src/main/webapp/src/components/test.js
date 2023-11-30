import React from 'react';

const test = () => {

    // // 네이버 로그인 클라이언트 ID
  const clientId = 'ojl3HmuVcwz9uJHJPQr0';
  // 네이버 로그인 콜백 URL
  const redirectUri = 'http://localhost:3000/test'; 
  // 네이버 로그인 페이지 URL
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=STATE_STRING`;

  useEffect(() => {

      window.location.href = naverLoginUrl;
  },[]);


    return (
        <div>
            
        </div>
    );
};

export default test;