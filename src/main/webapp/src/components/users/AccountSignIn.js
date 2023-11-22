import React, { useState, useEffect } from 'react';
import '../../css/AccountSignIn.css';
import naverBtn from '../../image/naverBtn.png';
import kakaoBtn from '../../image/kakaoBtn.png';
import axios from 'axios';
import PopupPostCode from './PopupPostCode';
import { useNavigate } from 'react-router-dom';

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
    usergrade: 1,     //회원 기본 등급
    payment: '',
    iskakao: false,
    isnaver: false, 
  });

  const [passwordChk, setPasswordChk] = useState(''); // 비밀번호 확인
  const [readCheck, setReadCheck] = useState(''); //유효성검사 div영역


  //카카오 REST API
  const REST_API_KEY = '9ee2bf7ff3fd8c0f4da4c49d740dc522';//developers.kakao.com 에서 발급받은 restAPI_Key
  const REDIRECT_URI = 'http://localhost:3000/KakaoRedirect';//developers.kakao.com 에서 설정해놓은 REDIRECT_URI
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


  //카카오 로그인(페이지이동;버튼)
  const loginHandler = () => {
    window.location.href = link;
  };


  // 카카오 소셜로그인 이메일 속성 불러오기
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

  console.log(userDTO);

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
    // 비밀번호 확인 입력란이면 별도로 관리
    if (e.target.name === 'passwordChk') {
      setPasswordChk(e.target.value);
    } else {
      setUserDTO({ ...userDTO, [e.target.name]: e.target.value });
    }
  };


  const onSubmit = (e) => {

    console.log(userDTO)

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
    if (userDTO.password !== passwordChk) {
      setReadCheck('비밀번호와 비밀번호 확인이 일치하지 않습니다. 다시 확인해주세요!');
      return;
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
        <div>
          <button className="WriteInputBtn" >&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <img src={naverBtn} style={{ width: '40px', height: '40px' }} alt="네이버 로그인" />
            네이버 로그인
          </button>
          <br />
          <button className="WriteInputBtn" onClick={loginHandler} >&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <img src={kakaoBtn} style={{ width: '40px', height: '40px' }} alt="카카오 로그인" />
            카카오 로그인
          </button>
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
        <input
          type="password"
          className="WriteInputBox"
          value={userDTO.passwordChk}
          name="passwordChk"
          id="pwd2"
          onChange={(e) => onChange(e)}
          placeholder="비밀번호 확인" />
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