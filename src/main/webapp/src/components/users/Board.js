import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from '../../css/BoardList.module.css';
import TableBoardItems from './BoardComponents/TableBoardItems';
import GallaryBoardItems from './BoardComponents/GallaryBoardItems';

const Board = () => {
  const { seqBoardCategory } = useParams();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [sort, setSort] = useState('seqBoard');
  const [sortDirection, setSortDirection] = useState('DESC');
  const [searchKey, setSearchKey] = useState('');

  const [searchBtn, setSearchBtn] = useState(true);

  const [totalPages, setTotalPages] = useState();
  const [semiPage, setSemiPage] = useState(0);

  const [userList, setUserList] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [boardCategory, setBoardCategory] = useState();

  const navigate = useNavigate();

  const [showBoardType, setShowBoardType] = useState('table');

  const [sessionUserDTO, setSessionUserDTO] = useState(JSON.parse(sessionStorage.getItem('user')));

  const goLastPage = () => {
    if (page + 1 === totalPages) {
      Swal.fire({
        icon: 'warning',
        title: '마지막 페이지입니다',
        text: '페이지 이동이 불가능합니다',
      });
    } else {
      setPage(totalPages - 1);
      setSemiPage(5 * Math.floor(totalPages / 5));
    }
  };

  useEffect(() => {
    axios
      .get(
        `/user/getBoardList?page=${page}&size=${size}&sort=${sort},${sortDirection}&searchKey=${searchKey}&seqBoardCategory=${seqBoardCategory}`
      )
      .then(res => {
        console.log(res.data);
        setBoardList(res.data.boardList.content);
        setUserList(res.data.userList);
        setTotalPages(res.data.boardList.totalPages);
        setBoardCategory(res.data.boardCategory);
      })
      .catch(err => console.log(err));
  }, [page, size, sort, sortDirection, searchBtn, seqBoardCategory]);
  return (
    <div>
      <Nav />
      <div className="container" style={{ minHeight: '63.8vh' }}>
        {boardCategory && <p className="fs-3 fw-bold text-center">{boardCategory.title}</p>}
        {seqBoardCategory && seqBoardCategory > 1 && seqBoardCategory < 7 && (
          <>
            <p className="fs-5 text-center mb-5">자주 물어보는 질문</p>
            <div className="row text-center">
              <div
                className={seqBoardCategory * 1 === 2 ? 'border-bottom col fw-bold' : 'col text-secondary'}
                onClick={() => navigate('/board/2')}>
                로그인 문의
              </div>
              <div
                className={seqBoardCategory * 1 === 3 ? 'border-bottom col fw-bold' : 'col text-secondary'}
                onClick={() => navigate('/board/3')}>
                공간 문의
              </div>
              <div
                className={seqBoardCategory * 1 === 4 ? 'border-bottom col fw-bold' : 'col text-secondary'}
                onClick={() => navigate('/board/4')}>
                예약 및 결제
              </div>
              <div
                className={seqBoardCategory * 1 === 5 ? 'border-bottom col fw-bold' : 'col text-secondary'}
                onClick={() => navigate('/board/5')}>
                취소 및 환불
              </div>
              <div
                className={seqBoardCategory * 1 === 6 ? 'border-bottom col fw-bold' : 'col text-secondary'}
                onClick={() => navigate('/board/6')}>
                증빙서류 발급
              </div>
            </div>
          </>
        )}
        {totalPages ? (
          <>
            <div className="d-flex justify-content-end">
              <p className="me-3">게시판 형식</p>
              <p className="me-2" onClick={() => setShowBoardType('table')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-layout-text-window-reverse"
                  viewBox="0 0 16 16">
                  <path d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5z" />
                  <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM2 1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1H2zM1 4v10a1 1 0 0 0 1 1h2V4H1zm4 0v11h9a1 1 0 0 0 1-1V4H5z" />
                </svg>
              </p>
              /
              <p className="ms-2" onClick={() => setShowBoardType('gallary')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-grid"
                  viewBox="0 0 16 16">
                  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                </svg>
              </p>
            </div>
            {totalPages && boardList && showBoardType === 'table' ? (
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th scope="col" className={styles.BoardListTh1}></th>
                    <th scope="col" className={styles.BoardListTh2}>
                      제목
                    </th>
                    <th scope="col" className={styles.BoardListTh3}>
                      이름
                    </th>
                    <th scope="col" className={styles.BoardListTh4}>
                      등록일
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {boardList.map((item, index) => (
                    <TableBoardItems
                      item={item}
                      userName={userList.filter(user => user.email === item.email)[0].nickname}
                      key={index}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3">
                {boardList.map((item, index) => (
                  <GallaryBoardItems
                    item={item}
                    userName={userList.filter(user => user.email === item.email)[0].nickname}
                    key={index}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="mt-5 text-center">
            <h1>해당 카테고리에 작성된 글이 없습니다.</h1>
            <h5>문의사항은 문의 게시판을 이용해주세요</h5>
          </div>
        )}

        {totalPages ? (
          <div className="text-center mb-3">
            <button
              className="btn btn-outline-dark mx-1 px-2"
              onClick={() => {
                page === 0
                  ? Swal.fire({
                      icon: 'warning',
                      title: '첫번째 페이지입니다',
                      text: '페이지 이동이 불가능합니다',
                    })
                  : setPage(0);
                semiPage !== 0 && setSemiPage(0);
              }}>
              <i className="bi bi-chevron-double-left"></i>
            </button>
            <button
              className="btn btn-outline-dark mx-1 px-2"
              onClick={() =>
                semiPage === 0
                  ? page === 0
                    ? Swal.fire({
                        icon: 'warning',
                        title: '첫번째 페이지입니다',
                        text: '페이지 이동이 불가능합니다',
                      })
                    : setPage(0)
                  : (setPage(semiPage - 1), setSemiPage(semiPage - 5))
              }>
              <i className="bi bi-chevron-left"></i>
            </button>
            {Array.from({ length: 5 }).map(
              (item, idx) =>
                semiPage + idx < totalPages && (
                  <button
                    key={idx}
                    className={page === idx + semiPage ? 'btn btn-dark mx-1' : 'btn btn-secondary mx-1'}
                    onClick={() => setPage(idx + semiPage)}>
                    {idx + 1 + semiPage}
                  </button>
                )
            )}
            <button
              className="btn btn-outline-dark mx-1 px-2"
              onClick={() =>
                semiPage + 5 > totalPages || semiPage + 5 === totalPages
                  ? page + 1 === totalPages
                    ? Swal.fire({
                        icon: 'warning',
                        title: '마지막 페이지입니다',
                        text: '페이지 이동이 불가능합니다',
                      })
                    : setPage(totalPages - 1)
                  : (setPage(semiPage + 5), setSemiPage(semiPage + 5))
              }>
              <i className="bi bi-chevron-right"></i>
            </button>
            <button
              className="btn btn-outline-dark mx-1 px-2"
              onClick={() => {
                goLastPage();
              }}>
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </div>
        ) : (
          <></>
        )}
        {sessionUserDTO && sessionUserDTO.usergrade === 10 && (
          <Link to={`/boardWrite/${seqBoardCategory}`} type="btn" className="btn float-end mt-5">
            글 쓰기
          </Link>
        )}
        <div className="my-3 mt-5 mb-5" style={{ width: '60%', margin: '0 auto' }}>
          <div className="input-group ">
            <input
              type="text"
              className="form-control"
              placeholder="searchValue"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={searchKey}
              onChange={e => {
                setSearchKey(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={() => {
                setSearchBtn(!searchBtn);
              }}>
              검색
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Board;
