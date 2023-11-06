import React, { useState } from 'react';
import '../../css/WriteForm.css';
import '../../css/managersNav.css';
import '../../css/main_nav_tab.css';
import naverBtn from '../../image/naverBtn.png';
import kakaoBtn from '../../image/kakaoBtn.png';
import axios from 'axios';

const dataList = [
  { id: 1, name: 'chk1', text: '연령(만 14세 이상) 확인(필수)', isChk: false },
  { id: 2, name: 'chk2', text: '개인정보 위탁 처리 동의(필수)', isChk: false },
  { id: 3, name: 'chk3', text: '개인정보 수집 및 이용에 대한 동의(필수)', isChk: false },
  { id: 4, name: 'chk4', text: '이벤트 우대 혜택 동의 안내(선택)',  isChk: false },
  { id: 5, name: 'chk5', text: '이벤트 등 프로모션 알림 메일 수신 (선택)',  isChk: false },

]

const SignIn = () => {

  const [data, setData] = useState(dataList)

  const [userDTO, setUserDTO] = useState({
    email: '',
    name: '',
    nickname: '',
    password: '',
    addr: '',
    tel: '',
    businessRegistrationNumber: 0,//
    companyName: '',//
    usergrade: 1,
    payment:''
  });

  const {email, nickname, password, usergrade} = userDTO; //axios에서 userDTO통채로 아닌 구조분해 할당을 통해 넘김



  const [passwordChk, setPasswordChk] = useState()

  const onChange = (e) =>{
    setUserDTO({...userDTO, [e.target.name]: e.target.value })

  }

  const onSubmit = () =>{
    //유효성 검사. 필수 약관 동의가 체크 되어 있는지 검사 => 이메일 중복검사
      console.log('눌림')
      console.log(userDTO)
      axios.post('/user/accountWrite',null,{ params: userDTO })
    .then(res=>{
      alert('회원가입을 축하합니다.');
    })
    .catch(error => console.log(error))

  }

 
  
  const onChk = (e) =>{
      const { name, checked } = e.target //name, checked 2가지 속성 가져옴

      if( name === 'all' ){
          setData(data.map( item => { 
              return {
                  ...item,                    //갖고 있는 값 덮어쓰기(수정);객체니까
                  isChk: checked  
              }
          
          }))


      }else{                                                    //내가원하는 것만 item을 써서 체크
          setData(data.map(item => item.name === name ? {...item, isChk: checked }: item ))
      }
  }


                      //현재 데이터값의 필터를 돌려서 길이가 1보다 작은것 =참이 아닌것 // 0이라는 것은 조건이 활성화=checked
  return (
      <>
      <div id="box">
          <h2 className='h2Title'>회원가입</h2>
              <div className=''>
                  <button className='WriteInputBtn'>
                      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                      <img src={ naverBtn } style={{width:'30px', height:'30px'}} alt="네이버 로그인" onclick="" />
                      네이버 로그인
                  </button><br />
                  <button className='WriteInputBtn'>
                      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                      <img src={ kakaoBtn } style={{width:'30px', height:'30px'}} alt="카카오 로그인" onclick="" />
                      카카오 로그인
                  </button>
              </div>  

              <p>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &emsp;&emsp;              
              또는
              </p>

                  <input type='text'  className='WriteInputBox' value={ userDTO.nickname } name='nickname' id='' onChange={ (e) => onChange(e) } placeholder='닉네임' /><br/>
                  <input type='email' className='WriteInputBox ' value={ userDTO.email } name='email' id='' onChange={ (e)=> onChange(e) }  placeholder='이메일' /><br/>
                  <input type='password' className='WriteInputBox' value={ userDTO.password } name='password' id='' onChange={ (e)=> onChange(e) } placeholder='비밀번호' /><br />
                  <pre>-문자/숫자/특수문자 중 2가지 이상 조합(8~30자)<br />
                      -3개 이상 키보드 상 배열이 연속되거나 동일한 문자/숫자 제외</pre>
                  <input type='password' className='WriteInputBox' name='' id='' placeholder='비밀번호 확인' /><br />
                  
                  {/*약관동의*/ }
                      <p>
                          <input type='checkbox' name='all' onChange={ onChk } 
                                      checked={ data.filter(item => item.isChk !== true).length <1  } />
                                  {/* checked={ data.filter(item => !item.isChk).length <1  } />   */}
                          <label>약관전체동의/해제</label>                    
                      </p>
                      
                      {
                          data.map(item => <p key={ item.id }>        
                                  <input type='checkbox' name={ item.name } checked={ item.isChk } onChange={ onChk }/>
                                  <label>{ item.text }</label>
                                          </p>)
                      }
              
                  <button className='WriteSubmitBtn' onClick={ onSubmit }>회원가입</button>
    

      </div>  
              
      </>
    )
  };


export default SignIn;
