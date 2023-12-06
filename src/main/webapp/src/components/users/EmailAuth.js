import axios from 'axios';
import React, { useEffect } from 'react';

const EmailAuth = ({userEmail, func}) => {

    useEffect(() => {
        console.log('컴포넌트 실행')
        console.log(userEmail.split('@')[0])
        console.log(userEmail.split('@')[1])
        axios.post('http://localhost:8080/user/sendEmail', null, {
            params: {
                emailType: 1,
                emailId: userEmail.split('@')[0],
                emailDomain: userEmail.split('@')[1]

            }
        }).then(res => alert('인증번호 전송이 완료되었습니다.')).catch(e => console.log(e))
       func()
    },[])
    return (
        <div>
            
        </div>
    );
};

export default EmailAuth;