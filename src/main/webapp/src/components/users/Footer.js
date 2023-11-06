import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import img01 from '../../img/img01.png';

const Footer = () => {
    return (
        <footer style={{backgroundColor: '#ebebeb'}}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <br />
                            <a href="https://blog.naver.com/spacecloud" target="_blank">블로그</a>
                            <span className="mx-2">&nbsp;</span>
                            <a href="https://www.spacecloud.kr/policyOperate">운영정책</a>
                            <span className="mx-2">&nbsp;</span>
                            <a href="https://www.spacecloud.kr/agreement">이용약관</a>
                            <span className="mx-2">&nbsp;</span>
                            <a href="https://www.spacecloud.kr/policyPerson">개인정보처리방침</a>
                            <span className="mx-2">&nbsp;</span>
                            <a href="#">고객 문의</a>
                        </div>
                        <br />
                        <p className="mb-0" style={{ fontWeight: 'bold' }}>SPACE SHARP TEAM</p>
                        <p className="mb-0">대표: 손아영</p>
                        <p className="mb-0">이메일: bitcamp@netflex.com</p>
                        <p className="mb-0"> 주소: 서울특별시 강남구 강남대로94길 20 삼오빌딩 비트캠프</p>
                        
                        <br />
                        <p className="mb-0">스페이스클라우드는 공간 거래정보 및 거래에 대해 책임지지 않습니다.</p>
                        <br />
                    </div>
                    <div className="col-md-6 text-end">
                        <img src={img01} alt='뚱이' style={{width: '350px', height: '100px'}}/><br/>
                        <i className="bi bi-instagram" /> &nbsp; <i className="bi bi-facebook" /> &nbsp; <i className="bi bi-twitter" /> &nbsp; <i className="bi bi-stickies"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


