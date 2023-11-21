import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminHeader = () => {
  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const navigate = useNavigate();

  return (
    <div>
      {sessionUserDTO !== null && sessionUserDTO.usergrade > 6 ? (
        <nav className="navbar navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <Link to="/admin" className="navbar-brand">
              ADMIN
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#managerCanvas"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="offcanvas offcanvas-end text-bg-dark"
              tabIndex="-1"
              id="managerCanvas"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  ADMIN
                </h5>
                <button
                  btn=""
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item bg-white bg-opacity-25">
                    <p>
                      <span className="fw-bold">{sessionUserDTO.name}님</span>
                      안녕하세요.
                    </p>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link active">
                      DASHBOARD
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/coupon" className="nav-link">
                      COUPON
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/event" className="nav-link">
                      EVENT
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/user" className="nav-link">
                      USER
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="offcanvas-footer text-center mb-5">
                <Link to="/" className="nav-link">
                  Main
                </Link>
                <span className="mx-2">/</span>
                <p
                  className="nav-link"
                  onClick={() => {
                    sessionStorage.clear();
                    navigate("/");
                  }}
                >
                  Log Out
                </p>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <div
          style={{ height: "100vh" }}
          onLoad={Swal.fire({
            title: "접근 권한이 없습니다.",
            text: "계정 권한을 확인해주세요.",
            icon: "error",
          }).then((res) => {
            navigate("/");
          })}
        ></div>
      )}
    </div>
  );
};

export default AdminHeader;
