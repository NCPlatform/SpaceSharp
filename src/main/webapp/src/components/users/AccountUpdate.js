import React, { useEffect, useState } from 'react';
import '../../css/AccountUpdate.css';
import naverBtn from '../../image/naverBtn.png';
import kakaoBtn from '../../image/kakaoBtn.png';
import unKnown from '../../image/unKnown.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const AccountUpdate = ({ userInfo }) => {
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
    iskakao: false,
    isnaver: false,
  }); 



  
  // 세션 스토리지에서 사용자 정보를 불러오고 userDTO에 추가
  useEffect((userDTO) => {
    const storedUser = window.sessionStorage.getItem('user');
    if (storedUser) {
      const storedUserInfo = JSON.parse(storedUser);
      setUserDTO((prevUserDTO) => ({
        ...prevUserDTO,
        ...storedUserInfo,
      }));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      setUserDTO((prevUserDTO) => ({
        ...prevUserDTO,
        iskakao: true,
      }));     
    }
    }, [userInfo]);
  
  
    //   window.sessionStorage.setItem('user', JSON.stringify(userDTO));
    //   setShowKakaoModal(true);


  // useEffect(() => {
  
  //   if(userInfo){
  //   window.sessionStorage.setItem('user', JSON.stringify(userDTO));
  //   setShowKakaoModal(true);
  //   }
  
  // }, []);
  

  console.log('마이페이지1');
  console.log(userDTO);
  console.log('마이페이지2');


  const [naverConnected, setNaverConnected] = useState(false);
  const [kakaoConnected, setKakaoConnected] = useState(false);

  const REST_API_KEY = '9ee2bf7ff3fd8c0f4da4c49d740dc522';
  const REDIRECT_URI = 'http://localhost:3000/updateKakao';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };


  useEffect(() => {
    if (userDTO.iskakao === true) setKakaoConnected(true);
  }, [userDTO]);

  useEffect(() => {
    if (!userDTO.iskakao && kakaoConnected) {
      window.location.href = link;
    }
  }, [userDTO.iskakao, kakaoConnected]);

  const [newNickname, setNewNickname] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nicknameValidationMsg, setNicknameValidationMsg] = useState('');

  const handleNicknameUpdate = () => {
    axios
      .post('/user/updateNickname', { email: userDTO.email, newNickname })
      .then((res) => {
        alert('회원님의 닉네임이 수정되었습니다.');
        const updatedUser = { ...userDTO, nickname: newNickname };
        setUserDTO(updatedUser);
        window.sessionStorage.setItem('user', JSON.stringify(updatedUser));
        closeModal();
      })
      .catch((error) => console.log(error));
  };

  console.log('마이페이지 세션 저장전 3')

  useEffect(() => {
    const storedUser = window.sessionStorage.getItem('user');
    if (storedUser) {
      setUserDTO(JSON.parse(storedUser));
    }
  }, [showModal]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [showKakaoModal, setShowKakaoModal] = useState(false);

  // useEffect(() => {
  //   if (userDTO.iskakao === true) {
  //     setShowKakaoModal(true);
  //   }
  // }, [userDTO.iskakao]);

  useEffect(() => {
    if (showKakaoModal) {
      // 서버에 업데이트 요청 등을 추가할 수 있습니다.
    }
  }, [showKakaoModal]);

  // 모달이 닫힐 때 실행되는 함수
  const closeKakaoModal = () => {
    setShowKakaoModal(false);
  };

  const handleKakaoConfirmation = () => {
    const storedUser = window.sessionStorage.getItem('user');
    if (storedUser) {
      const storedUserInfo = JSON.parse(storedUser);
      setUserDTO((prevUserDTO) => ({
        ...prevUserDTO,
        ...storedUserInfo,
      }));
    }
    axios
      .post('/user/updateIsKakao', null, { params: { email: userDTO.email , iskakao: userDTO.iskakao } }) 
      .then((res) => {
        setShowKakaoModal(false);
        setKakaoConnected(true);
        alert('카카오 소셜로그인 연동이 완료되었습니다.');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (userDTO.iskakao === true && !kakaoConnected) {
      setShowKakaoModal(true);
    }
  }, [userDTO.iskakao, kakaoConnected]);

  console.log(userDTO);

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
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
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
                            <input type="text" id="newNickname" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} />
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
                      <p>
                        이메일&emsp;
                        {userDTO.email && <span>({userDTO.email})</span>}{/* 이메일 출력자리 */}
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                        {/* <button className='updatebtn green mini'>인증하기</button> */}
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
                        <button className='updatebtn green mini'>변경하기</button>
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
                      <div>
                        
                      {/* 카카오 모달 */}
                      <Modal show={showKakaoModal} onHide={closeKakaoModal}>
                          <Modal.Header closeButton>
                            <Modal.Title>카카오 연동 확인</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            카카오와의 연동이 확인되었습니다. 계속해서 진행하시겠습니까?
                          </Modal.Body>
                          <Modal.Footer>
                            <button className="updatebtn green mini" onClick={handleKakaoConfirmation}>
                              확인
                            </button>
                            <button className="updatebtn red mini" onClick={closeKakaoModal}>
                              취소
                            </button>
                          </Modal.Footer>
                        </Modal>
                            <label class="switch" >
                                <input type="checkbox" checked={kakaoConnected} 
                                onChange={(e) => { setKakaoConnected(e.target.checked);}} />
                                <span class="slider round"></span>
                        </label>
                      </div>  
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