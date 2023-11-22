import React, { useEffect, useState } from 'react';
import '../../css/AccountUpdate.css';
import naverBtn from '../../image/naverBtn.png';
import kakaoBtn from '../../image/kakaoBtn.png';
import unKnown from '../../image/unKnown.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//회원정보 수정 페이지
const AccountUpdate = () => {

const navigate = useNavigate();

const [userDTO, setUserDTO] = useState({  //userDTO
    email: '',
    name: '',
    nickname: '',
    password: '',
    addr: '',
    tel: '',
    businessRegistrationNumber: 0,
    companyName: '',
    usergrade: 1,     //회원 기본 등급
    payment: '',
    iskakao: '',
    isnaver: '', 
  });
 // 컴포넌트가 마운트될 때 세션 스토리지에서 사용자 정보를 가져오는 효과
 useEffect(() => {
   // 세션 스토리지에서 사용자 정보 가져오기
   const storedUser = window.sessionStorage.getItem('user');

   if (storedUser) {
     // JSON 문자열을 파싱하여 사용자 정보 설정
     setUserDTO(JSON.parse(storedUser));
   }

 }, []);
   console.log(userDTO);
   console.log(userDTO.iskakao);


 //소셜로그인 스위치 체크박스//세션에 소셜로그인된 계정이면 체크됨
    const [naverConnected, setNaverConnected] = useState(false); 
    const [kakaoConnected, setKakaoConnected] = useState(false);

    useEffect(()=>{
        if(userDTO.iskakao === true)
            setKakaoConnected(true);
        else{
            setKakaoConnected(false);
        }

    },[userDTO]);

//회원정보 수정
    //닉네임 수정
    const updateNickname = (e) => {

        alert('닉네임을 수정합니다.');
        console.log('눌림');
        console.log(userDTO);
    
        axios.post('/user/accountUpdate', null, { params: { nickname: userDTO.nickname } })
          .then(res => {
            alert('회원님의 닉네임이 수정되었습니다.');
            console.log(res.data)
          })
          .catch(error => console.log(error));
          navigate('/update');
    
        };
    


    return (
        <>
            <div class="container text-center">

                <div className='headerPtag'><br/><p className='profileInfo'>프로필 관리 / 회원정보 수정</p></div>
        

                <div class="row">


                    <div class="col col-md-8">
                            <div className='profilebox1'>
                                <br /><br />&emsp;&emsp;
                                {/*  프로필 사진 출력자리  */}
                                    <img src={ unKnown } alt='카카오로고' style={{width:'130px', height:'60'}} />
                                    <br/>
                                    <br/>
                                    <p>&emsp;&nbsp;                                    
                                    {userDTO.nickname && <span>({userDTO.nickname} 님)</span>}{/*사용자닉네임 출력란*/}
                                    </p>
                                    <br />&emsp;&nbsp;&nbsp;
                                <button className='updatebtn green mini'>프로필 사진 변경</button>                   
                            </div>
                        </div>

                    <div class="col col-md-4">
                            <div className='profilebox2'>
                                <div className='box2-1'>
                                    <div class="profileCard" style={{width: '100%'}}>
                                        <ul class="favorInfoDiv">
                                            {/* 내 관심정보 출력자리 */}
                                            <p className='favorFont'>내 관심정보 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                            <button className='updatebtn green mini'>설정하기</button>
                                            </p>
                                        </ul>
                                    </div>
                                </div>

                            <div className='box2-2'>
                                <div class="profileCard" style={{width: '100%'}}>
                                    <ul class="list-group list-group-flush">
                                        <p className='profileTitle'>{/*내 관심정보 표시자리 */}
                                        <br />
                                        (내 관심정보 표시) <br />
                                        아직 설정된 정보가 없어요!<br/>
                                        관심있는 지역 및 프로필 /관심사를 설정해보세여. 
                                        </p>
                                    </ul>
                                    <br/>
                                </div>
                            </div>

                            <div className='box2-3'>
                                <div class="profileCard" style={{width: '100%'}}>
                                    <ul class="list-group list-group-flush">
                                    <br/>  
                                        <p className='profileTitle'>닉네임 &emsp;
                                        {userDTO.nickname && <span>({userDTO.nickname} 님)</span>} {/* 닉네임 출력자리 */}
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                                        <button className='updatebtn green mini' onClick={ updateNickname }>변경하기</button>
                                        </p>                           
                                    <br/>    
                                    </ul>
                                </div>
                            </div>

                            <div class="profileCard" style={{width: '100%'}}>
                                <ul class="list-group list-group-flush">
                                <br/>
                                    <p className='profileTitle'>
                                    이메일&emsp;
                                    {userDTO.email && <span>({userDTO.email})</span>}{/* 이메일 출력자리 */}
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                                        <button className='updatebtn green mini'>인증하기</button>
                                    </p>
                                    <br/>    
                                </ul>
                            </div>

                            <div class="profileCard" style={{width: '100%'}}>
                                <ul class="list-group list-group-flush">
                                <br/>    
                                    <p className='profileTitle'>
                                    연락처    
                                    {userDTO.tel ? <span>({userDTO.tel} 님)</span> : <span>(휴대폰정보-x휴대폰정보없음)</span>} {/* 휴대폰정보 출력자리 */}
                                    &emsp;&emsp;&nbsp;
                                    <button className='updatebtn green mini'>인증하기</button>
                                    </p>
                                <br/>
                                </ul>
                            </div>

                            <div class="profileCard" style={{width: '100%'}}>
                                <ul class="list-group list-group-flush">
                                <br/>    
                                    <p className='profileTitle'>
                                    SNS연동
                                    </p> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                    <img src={ naverBtn } alt='네이버로고' style={{width:'18px', height:'18px'}} />
                                        &nbsp;네이버연동&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                        <label class="switch">
                                        <input type="checkbox" checked={ naverConnected } />
                                            <span class="slider round"></span>
                                        </label>
                                        <br />&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;    
                                    <img src={ kakaoBtn } alt='카카오로고' style={{width:'20px', height:'20'}} />
                                        &nbsp;카카오연동&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;    
                                        <label class="switch" >
                                            <input type="checkbox" checked={kakaoConnected}/>
                                            <span class="slider round"></span>
                                        </label>  
                                    <br />
                                    <br />1개의 SNS연동만 가능하며, <br />연동된 소셜계정은 해제가 불가합니다.
                                    <br />
                                    <br/>
                                </ul>
                            </div> 

                            <div class="profileCard" style={{width: '100%'}}>
                                <ul class="list-group list-group-flush">
                                <br/>
                                    <p className='profileTitle'>{/*비밀번호 변경자리 */}
                                    비빌번호&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  
                                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                                            <button className='updatebtn green mini'>변경하기</button>
                                        <br />
                                    </p>
                                <br/>
                                </ul>
                            </div>

                            <div class="profileCard" style={{width: '100%'}}>
                                <ul class="list-group list-group-flush">
                                <br/>
                                    <p className='profileTitle'>{/*마케팅 수신동의 토글자리 */}
                                        마케팅 수신동의 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                        이메일&emsp;&emsp;&emsp;&nbsp;
                                        <label class="switch">
                                            <input type="checkbox"/>
                                            <span class="slider round"></span>
                                        </label>
                                        <br />&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                        SMS &emsp;&emsp;&emsp;&nbsp;&nbsp;
                                        <label class="switch">
                                            <input type="checkbox"/>
                                            <span class="slider round"></span>
                                        </label>
                                        <br /> 
                                    </p>
                                </ul>
                            </div>

                            <div className='box2-4'>
                                <div class="profileCard" style={{width: '100%'}}>{/*회원탈퇴 버튼 */}
                                    <br />&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                        <button className='updatebtn red mini'>서비스 탈퇴하기</button>
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
            </div>

            
        </>
    );
};

export default AccountUpdate;