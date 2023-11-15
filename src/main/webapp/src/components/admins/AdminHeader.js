import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  
  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  return (
  <nav className="navbar navbar-dark bg-dark fixed-top">
    <div className="container-fluid">
      <Link to="/manager" className="navbar-brand">
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
              <Link
                to="/admin/dashboard"
                className="nav-link active"
                aria-current="page"
              >
                DASHBOARD
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/myplace" className="nav-link">
                MY PLACE
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/reservation" className="nav-link">
                RESERVATION
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/review" className="nav-link">
                REVIEW
              </Link>
            </li>
          </ul>
        </div>
        <div className="offcanvas-footer text-center mb-5">
          <Link to="/" className="nav-link">
            Main
          </Link>
          <span className="mx-2">/</span>
          <Link to="/" className="nav-link" onClick={() => { sessionStorage.clear(); }}>
            Log Out
          </Link>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default AdminHeader;
