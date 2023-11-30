import React, { useState, useEffect, useRef } from 'react';
import '../../css/AccountSignIn.css';
import naverBtn from '../../image/naverBtn.png';
import kakaoBtn from '../../image/kakaoBtn.png';
import axios from 'axios';
import PopupPostCode from './PopupPostCode';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from '../../css/Login.module.css';

const dataList = [  //약관데이터리스트
  { id: 1, name: 'chk1', text: '연령(만 14세 이상) 확인(필수)', isChk: false, isnecessary: true },
  { id: 2, name: 'chk2', text: '개인정보 위탁 처리 동의(필수)', isChk: false, isnecessary: true },
  { id: 3, name: 'chk3', text: '개인정보 수집 및 이용에 대한 동의(필수)', isChk: false, isnecessary: true },
  { id: 4, name: 'chk4', text: '이벤트 우대 혜택 동의 안내(선택)', isChk: false, isnecessary: false },
  { id: 5, name: 'chk5', text: '이벤트 등 프로모션 알림 메일 수신 (선택)', isChk: false, isnecessary: false },
];


const SignIn = ({ userInfo }) => {
  const [data, setData] = useState(dataList); //약관

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
    usergrade: 1,
    payment: '',
    iskakao: false,
    isnaver: false,
  });

  
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
    iskakao: true,
    isnaver: false,
  });
  const naverUserInfoRef = useRef(naverUserInfo);
  useEffect(()=>{
    naverUserInfoRef.current = naverUserInfo
  },[naverUserInfo]);


  const [readCheck, setReadCheck] = useState(''); //유효성검사 div영역

  //AccountLogin 과 합한 코드 자리

  const [isKakao, setIsKakao] = useState(false);

  //네이버아이디로그인 코드 시작

  const { naver } = window;

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: '6ttVxktIhMD96aZLn_iu',
      callbackUrl: 'http://localhost:3000/SignIn',
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
      loginButton: { color: 'green', type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
    
    naverLogin.getLoginStatus(async function (status) {
      if (status) {                                 //네이버정보가 존재할때
        // 아래처럼 선택하여 추출이 가능하고,
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        const usernickname = naverLogin.user.getNickName();

        console.log('여기까지 넘어옴1');
        console.log(userid);

        try {
          const checkUserResponse = await axios.get(`/user/userid?email=${userid}`);
          // userid 라는 이름으로 email 정보 가져오는 요청
          if (checkUserResponse.data) {
            // 가져온 데이터를 기준으로 if 절
            const existingUser = checkUserResponse.data;
            window.localStorage.setItem('user', JSON.stringify(existingUser));
            // 가져온 데이터의 이름을 existingUser 라고 지칭함
            const iskakao = existingUser.iskakao; // 기존 사용자가 카카오로 가입한 경우 플래그
            const isnaver = existingUser.isnaver; // 기존 사용자가 네이버로 가입한 경우 플래그
            if(isnaver) { // 네이버연동이 되어있는 아이디 라면
              try{
                // 이미 연동된 데이터기 때문에 isnaver를 true로 한번 더 바꿀 필요가 없음
                window.sessionStorage.setItem("user", JSON.stringify(existingUser));
                window.localStorage.removeItem('user')
                window.localStorage.removeItem('com.naver.nid.oauth.state_token')
                window.localStorage.removeItem('com.naver.nid.access_token')
                navigate("/");
                }
                catch (error) { // try 의 catch
                  console.error('에러 발생:', error);
                  // 에러 처리 로직 추가
                }
            } else { // 네이버연동이 되어있는 아이디가 아니라면
              const isKakaoLinked = existingUser.iskakao; // 기존 사용자가 카카오로 연동된 여부
              setIsKakao(isKakaoLinked); // 카카오 아이디 연동 여부를 상태에 설정
              if (iskakao) { // 카카오 연동이 되어있는 아이디 라면
                Swal.fire({
                  title: '네이버 아이디와 카카오 아이디 통합',
                  text: '네이버 아이디와 카카오 아이디를 통합하시겠습니까?',
                  showCancelButton: true,
                  confirmButtonText: '예',
                  cancelButtonText: '아니오',
                  icon: 'question'


                }).then(async (result) => {
                    if (result.isConfirmed) { // 통합을 한다면
                      try {
                        // post로 백엔드에 요청 (isnaver 값을 true로 바꾸는 것)
                        axios
                          .get(`/user/updateNaverStatus?userEmail=${userid}`)
                          .then((res) => {
                          window.sessionStorage.setItem('user', JSON.stringify(existingUser));
                            Swal.fire({
                                      title: "로그인 성공",
                                      imageUrl:
                                        "https://item.kakaocdn.net/do/a7884a879ae30614290a1c20325e05e59cbcbe2de7f4969efc79ab353e0c19e8",
                                      imageWidth: 300,
                                      imageHeight: 200,
                                      imageAlt: "루피",
                                     });
                                     window.localStorage.removeItem('user')
                                     window.localStorage.removeItem('com.naver.nid.oauth.state_token')
                                     window.localStorage.removeItem('com.naver.nid.access_token')
                                      navigate("/");
                                    })
                          .catch((error) => {
                                  //axios 의 catch
                                  console.log(error);
                                });
                      } catch (error) {
                        // try에 대한 catch
                        console.error("로그인 요청 에러:", error);
                        alert("로그인 요청 중 에러가 발생했습니다.");
                      }
                    } else { // 통합을 하지 않는다고 하면 로그인에 실패했습니다. 라는 알람과 함께 로그인 페이지로 이동
                      Swal.fire({
                        title: "로그인에 실패하였습니다.",
                        imageUrl:
                          "https://item.kakaocdn.net/do/58119590d6204ebd70e97763ca933baf82f3bd8c9735553d03f6f982e10ebe70",
                        imageWidth: 300,
                        imageHeight: 200,
                        imageAlt: "루피",
                      });
                      window.localStorage.removeItem('user')
                      window.localStorage.removeItem('com.naver.nid.oauth.state_token')
                      window.localStorage.removeItem('com.naver.nid.access_token')
                      navigate('/login')
                      }
                        });
                        } else { // 네이버와 카카오 모두 연동이 되어있는 아이디가 아니라면 네이버에서 email, name, nickname 정보를 받아와서 로컬 스토리지에 저장
                          try{ // post로 백엔드에 요청 (isnaver 값을 true로 바꾸는 것)
                            axios .get(`/user/updateNaverStatus?userEmail=${userid}`)
                                  .then(res => {
                                    window.sessionStorage.setItem('user', JSON.stringify(existingUser));
                                    Swal.fire({
                                      title: '로그인 완료.',
                                      imageUrl: 'https://item.kakaocdn.net/do/d640911d600b52c55d356740537ae9569f5287469802eca457586a25a096fd31',
                                      imageWidth: 300,
                                      imageHeight: 200,
                                      imageAlt: '구데타마'
                                    })
                                    window.localStorage.removeItem('user')
                                    window.localStorage.removeItem('com.naver.nid.oauth.state_token')
                                    window.localStorage.removeItem('com.naver.nid.access_token')
                                    navigate('/')
                                  })
                                  .catch(error => { // axios 에 대한 catch
                                    console.log(error);
                                  })
                          } catch (error) { // try에 대한 catch
                            console.error('로그인 요청 에러:', error);
                            alert('로그인 요청 중 에러가 발생했습니다.');
                          }
                        }
          }}else  {
            //가져온 데이터가 없다면
            if (naverUserInfo) {
              // userInfo가 존재하면(소셜 로그인이 발생했으면) 실행
              // const userEmail = naverUserInfoRef.current.email;
              // const userName = naverUserInfoRef.current.name;
              // const userNickname = naverUserInfoRef.current.nickname;
              
              const userid = naverLogin.user.getEmail();
              const username = naverLogin.user.getName();
              const usernickname = naverLogin.user.getNickName();
              
              // 네이버 소셜 로그인 정보를 userDTO 형식으로 변환
              setNaverUserInfo({
                  email: userid || '',
                  name: username || '',
                  nickname: usernickname || '',
                  // 필요한 다른 속성들도 추가
                });
                
          
                // userDTO에도 isnaver 값을 true로 설정
                setUserDTO((naverUserInfo) => ({
                  ...naverUserInfo,
                  email: userid || '',
                  name: username || '',
                  nickname: usernickname || '',
                  isnaver: true, // isnaver 값을 true로 설정
                  
                }));  
                alert('네이버계정의 정보가 존재하지 않습니다.\n네이버계정으로 회원가입 진행바랍니다.');    
              }         
              console.log('네이버유저인포를 userDTO에 세팅');     
              console.log(naverUserInfo);
              console.log(userDTO);
              
              window.localStorage.setItem('userInfo', JSON.stringify(naverUserInfoRef.current));
              window.localStorage.removeItem('com.naver.nid.oauth.state_token')
              window.localStorage.removeItem('com.naver.nid.access_token')
              navigate('/signin');
              
          }
        }
        catch (error) {  // userid 라는 이름으로 email 정보 가져오는 요청 했던 try 문에 대한 catch
          console.error('에러 발생:', error);
          // 에러 처리 로직 추가
        }
    }
  });
};

    let access_token;
    let regresh_token;
    let domain = 'naver';
  useEffect(() => {
    initializeNaverLogin();
  }, []);

  // 네이버 아이디 로그인 코드 마감


  //카카오 REST API
  const REST_API_KEY = '9ee2bf7ff3fd8c0f4da4c49d740dc522';//developers.kakao.com 에서 발급받은 restAPI_Key
  const REDIRECT_URI = 'http://localhost:3000/KakaoRedirect';//developers.kakao.com 에서 설정해놓은 REDIRECT_URI
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


  //카카오 로그인(페이지이동;버튼)
  const loginHandler = () => {
    window.location.href = link;
  };

  //소셜로그인(네이버 소셜로그인) 유저정보의 속성 값들 불러오기
  useEffect(() => {
    if (userInfo) {
      // userInfo가 존재하면(소셜 로그인이 발생했으면) 실행
      const userEmail = naverUserInfoRef.current.email;
      const userName =  naverUserInfoRef.current.name;
      const userNickname = naverUserInfoRef.current.nickname;

      // 네이버 소셜 로그인 정보를 userDTO 형식으로 변환
      setNaverUserInfo({
        email: userEmail || '',
        name: userName || '',
        nickname: userNickname || '',
        isnaver: true,
        // 필요한 다른 속성들도 추가
      });
    console.log(naverUserInfo);
    }
  }, [naverUserInfo]);

  useEffect(() =>{
    if(userInfo){
      const userEmail = naverUserInfoRef.current.email;
      const userName =  naverUserInfoRef.current.name;
      const userNickname = naverUserInfoRef.current.nickname;

      setUserDTO({
      ...naverUserInfo,
        email: userEmail,
        name: userName,
        nickname: userNickname,
        isnaver: true,

      })
    }
    
  },[]);

   // 카카오 소셜로그인 후 db에 회원정보가 존재하지 않으면 회원가입창으로 카카오 유저정보 넘겨받기
   useEffect(() => {
    if (userInfo) {
      // userInfo 객체에서 이메일 속성이 있는지 확인  //userInfo의 이메일과 닉네임값을 가져옴
      const userEmail = userInfo.kakao_account?.email; 
      const userNickname = userInfo.kakao_account?.profile?.nickname;
      const useriskakao = 1;  

      // userEmail이 존재하면 해당 값을 userDTO.email에 할당하고, 그렇지 않으면 빈 문자열로 설정합니다.
      setUserDTO((prevUserDTO) => ({
        ...prevUserDTO,
        email: userEmail || '',
        nickname: userNickname || '',
        iskakao: useriskakao || '',
      //nickname: userInfo.properties.nickname,
      }));
    }
  }, [userInfo]);

  
  //비밀번호 정규식 유효성 검사
  const [passwordValidationError, setPasswordValidationError] = useState(''); // 비밀번호 유효성 에러 메시지
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*()_+])(?!.*(abc|def|ghi|jkl|mno|pqr|stu|vwx|yz|123|234|345|456|567|678|789|890)).{8,30}$/;

  //이메일 정규식 유효성 검사
  const [emailValidationError, setEmailValidationError] = useState(''); // 이메일 유효성 에러 메시지
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;


  //이메일 중복검사
  const onFocusEmail = () => {

    if (userDTO.email) {
      // 이메일 형식 유효성 검사
      if (!emailRegex.test(userDTO.email)) {
        setEmailValidationError('올바른 이메일 형식이 아닙니다.');
      } else {
        setEmailValidationError('');
      }
    
    if (userDTO.email) {
      axios.post('/user/existsByEmail', null, { params: { email: userDTO.email } })
        .then(response => {
          console.log(response.data);
          console.log('중복 이메일 검사중입니다.');
          if (response.data === true) {
            setReadCheck('이미 존재하는 이메일입니다. 다른 이메일을 입력해주세요!');
          } else {
            setReadCheck('사용 가능한 이메일입니다.');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
  const [modalVisible, setModalVisible] = useState(false); // 팝업의 표시 여부를 제어하는 상태
  //주소검색 함수 및 모달
  const handleComplete = (data) => {
    setUserDTO({
      ...userDTO,
      addr: data.address,
    });
    setModalVisible(false); // 주소를 선택한 후 팝업을 닫습니다.
  };

  const handleAddData = (data) => {
    // 주소 선택 후의 로직을 여기에 구현
    console.log('Selected Address:', data);
  
    // Destructure the data to get address and postalCode
    const { fullAddress, postalCode } = data;
    // 주소 선택 후의 로직을 여기에 구현
    console.log('Selected Address:', data);
    setUserDTO({
      ...userDTO,
      //우편번호 addr: `${postalCode}`, 
       addr: `${fullAddress}`,//풀주소
    });
  };
  

  const onChange = (e) => {
    setUserDTO({ ...userDTO, [e.target.name]: e.target.value });
  };


  const onSubmit = (e) => {
    // 필수 동의 체크박스들이 모두 체크되었는지 확인
    const isAllNecessaryChecked = data.filter((item) => item.isnecessary && !item.isChk).length === 0;

    if (!isAllNecessaryChecked) {
      setReadCheck('필수동의 약관을 모두 체크해야 합니다!');
      return; // 회원가입을 중지하고 함수를 빠져나감
    }


    // 유효성 검사
    const requiredFields = ['email', 'name', 'nickname', 'password', 'passwordChk', 'addr', 'tel'];
    for (const field of requiredFields) {
      if (!userDTO[field]) {
        setReadCheck(`${field === 'passwordChk' ? '비밀번호 확인 란 ' : field.toUpperCase()}을(를) 입력해주세요!`);
        return; // 회원가입을 중지하고 함수를 빠져나감
      }
    }


    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (userDTO.password !== userDTO.passwordChk) {
      setReadCheck('비밀번호와 비밀번호 확인이 일치하지 않습니다. 다시 확인해주세요!');
      return; // 회원가입을 중지하고 함수를 빠져나감
    }

    // 추가적인 유효성 검사 로직은 여기에 추가

    // 회원가입 성공 시의 로직 추가
    alert('회원가입을 축하드립니다.');
    console.log('눌림');
    console.log(userDTO);

    axios.post('/user/accountWrite', null, { params: userDTO })
      .then(res => {
        alert('회원가입을 축하합니다.');
        console.log(res.data)
      })
      .catch(error => console.log(error));
      navigate('/login');

    };


  //약관체크(전체선택.해제)
  const onChk = (e) => {
    const { name, checked } = e.target;

    if (name === 'all') {
      setData(data.map((item) => ({ ...item, isChk: checked })));
    } else {
      setData(data.map((item) => (item.name === name ? { ...item, isChk: checked } : item)));
    }
  };
  

  return (
    <>
      <div className="WriteBox">
        <h2 className="h2Title">회 원 가 입</h2>
       
          <div className={`d-flex flex-column align-items-center ${styles.loginButtons}`}>
            <p id="naverIdLogin"  className={`${styles.naverLoginBtn} my-2`}>
              네이버 로그인
            </p>
          </div>
          <div className={`d-flex flex-column align-items-center ${styles.loginButtons}`}>
            <div style={{width: "17rem"}}>
              <p className={`${styles.kakaoLoginBtn} my-2`} onClick={loginHandler}>
                카카오로 로그인
              </p>
            </div>
          </div>

        <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          또는
        </p>

        <input type="email" className="WriteInputBox" value={userDTO.email} name="email" onChange={(e) => onChange(e)} onBlur={ onFocusEmail } placeholder="이메일" />
        <br />
        <input type="text" className="WriteInputBox" name="name" onChange={(e) => onChange(e)} placeholder="이름 " />
        <input type="text" className="WriteInputBox" value={userDTO.nickname} name="nickname" onChange={(e) => onChange(e)} placeholder="닉네임" />
        <br />
        <input type="password" className="WriteInputBox" value={userDTO.password} name="password" id="pwd1" onChange={(e) => onChange(e)} placeholder="비밀번호" />
        <br />
        <pre>
          -문자/숫자/특수문자 중 2가지 이상 조합(8~30자)
          <br />-3개 이상 키보드 상 배열이 연속되거나 동일한 문자/숫자 제외
        </pre>
        <input type="password" className="WriteInputBox" name="passwordChk" id="pwd2" onChange={(e) => onChange(e)} placeholder="비밀번호 확인" />
        <br />

        <input type="text" className="WriteAddrInputBox" name="addr" value={userDTO.addr}
        onChange={(e) => onChange(e)} placeholder="주소(우편번호)" />
        <button className="addrBtn" onClick={() => setModalVisible(true)}>
          우편번호 검색
        </button>

        <input type="text" className="WriteInputBox" name="tel" onChange={(e) => onChange(e)} placeholder="휴대폰 번호" />

        {/* 약관동의 */}
        <p>
          <input type="checkbox" name="all" onChange={onChk} checked={data.filter((item) => item.isChk !== true).length < 1} />
          <label>약관전체동의/해제</label>
        </p>

        {data.map((item) => (
          <p className="checkBoxFont" key={item.id}>
            <input type="checkbox" name={item.name} checked={item.isChk} onChange={onChk} />
            <label>{item.text}</label>
          </p>
        ))}

        <button className="WriteSubmitBtn" onClick={onSubmit}>
          회원가입
        </button>
        <div className="readCheck">{ readCheck } <br/> { emailValidationError }</div>
      </div>

      {modalVisible && (
      <PopupPostCode
        onComplete={handleComplete}
        onAddData={handleAddData} // onAddData 함수를 전달
        // ... (다른 필요한 속성이나 구성)
      />
    )}

    </>
  );
};

export default SignIn;