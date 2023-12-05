import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../css/navheader.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/mainColor.css";
import { Offcanvas } from "react-bootstrap";

const NavTest = () => {
  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const navigator = useNavigate();

  return (
    <div>
      {[false].map((expand) => (
        <div key={expand} className="mb-4 my-navbar bg-body-tertiary">
          <Navbar
            expand={expand}
            className=""
            style={{ backgroundColor: "#FFF" }}
          >
            <Container fluid>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Link to="/">
                <Navbar.Brand
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: "5px",
                  }}
                >
                  Space #
                </Navbar.Brand>
              </Link>
              <Form className="d-none d-lg-block">
                <div className="input-group">
                  <Form.Control
                    type="search"
                    placeholder="어떤 공간이 필요하세요?"
                    className="me-2"
                    aria-label="Search"
                    style={{ width: "218px" }}
                  />
                  <Button variant="outline-dark">
                    <span className="bi bi-search"></span>
                  </Button>
                </div>
              </Form>
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header className="py-4 fourthBackColor" closeButton>
                  <p></p>
                  <div className="text-center">
                    {sessionUserDTO ? (
                      <div
                        style={{ textDecoration: "none", color: "black" }}
                        className="text-center"
                      >
                        <p className="fw-bold mb-0">{sessionUserDTO.name}</p>
                        <Link
                          to="/update"
                          style={{
                            fontSize: "0.8rem",
                            color: "black",
                            textDecoration: "none",
                          }}
                        >
                          프로필 관리
                        </Link>
                      </div>
                    ) : (
                      <div
                        style={{ textDecoration: "none", color: "black" }}
                        className="text-center"
                        onClick={() => navigator("/login")}
                      >
                        <p
                          className="offcanvas-title fw-bold"
                          id="offcanvasNavbarLabel"
                        >
                          게스트로
                          <br />
                          로그인 / 회원가입
                        </p>
                      </div>
                    )}
                  </div>
                </Offcanvas.Header>

                {/* offcanvas body */}
                <div className="bg-body-secondary" style={{ height: "100vh" }}>
                  {/* Grid */}
                  <div className="px-2 py-3">
                    <div className="row text-center">
                      <Link
                        to="/NavEvent"
                        className="col text-decoration-none text-dark"
                      >
                        <p>&#127881;</p>이벤트
                      </Link>
                      <Link
                        to="/hotelReserveList"
                        className="col text-decoration-none text-dark"
                      >
                        <p>🗒</p>
                        예약
                        <br />
                        리스트
                      </Link>
                      <Link
                        to="/hotelReviewList"
                        className="col text-decoration-none text-dark"
                      >
                        <p>📰</p>
                        이용후기
                        <br />
                        Q&A관리
                      </Link>
                      <Link
                        to="/likedHotelList"
                        className="col text-decoration-none text-dark"
                      >
                        <p>♥</p>찜한 공간
                      </Link>
                    </div>
                  </div>

                  {/* list */}
                  <Link to="/chat" className="text-decoration-none">
                    <div className="py-3 ps-3 pe-3 mb-3 text-white fw-bold d-flex justify-content-between firstBackColor">
                      <span className="py-0">채팅</span>
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
                  </Link>
                  <Link
                    to="/"
                    className="py-2 ps-3 pe-3 fw-bold bg-white d-flex justify-content-between border text-decoration-none text-dark"
                  >
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
                  </Link>

                  <Link
                    to="/board/1"
                    className="py-2 ps-3 pe-3 fw-bold bg-white d-flex justify-content-between border text-decoration-none text-dark"
                  >
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
                  </Link>

                  <Link
                    to="/board/2"
                    className="py-2 ps-3 pe-3 fw-bold bg-white d-flex justify-content-between border text-decoration-none text-dark"
                  >
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
                  </Link>
                  <Link
                    to="/boardList/0"
                    className="text-decoration-none text-black"
                  >
                    <div className="py-2 ps-3 pe-3 fw-bold bg-white d-flex justify-content-between border ">
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
                          <Link
                            to="/info"
                            className="list-group-item border ps-3 py-1 fw-light bg-transparent"
                          >
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
                          </Link>
                          <li
                            className="list-group-item border ps-3 py-1 fw-light bg-transparent"
                            onClick={() =>
                              window.open("https://www.spacecloud.kr/agreement")
                            }
                          >
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
                          <li
                            className="list-group-item border ps-3 py-1 fw-light bg-transparent"
                            onClick={() =>
                              window.open(
                                "https://www.spacecloud.kr/policyPerson"
                              )
                            }
                          >
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
                          <li
                            className="list-group-item border ps-3 py-1 fw-light bg-transparent"
                            onClick={() =>
                              window.open(
                                "https://www.spacecloud.kr/policyOperate"
                              )
                            }
                          >
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
                    {sessionUserDTO ? (
                      <span
                        onClick={() => {
                          sessionStorage.clear();
                          window.location.reload();
                        }}
                      >
                        로그아웃
                      </span>
                    ) : (
                      <div onClick={() => navigator("/login")}>로그인</div>
                    )}
                    <br />
                    powered by &#9426; Netflex Corp
                  </div>
                </div>

                {sessionUserDTO && sessionUserDTO.usergrade * 1 > 5 ? (
                  <Link to="/manager" className="text-decoration-none">
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
                  </Link>
                ) : (
                  <div
                    className="py-3 ps-3 pe-3 text-white fw-bold text-center secondBackColor"
                    onClick={() => alert("일반유저는 접근할 수 없습니다.")}
                  >
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
                )}
                {sessionUserDTO && sessionUserDTO.usergrade * 1 === 10 ? (
                  <Link to="/admin" className="text-decoration-none">
                    <div className="py-3 ps-3 pe-3 text-white fw-bold text-center secondBackColor">
                      <span className="py-0 me-2">
                        최고 관리자 페이지로 이동
                      </span>
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
                  </Link>
                ) : (
                  <></>
                )}
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
      ))}
    </div>
  );
};

export default NavTest;
