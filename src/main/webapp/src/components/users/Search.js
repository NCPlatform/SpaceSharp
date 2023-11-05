import Slider, { Range } from "rc-slider";
import React, { useState } from "react";
import "rc-slider/assets/index.css";

const Search = () => {
  const [priceRange, setPriceRange] = useState({
    lowerBound: 0,
    upperBound: 300000,
    value: [0, 300000],
  });

  return (
    <div className="container mt-5">
      <button
        type="button"
        className="btn border-0"
        data-bs-toggle="dropdown"
        data-bs-auto-close="false"
        aria-expanded="false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          className="bi bi-dpad"
          viewBox="0 0 16 16"
        >
          <path d="m7.788 2.34-.799 1.278A.25.25 0 0 0 7.201 4h1.598a.25.25 0 0 0 .212-.382l-.799-1.279a.25.25 0 0 0-.424 0Zm0 11.32-.799-1.277A.25.25 0 0 1 7.201 12h1.598a.25.25 0 0 1 .212.383l-.799 1.278a.25.25 0 0 1-.424 0ZM3.617 9.01 2.34 8.213a.25.25 0 0 1 0-.424l1.278-.799A.25.25 0 0 1 4 7.201V8.8a.25.25 0 0 1-.383.212Zm10.043-.798-1.277.799A.25.25 0 0 1 12 8.799V7.2a.25.25 0 0 1 .383-.212l1.278.799a.25.25 0 0 1 0 .424Z" />
          <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v3a.5.5 0 0 1-.5.5h-3A1.5 1.5 0 0 0 0 6.5v3A1.5 1.5 0 0 0 1.5 11h3a.5.5 0 0 1 .5.5v3A1.5 1.5 0 0 0 6.5 16h3a1.5 1.5 0 0 0 1.5-1.5v-3a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 0 16 9.5v-3A1.5 1.5 0 0 0 14.5 5h-3a.5.5 0 0 1-.5-.5v-3A1.5 1.5 0 0 0 9.5 0h-3ZM6 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3A1.5 1.5 0 0 0 11.5 6h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a1.5 1.5 0 0 0-1.5 1.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3A1.5 1.5 0 0 0 4.5 10h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 0 6 4.5v-3Z" />
        </svg>
      </button>
      <div className="dropdown-menu p-3">
        <form>
          <div className="p-3 border">
            <p>결제 유형</p>
            <div className="row">
              <button
                type="button"
                className="btn btn btn-outline-secondary col mx-2"
                data-bs-toggle="button"
              >
                바로 결제
              </button>
              <button
                className="btn btn btn-outline-secondary col mx-2"
                data-bs-toggle="button"
              >
                승인 결제
              </button>
            </div>
            <p className="mt-5">가격</p>
            <span style={{ fontSize: "0.6rem" }}>
              가격 검색의 최소 단위는 5,000원입니다.
            </span>
            <div className="row">
              <div className="col form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="0"
                  value={priceRange.lowerBound}
                  name="lowerBound"
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      [e.target.name]: [e.target.value],
                    })
                  }
                />
                <label htmlFor="floatingInput" style={{ fontSize: "0.6rem" }}>
                  최소가격
                </label>
              </div>
              ~
              <div className="col form-floating">
                <input
                  type="number"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={priceRange.upperBound}
                  name="upperBound"
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      [e.target.name]: [e.target.value],
                    })
                  }
                />
                <label
                  htmlFor="floatingPassword"
                  style={{ fontSize: "0.6rem" }}
                >
                  최대가격
                </label>
              </div>
            </div>
            <Slider
              range
              min={0}
              max={300000}
              defaultValue={priceRange.value}
              onChange={(e) => {
                setPriceRange({ lowerBound: [e[0]], upperBound: [e[1]] });
              }}
              allowCross={false}
            />

            <p className="mt-5">편의 시설</p>
            <div className="row row-cols-3">
              <div className="col p-2">
                <button
                  className="btn btn-outline-dark container-fluid"
                  data-bs-toggle="button"
                >
                  TV
                </button>
              </div>
              <div className="col p-2">
                <button
                  className="btn btn-outline-dark container-fluid"
                  data-bs-toggle="button"
                >
                  TV
                </button>
              </div>
              <div className="col p-2">
                <button
                  className="btn btn-outline-dark container-fluid"
                  data-bs-toggle="button"
                >
                  TV
                </button>
              </div>
              <div className="col p-2">
                <button
                  className="btn btn-outline-dark container-fluid"
                  data-bs-toggle="button"
                >
                  TV
                </button>
              </div>
            </div>
            <div className="row">
              <button type="reset" className="col-5 btn btn-warning border-0">
                초기화
              </button>
              <button type="button" className="col-7 btn btn-warning border-0">
                필터 적용하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
