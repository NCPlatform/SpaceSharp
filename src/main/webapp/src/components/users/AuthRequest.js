import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

const AuthRequest = () => {
    const [session, setSession] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies(['authSign'])
    const token = useParams()

    useEffect(()=>{
        setSession(JSON.parse(window.sessionStorage.getItem('user')))
        axios.post('http://localhost:8080/user/emailAuth',null,{
            params: {
                token: token.token
            }
        }).then(res => res.data === 'Y' ? signOK() : signDenied()).catch(e=>console.log(e))

        console.log(token.token)


    },[])

    const signOK = () => {
        alert('인증에 성공하였습니다. 인증 이메일을 요청하신 페이지로 돌아가 비밀번호를 변경해 주세요.')
        console.log(session) // 세션 확인
        const cookieEXP = new Date(Date.now() + 15 * 1000); // 15초
        setCookie('authSign', '1' , { expires: cookieEXP, path: '/'});
        window.location.href = '/'
        
    }

    const signDenied = () => {
        alert('인증에 실패하였습니다. 다시 시도해 주세요.')
        window.location.href = '/'
    }
    return (
        <div>
            
        </div>
    );
};

export default AuthRequest;