import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AuthRequest = () => {

    const token = useParams()

    useEffect(()=>{
        axios.post('http://localhost:8080/user/emailAuth',null,{
            params: {
                token: token.token
            }
        }).then(res => console.log(res)).catch(e=>console.log(e))

        console.log(token.token)



    },[])
    return (
        <div>
            
        </div>
    );
};

export default AuthRequest;