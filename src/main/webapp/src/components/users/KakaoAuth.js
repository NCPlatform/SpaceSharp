import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoAuth = (props) => {

    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    const grantType = "authorization_code";
    const Rest_api_key='037f534097da993a9af7449a8f6cadfd'
    const redirect_uri = 'http://localhost:3000/oauth/callback/kakao'

    const [userDTO,setUserDTO] = useState({
        email: '',
        addr: '',
        name: '',
        nickname: '',
        password: '',
        tel: '',
        usergrade: 1,
    });

    useEffect( () => {
        axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&code=${code}`,
            {},
            { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
        )
        .then((res) => {
            console.log(res);
            const { access_token } = res.data;
            axios.post(
                `https://kapi.kakao.com/v2/user/me`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    }
                }
            )
            .then((res) => {
                console.log('2번쨰', res);
                setUserDTO({...userDTO, email: res.data.kakao_account.email})
            })
        })
        .catch((Error) => {
            console.log(Error)
        })
    }, [code])

    

    return (
        <>
            <h1>로그인중입니다</h1>
            {userDTO.email}
        </>
    );
};

export default KakaoAuth;