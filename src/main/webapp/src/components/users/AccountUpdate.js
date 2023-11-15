import React from 'react';
import '../../css/AccountUpdate.css';
import naverBtn from '../../image/naverBtn.png';
import kakaoBtn from '../../image/kakaoBtn.png';
import unKnown from '../../image/unKnown.png';


//회원정보 수정 페이지
const AccountUpdate = () => {
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
                                    {/*사용자 닉네임 출력자리*/}
                                    (사용자닉네임 출력란)
                                    </p>
                                    <br />&emsp;&nbsp;&nbsp;
                                <button className='btn green mini'>프로필 사진 변경</button>                   
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
                                            <button className='btn green mini'>설정하기</button>
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
                                        <p className='profileTitle'>닉네임 &emsp;(nickname자리)  {/* 닉네임 출력자리 */}
                                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                                        <button className='btn green mini'>변경하기</button>
                                        </p>                           
                                    <br/>    
                                    </ul>
                                </div>
                            </div>

                            <div class="profileCard" style={{width: '100%'}}>
                                <ul class="list-group list-group-flush">
                                <br/>
                                    <p className='profileTitle'>
                                    이메일&emsp;(이메일자리){/* 이메일 출력자리 */}
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                                        <button className='btn green mini'>인증하기</button>
                                    </p>
                                    <br/>    
                                </ul>
                            </div>

                            <div class="profileCard" style={{width: '100%'}}>
                                <ul class="list-group list-group-flush">
                                <br/>    
                                    <p className='profileTitle'>{/* 휴대폰정보 출력자리 */}
                                    연락처&emsp;(휴대폰정보-x휴대폰정보없음)
                                    &emsp;&nbsp;
                                    <button className='btn green mini'>인증하기</button>
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
                                            <input type="checkbox"/>
                                            <span class="slider round"></span>
                                        </label>
                                        <br />&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;    
                                    <img src={ kakaoBtn } alt='카카오로고' style={{width:'20px', height:'20'}} />
                                        &nbsp;카카오연동&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;    
                                        <label class="switch">
                                            <input type="checkbox"/>
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
                                            <button className='btn green mini'>변경하기</button>
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
                                        <button className='btn red mini'>서비스 탈퇴하기</button>
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