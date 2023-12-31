import React, { useEffect, useRef, useState } from 'react';
import '../../css/AccountUpdate.css';
import naverBtn from '../../image/naverBtn.png';
import kakaoBtn from '../../image/kakaoBtn.png';
import unKnown from '../../image/unKnown.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from './Nav.js'
import Footer from './Footer.js';


const AccountUpdate = ({ userInfo }) => {
  const navigate = useNavigate();
  const naverRef = useRef()
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
  
  //회원탈퇴를 위한 모달에서의 상태 입력
  const [deleteName, setDeleteName] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  const [naverUserInfo, setNaverUserInfo] = useState({
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
    isnaver: true,
  });

    useEffect((naverUserInfo)=>{
      setNaverUserInfo({
        ...userDTO,
        isnaver: true,
      })

    },[]);

  const naverUserInfoRef = useRef(naverUserInfo);
  useEffect(()=>{
    naverUserInfoRef.current = naverUserInfo
  },[naverUserInfo]);


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

  useEffect((naverUserInfo) => {
    const storedUser = window.sessionStorage.getItem('user');
    if (storedUser) {
      const storedUserInfo = JSON.parse(storedUser);
      setUserDTO((naverUserInfo) => ({
        ...naverUserInfo,
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

  //카카오 소셜로그인 REST API KEY
  const REST_API_KEY = '9ee2bf7ff3fd8c0f4da4c49d740dc522';
  const REDIRECT_URI = 'http://localhost:3000/updateKakao';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  //소셜로그인 스위치 상태
  const [naverConnected, setNaverConnected] = useState(false);
  const [kakaoConnected, setKakaoConnected] = useState(false);

  //SNS 스위치 상태
  useEffect(() => {
    if (userDTO.iskakao === true) setKakaoConnected(true);
  }, [userDTO]);
  useEffect(() => {
    if (userDTO.isnaver === true) setNaverConnected(true);
  }, [userDTO]);


  //카카오연동 비활성상태->활성화시 비연동계정일 경우 카카오로그인 실행
  useEffect(() => {
    if (!userDTO.iskakao && kakaoConnected) {
      window.location.href = link;
    }
  }, [userDTO.iskakao, kakaoConnected]);

  // //네이버 연동 여부에 따라 naverConnected 갱신
  // useEffect(() => {
  //   setNaverConnected(userDTO.isnaver);
  // }, [userDTO.isnaver]);
  
  // 네이버연동 비활성상태->활성화시 비연동계정일 경우 네이버로그인 실행
  useEffect(() => {
    if (!userDTO.isnaver && naverConnected) {
      // window.location.href = naverLoginUrl;
    }
  }, [userDTO.isnaver, naverConnected]);
  
 
  console.log(naverUserInfo)
  console.log('네이버 유저인포')
  console.log(userDTO)
  console.log('유저DTO')
  

  //닉네임 변경
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
    
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);


  //연락처 변경 모달상태
  const [newTel, setNewTel] = useState('');
  const [showTelModal, setShowTelModal] = useState(false);
  const [telValidationMsg, setTelValidationMsg] = useState('');

  const openTelModal = () => setShowTelModal(true);
  const closeTelModal = () => setShowTelModal(false); 
  //  연락처 변경
    const handleTelUpdate = () => {
      axios
        .post('/user/updateTel', { email: userDTO.email, newTel })
        .then((res) => {
          alert('회원님의 연락처가 수정되었습니다.');
          const updatedUser = { ...userDTO, tel: newTel };
          setUserDTO(updatedUser);
          window.sessionStorage.setItem('user', JSON.stringify(updatedUser));
          closeTelModal ();
        })
        .catch((error) => console.log(error));
    };   

  
  //비밀번호 변경 모달상태
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordValidationMsg, setPasswordValidationMsg] = useState('');

  const openPasswordModal = () => setShowPasswordModal(true);
  const closePasswordModal = () => setShowPasswordModal(false);
  //  비밀번호 변경
    const handlePasswordUpdate = () => {
      axios
        .post('/user/updatePassword', { email: userDTO.email, newPassword })
        .then((res) => {
          alert('회원님의 비밀번호가 수정되었습니다.');
          const updatedUser = { ...userDTO, password: newPassword };
          setUserDTO(updatedUser);
          window.sessionStorage.setItem('user', JSON.stringify(updatedUser));
          closePasswordModal();
        })
        .catch((error) => console.log(error));
    };
  
    useEffect(() => {
      const storedUser = window.sessionStorage.getItem('user');
      if (storedUser) {
        setUserDTO(JSON.parse(storedUser));
      }
    }, [showPasswordModal]);

    useEffect(() => {
      const storedUser = window.sessionStorage.getItem('user');
      if (storedUser) {
        setUserDTO(JSON.parse(storedUser));
      }
    }, [showModal]);


    const [showKakaoModal, setShowKakaoModal] = useState(false);
    const [showNaverModal, setShowNaverModal] = useState(false);


    useEffect(() => {
      if (showKakaoModal) {
        // 서버에 업데이트 요청 등을 추가할 수 있습니다.
      }
    }, [showKakaoModal]);

    useEffect(()=>{
      if(showNaverModal){
        
      }
    },[showNaverModal]);

    // 카카오모달이 닫힐 때 실행되는 함수
    const closeKakaoModal = () => {
      setShowKakaoModal(false);
    };
    // 네이버모달이 닫힐 때 실행되는 함수
    const closeNaverModal = () => {
      setShowNaverModal(false);
    };

    //카카오 연동 함수
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
          // alert('카카오 소셜로그인 연동이 완료된 계정입니다.');
        })
        .catch((error) => console.log(error));
    };

    //네이버 연동 함수
    const handleNaverConfirmation = () => {
      const storedUser = window.sessionStorage.getItem('user');
      if (storedUser) {
        const storedUserInfo = JSON.parse(storedUser);
        setUserDTO((prevUserDTO) => ({
          ...prevUserDTO,
          ...storedUserInfo,
            isnaver:true,
        }));
      }
      axios
        .post('/user/updateIsNaver', null, { params: { email: userDTO.email , isnaver: userDTO.isnaver } }) 
        .then((res) => {
          setShowNaverModal(false);
          setNaverConnected(true);
          // alert('네이버 소셜로그인 연동이 완료된 계정입니다.');
        })
        .catch((error) => console.log(error));
        
    };

    useEffect(() => {
      const storedUser = window.sessionStorage.getItem('user');
      if (storedUser) {
        setUserDTO(JSON.parse(storedUser));
      }
    }, [showModal]);


    useEffect(() => {
      if (userDTO.iskakao === true && !kakaoConnected) {
        setShowKakaoModal(true);
      }
    }, [userDTO.iskakao, kakaoConnected]);

    useEffect(() => {
      if (userDTO.isnaver === true && !naverConnected) {
        setShowNaverModal(true);
      }
    }, [userDTO.isnaver, naverConnected]);


    
  // 네이버 소셜연동 시작
  const { naver } = window;

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: '6ttVxktIhMD96aZLn_iu',
      callbackUrl: 'http://localhost:3000/update',
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        const usernickname = naverLogin.user.getNickName();

        // 이메일 정보를 가져와서 naverUserInfo에 설정
        setNaverUserInfo({
          email: userid || '',
          name: username || '',
          nickname: usernickname || '',
        });

        // 사용자 정보를 업데이트하고 localStorage에 저장
        setUserDTO((prevUserDTO) => ({
          ...prevUserDTO,
          email: userid || '',
          name: username || '',
          nickname: usernickname || '',
          isnaver: true,
        }));

        window.localStorage.setItem('userInfo', JSON.stringify(naverUserInfoRef.current));
        window.localStorage.removeItem('com.naver.nid.oauth.state_token');
        window.localStorage.removeItem('com.naver.nid.access_token');
        navigate('/update');
      } else {
        // 로그인 상태가 아니라면 처리
        // alert('네이버계정의 정보가 존재하지 않습니다.\n네이버계정으로 회원가입 진행바랍니다.');
      }
    });
  };

// ...
 
  

    let access_token;
    let regresh_token;
    let domain = 'naver';

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const handleNaverLogin = () => {
    naverRef.current.children[0].click()
  };  //네이버 소셜 연동 끝

 
  //회원탈퇴 모달 상태
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [deleteValidationMsg, setDeleteValidationMsg] = useState('');

  const openDeleteUser = () => setShowDeleteUserModal(true);
  const closeDeleteUser = () => setShowDeleteUserModal(false);

  // 회원탈퇴
  const handleDeleteUser = () => {
    const data ={
      name: deleteName,
      password: deletePassword,
    };

    if(userDTO.name === deleteName && userDTO.password === deletePassword ){
    axios
      // .post('/user/deleteUser', null, { params: userDTO })
      .post('/user/deleteUser', data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((res) => {
        window.sessionStorage.removeItem('user');
        alert('회원탈퇴가 완료되었습니다. 그동안 스페이스샵을 이용해주셔서 감사합니다.');
        closeModal();
        navigate('/');
      })
      .catch((error) => console.log(error));
    
    }else{
      alert('회원정보가 일치하지 않습니다. 다시 입력하세요!');  
      setDeleteName('');
      setDeletePassword('');
    }
  };//handleDeleteUser

  //프로필 이미지 업로드
  // const UserProfile = () => {
    const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || null);
    const fileInputRef = useRef();
  
    const handleImageChange = () => {
      fileInputRef.current.click();
    };
  
    const handleFileSelect = (e) => {
      const file = e.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          const base64Image = reader.result;
          localStorage.setItem('profileImage', base64Image);
          setProfileImage(base64Image);
        };
      }
    };
  // }


  //번호 형식 출력
  const telType = (phoneNumber) => {
    // 전화번호에서 숫자가 아닌 문자를 모두 제거합니다.
    const 정제된번호 = phoneNumber.replace(/\D/g, '');
    if (정제된번호.length === 10) {
      return 정제된번호.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (정제된번호.length === 11) {
      return 정제된번호.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
      return phoneNumber;
    }
  };
    
    return (
        <div>
          <Nav/>
            <div className='headerPtag' ><br /><p className='profileInfo'>프로필 관리 / 회원정보 수정</p></div>
            <Container fluid="md" className='mb-5'>
              <Row>
                  <Col>
                    <div className='profilebox2'>
                        <div className='box2-1'>
                          <div class="profileCard" style={{ width: '100%' }}>
                            <ul class="favorInfoDiv">
                              <p className='favorFont'> 나의 정보
                              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                {/* <button className='updatebtn green mini'>설정하기</button> */}
                              </p>
                            </ul>
                          </div>{/*profileCard*/}
                        </div>{/*box2-1*/}
                
                        <div className='box2-3'>
                          <div class="profileCard" style={{ width: '100%' }}>
                            <ul class="list-group list-group-flush">
                              <br/>
                              <p className='profileTitle'>&emsp;닉네임&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                                &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                                {userDTO.nickname && <span>{userDTO.nickname} </span>}
                                &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
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
                          </div>{/*profileCard*/}
                        </div>{/*box2-3*/}
        
                        <div class="profileCard" style={{width: '100%'}}>
                          <ul class="list-group list-group-flush">
                            <br/>
                            <p className='profileTitle'>&emsp;이메일 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
                            <pre className='profileTitle'>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                              {userDTO.email && <span>{userDTO.email}</span>}{/* 이메일 출력자리 */}
                              {/* <button className='updatebtn green mini'>인증하기</button> */}
                              </pre>
                            <br/>    
                          </ul>
                        </div>{/*profileCard*/}
        
                      <div class="profileCard" style={{width: '100%'}}>
                        <ul class="list-group list-group-flush">
                          <br/>    
                          <p className='profileTitle'>
                          &emsp;연락처
                            &emsp;&emsp;&emsp;&emsp;&emsp;  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  
                            {userDTO.tel ? <span>{telType(userDTO.tel)} </span> : <span>(휴대폰정보)</span>}
                            &emsp;&emsp;&nbsp;&nbsp;
                            <button className='updatebtn green mini' onClick={ openTelModal }>변경하기</button>
                            {/* 연락처 수정 모달*/}
                            <Modal show={showTelModal} onHide={closeTelModal}>
                                <Modal.Header closeButton>
                                <Modal.Title>연락처 수정</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <label htmlFor="newTel">&nbsp;새 연락처:&nbsp;</label>
                                <input type="text" id="newTel" value={newTel} onChange={(e) => setNewTel(e.target.value)} placeholder='- 를 제외하고 입력해 주세요!' size='50'/>
                                <div className="telValidationMsg">{telValidationMsg}</div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="updatebtn green mini" 
                                    onClick={handleTelUpdate}
                                    >
                                    연락처 변경
                                    </button>
                                    <button className="updatebtn red mini" onClick={closeTelModal}>
                                    닫기
                                    </button>
                                </Modal.Footer>
                              </Modal>
                              {/* 연락처 수정 모달 끝*/}
                          </p>
                          <br/>
                        </ul>
                      </div>{/*profileCard*/}
        
                      <div class="profileCard" style={{ width: '100%' }}>
                        <ul class="list-group list-group-flush">
                          <br />
                          <p className='profileTitle'>&emsp;SNS연동</p>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            &emsp;&emsp;
                            <img src={naverBtn} alt='네이버로고' style={{ width: '50px', height: '50px' }} />
                            &nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            네이버연동&emsp;&emsp;
                            {/* 네이버 모달 */}
                              <Modal show={showNaverModal} onHide={closeNaverModal}>
                              <Modal.Header closeButton>
                                <Modal.Title>네이버 연동 확인</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                네이버와의 연동이 확인되었습니다. 계속해서 진행하시겠습니까?
                              </Modal.Body>
                              <Modal.Footer>
                                <button className="updatebtn green mini" onClick= {handleNaverConfirmation }>
                                  확인
                                </button>
                                <button className="updatebtn red mini" onClick={closeNaverModal}>
                                  취소
                                </button>
                              </Modal.Footer>
                            </Modal>  
                          <label class="switch" >
                            <p id="naverIdLogin" ref={naverRef} style={{display : "none"}}>
                              네이버 로그인
                            </p>
                                <input type="checkbox" checked={naverConnected} 
                                onChange={(e) => { setNaverConnected(e.target.checked);}} />
                                <span onClick={()=>handleNaverLogin()} class="slider round"></span>
                            </label>
                          </div>
                          <br/>

                          <div style={{ display: 'flex', alignItems: 'center' }}>
                          &emsp;&emsp;
                            <img src={kakaoBtn} alt='카카오로고' style={{ width: '50px', height: '50px' }} />
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            &nbsp;카카오연동&emsp;&emsp;

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
                          &emsp;카카오와 네이버와 SNS연동만 가능하며, <br />&emsp;연동된 소셜계정은 해제가 불가합니다. 
                          <br />
                          <br/>
                        </ul>
                      </div>{/*profileCard*/} 
        
                      <div class="profileCard" style={{width: '100%'}}>
                        <ul class="list-group list-group-flush">
                          <br/>
                          <p className='profileTitle'>{/*비밀번호 변경자리 */}&emsp;
                            비밀번호&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&emsp;  
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;   
                            <button className='updatebtn green mini' onClick={openPasswordModal}>변경하기</button>
                            {/* 비밀번호 수정 모달*/}
                            <Modal show={showPasswordModal} onHide={closePasswordModal}>
                                <Modal.Header closeButton>
                                <Modal.Title>비밀번호 수정</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <label>
                                  이메일 인증이 완료되었습니다.<br/>
                                  변경할 비밀번호를 입력하여주세요.
                                </label>
                                <br/>
                                <br/>
                                <label htmlFor="newPassword">새 비밀번호:&nbsp;</label>
                                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                                <div className="passwordValidationMsg">{ passwordValidationMsg }</div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="updatebtn green mini" 
                                    onClick={handlePasswordUpdate }
                                    >
                                    비밀번호 변경
                                    </button>
                                    <button className="updatebtn red mini" onClick={closePasswordModal }>
                                    닫기
                                    </button>
                                </Modal.Footer>
                              </Modal>
                            <br />
                          </p>
                          <br/>
                        </ul>
                      </div>{/*profileCard*/}
        
                      <div class="profileCard" style={{width: '100%'}}>
                        <ul class="list-group list-group-flush">
                          <br/>
                          <p className='profileTitle'>{/*마케팅 수신동의 토글자리 */}&emsp;
                            주소 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            {userDTO.addr && <span>{userDTO.addr}</span>}
                            <br />                            
                          </p>
                        </ul>
                      </div>{/*profileCard*/}
        
                      <div className='box2-4'>
                        <div class="profileCard" style={{width: '100%'}}>{/*회원탈퇴 버튼 */}
                          <br />&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                          <br/>
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;      
                          <button className='updatebtn red mini' onClick={openDeleteUser} >서비스 탈퇴하기
                          </button>{/* 회원탈퇴 모달*/}
                          <Modal show={showDeleteUserModal} onHide={closeDeleteUser } >
                                <Modal.Header closeButton>
                                <Modal.Title>서비스 탈퇴</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <label>
                                  회원정보를 입력하여주세요. 입력 후 탈퇴하기 버튼을 누르면 탈퇴가 진행됩니다.
                                </label>
                                <label htmlFor="name">이 름&nbsp;&nbsp;&nbsp;&emsp;&emsp;
                                <input type="text" id="name" value={deleteName} onChange={(e) => setDeleteName(e.target.value)} />
                                </label>
                                <label htmlFor="name">비밀번호&nbsp;&emsp;
                                <input type="password" id="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} />
                                </label>
                                <div className="deleteValidationMsg">{passwordValidationMsg}</div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="updatebtn green mini" onClick={handleDeleteUser}>
                                    탈퇴하기
                                    </button>
                                    <button className="updatebtn red mini" onClick={closeDeleteUser }>
                                    취소
                                    </button>
                                </Modal.Footer>
                              </Modal>
                          <br />
                          <br />
                        </div>{/*profileCard*/}
                      </div>{/*box2-4*/}
                    </div>                  
                  </Col>
              </Row>
            </Container>
            <Footer/>
            
        </div>
    );
    
};

export default AccountUpdate;