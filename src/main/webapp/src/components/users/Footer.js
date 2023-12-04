import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import img01 from "../../img/img01.png";
import Logo from "../../img/LOGO_NO_BACK.png";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#ebebeb" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="d-flex mt-3">
              <p
                onClick={() => window.open("https://blog.naver.com/spacecloud")}
                className="me-3"
                target="_blank"
                style={{ fontSize: "15px" }}
              >
                블로그
              </p>
              <p
                onClick={() =>
                  window.open("https://www.spacecloud.kr/policyOperate")
                }
                className="me-3"
                style={{ fontSize: "15px" }}
              >
                운영정책
              </p>
              <p
                onClick={() =>
                  window.open("https://www.spacecloud.kr/agreement")
                }
                className="me-3"
                style={{ fontSize: "15px" }}
              >
                이용약관
              </p>
              <p
                onClick={() =>
                  window.open("https://www.spacecloud.kr/policyPerson")
                }
                className="me-3"
                style={{ fontSize: "15px" }}
              >
                개인정보처리방침
              </p>
              <Link
                to="/boardList/0"
                className="text-decoration-none text-dark"
              >
                고객 문의
              </Link>
            </div>
            <br />
            <p className="mb-0" style={{ fontWeight: "bold" }}>
              SPACE SHARP TEAM
            </p>
            <p className="mb-0">대표: 손아영</p>
            <p className="mb-0">이메일: bitcamp@netflex.com</p>
            <p className="mb-0">
              {" "}
              주소: 서울특별시 강남구 강남대로94길 20 삼오빌딩 비트캠프
            </p>

            <br />
            <p className="mb-0">
              스페이스 샤프는 공간 거래정보 및 거래에 대해 책임지지 않습니다.
            </p>
            <br />
          </div>
          <div className="col-md-3 text-center mt-2 my-4">
            <img
              src={Logo}
              alt="뚱이"
              className="w-100"
              style={{ maxWidth: "350px", margin: "0 auto" }}
            />
            <div className="row">
              <i className="bi bi-instagram col" />
              <i className="bi bi-facebook col" />
              <i className="bi bi-twitter col" />
              <i className="bi bi-stickies col" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
