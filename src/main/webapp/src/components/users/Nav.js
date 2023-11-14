import React from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../../css/navheader.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/mainColor.css";
import { Offcanvas } from "react-bootstrap";
import Session from "react-session-api";

const NavTest = () => {
  return (
    <div>
      {[false].map((expand) => (
        <div key={expand} className="mb-5 my-navbar fourthBackColor">
          <Navbar expand={expand} className="">
            <Container fluid>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header className="py-4 fourthBackColor" closeButton>
                  <p></p>
                  <div className="text-center">
                    {Session}
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "black" }}
                      className="text-center"
                    >
                      <p
                        className="offcanvas-title fw-bold"
                        id="offcanvasNavbarLabel"
                      >
                        게스트로
                        <br />
                        로그인 / 회원가입
                      </p>
                    </Link>
                  </div>
                </Offcanvas.Header>

                {/* offcanvas body */}
                <div className="bg-body-secondary" style={{ height: "100vh" }}>
                  {/* Grid */}
                  <div className="px-2 py-3">
                    <div className="row text-center">
                      <div className="col">
                        <p>&#127881;</p>이벤트
                      </div>
                      <div className="col">
                        <p>🗒</p>
                        예약
                        <br />
                        리스트
                      </div>
                      <div className="col">
                        <p>📰</p>
                        이용후기
                        <br />
                        Q&A관리
                      </div>
                      <div className="col">
                        <p>♥</p>찜한 공간
                      </div>
                    </div>
                  </div>

                  {/* list */}
                  <div className="py-3 ps-3 pe-3 mb-3 text-white fw-bold d-flex justify-content-between firstBackColor">
                    <span className="py-0">내 관심정보 설정</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                  <div className="py-2 ps-3 pe-3 fw-bold bg-white d-flex justify-content-between border">
                    <span className="py-0">스페이스클라우드 홈</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>

                  <div className="py-2 ps-3 pe-3 fw-bold bg-white d-flex justify-content-between border">
                    <span className="py-0">공지사항</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>

                  <div className="py-2 ps-3 pe-3 fw-bold bg-white d-flex justify-content-between border">
                    <span className="py-0">도움말</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                  <Link to="/boardList/0">
                    <div className="py-2 ps-3 pe-3 fw-bold bg-white d-flex justify-content-between border">
                      <span className="py-0">1:1 문의</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="24"
                        fill="currentColor"
                        className="bi bi-chevron-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </div>
                  </Link>
                  <div className="fw-bold accordion accordion-flush">
                    <div className="accordion-header"></div>
                    <div
                      className="py-2 ps-3 pe-3 bg-white border accordion-button collapsed"
                      id="serviceInfo"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <span className="py-0">서비스 정보</span>
                    </div>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse"
                      data-bs-parent="#serviceInfo"
                    >
                      <div>
                        <ul className="list-group">
                          <li className="list-group-item border ps-3 py-1 fw-light bg-transparent">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-dot"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            </svg>
                            서비스 소개
                          </li>
                          <li className="list-group-item border ps-3 py-1 fw-light bg-transparent">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-dot"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            </svg>
                            이용약관
                          </li>
                          <li className="list-group-item border ps-3 py-1 fw-light bg-transparent">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-dot"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            </svg>
                            개인정보처리방침
                          </li>
                          <li className="list-group-item border ps-3 py-1 fw-light bg-transparent">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-dot"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                            </svg>
                            운영정책
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="text-center pt-2">
                    로그인
                    <br />
                    powered by &#9426; Netflex Corp
                  </div>
                </div>
                <div className="py-3 ps-3 pe-3 text-white fw-bold text-center secondBackColor">
                  <span className="py-0 me-2">호스트센터로 이동</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-right-circle"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      className="firstFontColor"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                    />
                  </svg>
                </div>
              </Navbar.Offcanvas>
              <Link to="/">
                <Navbar.Brand>Space #</Navbar.Brand>
              </Link>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="어떤 공간이 필요하세요?"
                  className="me-2"
                  aria-label="Search"
                  style={{ width: "220px" }}
                />
                <Button variant="outline-dark">
                  <span className="bi bi-search"></span>
                </Button>
              </Form>
            </Container>
          </Navbar>
        </div>
      ))}
    </div>
  );
};

export default NavTest;
