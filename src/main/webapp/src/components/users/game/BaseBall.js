import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Nav from "../Nav.js";
import Swal from "sweetalert2";
import axios from "axios";

const BaseBall = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [base, setBase] = useState([]);
  const [onLoad, setOnLoad] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [answer, setAnswer] = useState(["", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const [past, setPast] = useState([]);

  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const getNumber = () => {
    const array = [];
    for (let i = 0; i < 5; i++) {
      const chosen = candidate.splice(
        Math.floor(Math.random() * (9 - i)),
        1
      )[0];
      array.push(chosen);
      setOnLoad(true);
    }
    setBase(array);
  };

  const onInput = () => {
    let text = "";
    let stCnt = 0;
    for (let i = 0; i < 5; i++) {
      if (answer[i] === "") {
        Swal.fire({ icon: "error", text: "입력하지 않은 값이 있습니다." });
        return;
      } else {
        if (answer[i] * 1 === base[i] * 1) {
          text += "STRIKE,";
          stCnt++;
        } else {
          let chk = false;
          for (let j = 0; j < 5; j++) {
            if (answer[i] * 1 === base[j] * 1) {
              text += "BALL,";
              chk = true;
              j = 5;
            }
          }
          if (!chk) {
            text += "OUT,";
          }
        }
      }
    }
    if (stCnt === 5) {
      if (sessionUserDTO === null) {
        Swal.fire({
          icon: "success",
          title: "성공",
          text: "성공을 축하합니다",
        }).then((res) => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "성공",
          text: "쿠폰을 발급합니다.",
        }).then((res) => {
          axios
            .get(`/user/getCoupon?email=${sessionUserDTO.email}&seqCoupon=10`)
            .then((res) => {
              if (res.data === "success") {
                Swal.fire({
                  icon: "success",
                  text: "쿠폰 발급에 성공했습니다.",
                }).then((res) => {
                  window.location.reload();
                });
              } else if (res.data === "fail") {
                Swal.fire({
                  icon: "success",
                  text: "발행된 쿠폰이 모두 소진되었습니다.",
                }).then((res) => {
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  icon: "error",
                  text: "쿠폰의 중복 소유는 불가능합니다.",
                }).then((res) => {
                  window.location.reload();
                });
              }
            })
            .catch((err) => console.log(err));
        });
      }
    }
    setCnt(cnt * 1 + 1);
    setResult([...result, { text }]);
    setPast([...past, { answer }]);

    if (cnt === 4) {
      Swal.fire({
        icon: "error",
        title: "다시 하시겠습니까?",
        text: "제공된 기회를 모두 소진하셨습니다.",
        showDenyButton: true,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  };

  useEffect(() => {
    console.log(past);
  }, [past]);

  const onChange = (e, number) => {
    let value = 0;
    value = e.target.value;
    if (!/^[0-9]$/.test(value)) {
      value = value % 10;
    }
    if (number === 0) {
      setAnswer([value, answer[1], answer[2], answer[3], answer[4]]);
    }
    if (number === 1) {
      setAnswer([answer[0], value, answer[2], answer[3], answer[4]]);
    }
    if (number === 2) {
      setAnswer([answer[0], answer[1], value, answer[3], answer[4]]);
    }
    if (number === 3) {
      setAnswer([answer[0], answer[1], answer[2], value, answer[4]]);
    }
    if (number === 4) {
      setAnswer([answer[0], answer[1], answer[2], answer[3], value]);
    }
  };

  const onDelete = (number) => {
    if (number === 0) {
      setAnswer(["", answer[1], answer[2], answer[3], answer[4]]);
    }
    if (number === 1) {
      setAnswer([answer[0], "", answer[2], answer[3], answer[4]]);
    }
    if (number === 2) {
      setAnswer([answer[0], answer[1], "", answer[3], answer[4]]);
    }
    if (number === 3) {
      setAnswer([answer[0], answer[1], answer[2], "", answer[4]]);
    }
    if (number === 4) {
      setAnswer([answer[0], answer[1], answer[2], answer[3], ""]);
    }
  };

  useEffect(() => {
    getNumber();
    setAnswer(["", "", "", "", ""]);
    setCnt(0);
    setResult([]);
  }, []);

  return (
    <>
      <Nav />
      <div className="container">
        <p className="fw-bold fs-2">숫자야구</p>
        <p className="text-danger my-0">
          ※5번의 시도안에 숫자를 맞추면 1,000원 할인 쿠폰을 드립니다.
        </p>
        <p className="text-danger">
          {sessionUserDTO === null && (
            <>※로그인하지 않은 유저는 쿠폰 발급이 불가능합니다.</>
          )}
        </p>
        <div className="border border-1 p-2 rounded">
          {onLoad && (
            <>
              <p className="fw-bold fs-5">{cnt + 1}번째 시도입니다.</p>
              <div className="row row-cols-5 mb-3">
                <div className="col">
                  <div className="input-group">
                    <input
                      type="number"
                      min={1}
                      max={9}
                      className="form-control py-0"
                      placeholder="숫자를 입력해주세요."
                      value={answer[0]}
                      onChange={(e) => onChange(e, 0)}
                    />
                    <button
                      className="mt-1 btn btn-close"
                      onClick={() => onDelete(0)}
                    ></button>
                  </div>
                </div>
                <div className="col">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control py-0"
                      placeholder="숫자를 입력해주세요."
                      value={answer[1]}
                      onChange={(e) => onChange(e, 1)}
                    />
                    <button
                      className="mt-1 btn btn-close"
                      onClick={() => onDelete(1)}
                    ></button>
                  </div>
                </div>
                <div className="col">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control py-0"
                      placeholder="숫자를 입력해주세요."
                      value={answer[2]}
                      onChange={(e) => onChange(e, 2)}
                    />
                    <button
                      className="mt-1 btn btn-close"
                      onClick={() => onDelete(2)}
                    ></button>
                  </div>
                </div>
                <div className="col">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control py-0"
                      placeholder="숫자를 입력해주세요."
                      value={answer[3]}
                      onChange={(e) => onChange(e, 3)}
                    />
                    <button
                      className="mt-1 btn btn-close"
                      onClick={() => onDelete(3)}
                    ></button>
                  </div>
                </div>
                <div className="col">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control py-0"
                      placeholder="숫자를 입력해주세요."
                      value={answer[4]}
                      onChange={(e) => onChange(e, 4)}
                    />
                    <button
                      className="mt-1 btn btn-close"
                      onClick={() => onDelete(4)}
                    ></button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                {cnt < 5 ? (
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => onInput()}
                  >
                    제출
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    다시하기
                  </button>
                )}
              </div>
            </>
          )}
          {result &&
            result.map((item, index) => (
              <div key={index} className="row row-cols-5">
                {item.text
                  .substr(0, item.text.length - 1)
                  .split(",")
                  .map((text, index2) => (
                    <div className="col px-2">
                      <div
                        key={index2}
                        className={
                          text === "STRIKE"
                            ? "text-center bg-success rounded"
                            : text === "BALL"
                            ? "text-center bg-primary rounded"
                            : "text-center bg-secondary rounded"
                        }
                      >
                        <p className="p-0 my-0 mt-3">
                          {past[index].answer[index2]}
                        </p>
                        <p className="fw-bold">{text}</p>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default BaseBall;
