import React, { useState } from "react";
import "../../css/managersNav.css";
import { Link } from "react-router-dom";

const ManagerHeader = () => {
  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const locate = (sitename) => {
    // location.href를 바꾸는 함수
    window.location.href = "/manager/" + sitename;
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link to="/manager" className="navbar-brand">
            MANAGER
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
                MANAGER
              </h5>
              <button
                btn=""
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 manager-nav">
                <li className="nav-item bg-white bg-opacity-25">
                  <p>
                    <span className="fw-bold">{sessionUserDTO.name}사장님</span>
                    안녕하세요.
                  </p>
                </li>
                <li className="nav-item">
                  <Link
                    to="/manager"
                    className="nav-link active"
                    aria-current="page"
                  >
                    DASHBOARD
                  </Link>
                </li>
                <li className="nav-item" onClick={() => locate("myplace")}>
                  <Link to="/manager/myplace" className="nav-link">
                    MY PLACE
                  </Link>
                </li>
                <li className="nav-item" onClick={() => locate("addPlace")}>
                  <Link to="/manager/addPlace" className="nav-link">
                    ADD MY PLACE
                  </Link>
                </li>
                <li className="nav-item" onClick={() => locate("reservation")}>
                  <Link to="/manager/reservation" className="nav-link">
                    RESERVATION
                  </Link>
                </li>
                <li className="nav-item" onClick={() => locate("review")}>
                  <Link to="/manager/review" className="nav-link">
                    REVIEW
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/manager/chat" className="nav-link">
                    CHAT
                  </Link>
                </li>
              </ul>
            </div>
            <div className="offcanvas-footer text-center mb-5 managerNavFooter">
              <Link to="/" className="nav-link">
                Main
              </Link>
              <span className="mx-2">/</span>
              <Link to="/" className="nav-link">
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ManagerHeader;
