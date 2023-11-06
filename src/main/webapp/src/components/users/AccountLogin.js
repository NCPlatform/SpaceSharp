import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Swal from "sweetalert2";

import { Link } from 'react-router-dom';
import FindPassword from './FindPassword';

import '../../css/Login.css';


const Login = () => {

  

  const[userDTO, setUserDTO] = useState(
    {
    "email": '',
    "name": '',
    "password": '',
    "addr": '',
    "tel": '',
    "usergrade": '',
    "payment": ''
    }
  )

  const{ email, password } = userDTO

  const[emailDiv, setEmailDiv] = useState('')
  const[passwordDiv, setPasswordDiv] = useState('')

  const onChange = (e) => {
      setUserDTO({ ...userDTO, [e.target.name] : e.target.value } )
      console.log(e)
  }

  const currentEmail = 'admin'

  const user = [
      {
        "email": 'user',
        "name": '이용자',
        "password": '111',
        "addr": '주소',
        "tel": '010-1111-1111',
        "usergrade": 1,
        "payment": 'credit-card'
      }, {
        "email": 'admin',
        "name": '최고 관리자',
        "password": '123',
        "addr": '주소',
        "tel": '010-2222-2222',
        "usergrade": 10,
        "payment": 'credit-card'
      }, {
        "email": 'manager',
        "name": '사장님',
        "password": '456',
        "addr": '주소',
        "tel": '010-3333-3333',
        "usergrade": 6,
        "payment": 'credit-card'
      }
    ];


  const onLoginSubmit = () => {
    
    var sw = 1

    if(!email) {
      setEmailDiv('이메일 주소를 입력하세요')
      sw = 0
    }
    else if(!password) {
      setEmailDiv('')
      setPasswordDiv('비밀번호를 입력하세요')
    }
    else if(email && password){
      setPasswordDiv('')
      const userExists = user.some(item => item.email === email);
      if (!userExists){
        Swal.fire({
          title: '없는 계정입니다.',
          imageUrl: 'https://item.kakaocdn.net/do/58119590d6204ebd70e97763ca933baf82f3bd8c9735553d03f6f982e10ebe70',
          imageWidth: 300,
          imageHeight: 200,
          imageAlt: '루피',
        })
        sw = 0;
      }else{
        setEmailDiv('');
      }
    } 
    if( sw === 1 ) {
      user.filter((item) => item.email === userDTO.email).map((item) =>{
      item.password === userDTO.password ? 
        Swal.fire({
          title: '성공',
          imageUrl: 'https://item.kakaocdn.net/do/a7884a879ae30614290a1c20325e05e59cbcbe2de7f4969efc79ab353e0c19e8',
          imageWidth: 300,
          imageHeight: 200,
          imageAlt: '루피',
        }) 
        : 
        Swal.fire({
          title: '실패',
          imageUrl: 'https://item.kakaocdn.net/do/a7884a879ae30614290a1c20325e05e5339e41ce89b663315d96faecd7cfd11b',
          imageWidth: 300,
          imageHeight: 200,
          imageAlt: '루피',
        })
      })
    }
  }

  /*
    로그인페이지에서 없는 계정인지 <- filter로 갖고온 값이 없다면 패스워드 비교 안하고 바로 alert("없는 계정입니다") 띄우기
    sweetalert api 사용해서 alert 창 꾸미기
    게시판 작성 페이지에서 입력값 useState로 상태 변수로 지정해서 console 에 띄우기
  */

    return (
    <div className='Login0'>
    <div className='Login1'>
    <div className='Login2'>
        <h1 className='login-h1'> 로그인 화면 </h1>
        <div className="d-grid gap-2 Login3">
      <Button variant="primary" size="lg" style={{ color:'black', fontWeight:'bold', background: '#2db400', border: 'none' }}>
        네이버로 로그인하기
      </Button>
      <Button variant="secondary" size="lg" style={{ color:'black', fontWeight:'bold', background: '#FFEB00', border: 'none' }}>
        카카오로 로그인하기
      </Button>
    </div>
    </div>
    <hr />
    <>
        <h5 className='login-h5'>또는</h5>
        <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
        >
            <Form.Control type="email" name='email' value={ userDTO.email } onChange={ onChange } placeholder="name@example.com" /><div id='emailDiv'>{ emailDiv }</div>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" name='password' value={ userDTO.password } onChange={ onChange } placeholder="Password" /><div id='passwordDiv'>{ passwordDiv }</div>
        </FloatingLabel>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
  <input type='checkbox' />아이디 기억하기
        </div>
  <div>
    <a href=''>비밀번호 찾기</a>
  </div>
</label>

    </>
    <div className="d-grid gap-2">
    <button variant="primary" size="1g" onClick={ onLoginSubmit } style={{ background: '#FFEB00', border: 'none' }}>이메일로 로그인</button>
    </div>
    <h5 className='login-h5'>아직 회원이 아니신가요? <a href='' className='createBtn'> 회원가입 </a></h5>
    </div>
    </div>
    
    );
};

export default Login;