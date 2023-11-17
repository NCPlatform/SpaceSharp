import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import styles from '../../css/FindPassword.module.css';

const FindPassword = () => {
    return (
        <div className={styles.FindPasswordWrap}>
        <div className={styles.FindPassword0}> 
            <h1 className={styles.FindPassword1}>비밀번호 찾기</h1>
            <div>  
                <FloatingLabel
                controlId="floatingInput"
                label="이메일"
                className={`mb-3 ${styles.FindPassword2}`}
                >
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
            </div>
            <p>가입시 사용한 이메일 주소를 입력해주시면 비밀번호 재설정 링크를 보내드립니다.</p>
            <p>네이버, 카카오로 가입하신 경우 비밀번호 찾기가 불가합니다.</p>
            <div className="d-grid gap-2">
            <button variant="primary" size="lg" style={{ background: '#FFEB00', border: 'none' }}> 비밀번호 재설정 링크 보내기 </button>
            </div>
        </div>
        </div>
    );
};

export default FindPassword;