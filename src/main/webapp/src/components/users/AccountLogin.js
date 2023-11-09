import React from "react";

const Login = () => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <p>텍스트테스트</p>
        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          Link with href
        </a>
      </div>
      <div className="collapse" id="collapseExample" style={{width: "18rem"}}>
        <div className="card">
          <div className="card-body text-center">
            <h5 className="card-title">공유하기</h5>
            <img className="img-fluid" src="https://cdn.icon-icons.com/icons2/2429/PNG/512/kakaotalk_logo_icon_147272.png" style={{width: '5rem'}} alt="kakao"/>
            <div className="input-group mt-3">
              <input class="form-control" type="text" value={"url주소"} readOnly/>
              <button className="btn btn-outline-secondary" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1Zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
