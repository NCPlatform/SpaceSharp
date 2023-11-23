import React, { useEffect, useState } from 'react';
import '../../css/AccountUpdate.css';
import naverBtn from '../../image/naverBtn.png';
import kakaoBtn from '../../image/kakaoBtn.png';
import unKnown from '../../image/unKnown.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const AccountUpdate = () => {
  const navigate = useNavigate();

  const [userDTO, setUserDTO] = useState({
    email: '',
    name: '',
    nickname: '',
    password: '',
    addr: '',
    tel: '',
    businessRegistrationNumber: 0,
    companyName: '',
    usergrade: 1,
    payment: '',
    iskakao: '',
    isnaver: '',
  });

  useEffect(() => { //세션스토리지 읽기
    const storedUser = window.sessionStorage.getItem('user');

    if (storedUser) {
      setUserDTO(JSON.parse(storedUser));
    }
  }, []);

  //소셜로그인 상태변수 및 토글설정
  const [naverConnected, setNaverConnected] = useState(false);
  const [kakaoConnected, setKakaoConnected] = useState(false);

  useEffect(() => {
    if (userDTO.iskakao === true) setKakaoConnected(true);
    else {
      setKakaoConnected(false);
    }
  }, [userDTO]);

  const [newNickname, setNewNickname] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [nicknameValidationMsg, setNicknameValidationMsg] = useState('');

  const handleNicknameBlur = () => {
    // 새 닉네임이 입력되었을 때 중복 검사 수행
    axios
      .post('/user/checkNickname', { email: userDTO.email, newNickname })
      .then((res) => {
        setNicknameValidationMsg(res.data);
      })
      .catch((error) => console.log(error));
  };
  
  const handleNicknameUpdate = () => {
    axios   //닉네임 수정 
      .post('/user/checkNickname', { email: userDTO.email, newNickname })
      .then((res) => {
        alert(res.data);
        if (res.data === '사용 가능한 닉네임입니다.') {
        //   alert('사용 가능한 닉네임입니다.'); onBlur로 처리
          axios
            .post('/user/updateNickname', { email: userDTO.email, newNickname })
            .then((res) => {
              alert('회원님의 닉네임이 수정되었습니다.');
              setUserDTO((prevUser) => ({ ...prevUser, nickname: newNickname }));
              closeModal();
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };
  
  

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div class="container text-center">
        <div className='headerPtag'><br /><p className='profileInfo'>프로필 관리 / 회원정보 수정</p></div>
        <div class="row">
          <div class="col col-md-8">
            <div className='profilebox1'>
              <img src={unKnown} alt='카카오로고' style={{ width: '130px', height: '60' }} />
              <br />
              <br />
              <p>&emsp;&nbsp;{userDTO.nickname && <span>({userDTO.nickname} 님)</span>}</p>
              <br />&emsp;&nbsp;&nbsp;
              <button className='updatebtn green mini'>프로필 사진 변경</button>
            </div>
          </div>

          <div class="col col-md-4">
            <div className='profilebox2'>
              <div className='box2-1'>
                <div class="profileCard" style={{ width: '100%' }}>
                  <ul class="favorInfoDiv">
                    <p className='favorFont'>내 관심정보
                      <button className='updatebtn green mini'>설정하기</button>
                    </p>
                  </ul>
                </div>
              </div>

              <div className='box2-2'>
                <div class="profileCard" style={{ width: '100%' }}>
                  <ul class="list-group list-group-flush">
                    <p className='profileTitle'>
                      (내 관심정보 표시) <br />
                      아직 설정된 정보가 없어요!<br />
                      관심있는 지역 및 프로필 /관심사를 설정해보세여.
                    </p>
                  </ul>
                  <br />
                </div>
              </div>

              <div className='box2-3'>
                <div class="profileCard" style={{ width: '100%' }}>
                  <ul class="list-group list-group-flush">
                    <p className='profileTitle'>닉네임 &emsp;
                      {userDTO.nickname && <span>({userDTO.nickname} 님)</span>}
                      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                      <button className='updatebtn green mini' onClick={openModal}>변경하기</button>
                      <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>닉네임 수정</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <label htmlFor="newNickname">새 닉네임:&nbsp;</label>
                        <input
                            type="text"
                            id="newNickname"
                            value={newNickname}
                            onChange={(e) => setNewNickname(e.target.value)}
                             onBlur={handleNicknameBlur} 
                        />
                        <div className="nicknameValidationMsg">{nicknameValidationMsg}</div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="updatebtn green mini" onClick={handleNicknameUpdate}>
                            저장
                            </button>
                            <button className="updatebtn red mini" onClick={closeModal}>
                            닫기
                            </button>
                        </Modal.Footer>
                        </Modal>
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