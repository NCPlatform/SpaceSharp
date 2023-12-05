import React, { useEffect, useState } from 'react';
import styles from '../../css/BoardList.module.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';

const BoardList = () => {
  const { page } = useParams();

  const [list, setList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [pagingArray, setPagingArray] = useState([]);

  const [pageSize, setPageSize] = useState('10');

  const handlePageSizeChange = e => {
    setPageSize(e.target.value);
  };

  const storedUser = JSON.parse(window.sessionStorage.getItem('user'));

  const [boardDTO, setBoardDTO] = useState({
    seqBoard: '',
    seqBoardCategory: 7,
    title: '',
    content: '',
    seqRefSeqBoard: 0,
    email: storedUser && storedUser.email,
    releaseDate: '',
  });

  const categoryTitles = {
    7: '1:1 문의',
  };

  useEffect(() => {
    axios
      .get(`/user/list?page=${page}&size=${pageSize}`)
      .then(res => {
        setList(res.data.boardList.content);
        setUserList(res.data.userList);
        setPagingArray(Array.from({ length: res.data.boardList.totalPages }, (_, index) => index + 1));
      })
      .catch(error => console.log(error));
  }, [page, pageSize]);

  return (
    <div className={styles.BoardListTop}>
      <Nav />
      <div className={`container ${styles.BoardListContainer}`}>
        <div>
          <h1>{categoryTitles[boardDTO.seqBoardCategory]}</h1>
        </div>
        <div className={styles.secondArea}>
          <Row md={1}>
            <Col className="d-flex justify-content-end ">
              <div>
                <select className={styles.BoardListSelect} value={pageSize} onChange={handlePageSizeChange}>
                  <option value={10}>10개씩</option>
                  <option value={15}>15개씩</option>
                  <option value={20}>20개씩</option>
                  <option value={25}>25개씩</option>
                  <option value={30}>30개씩</option>
                  <option value={50}>50개씩</option>
                </select>
              </div>
            </Col>
          </Row>
        </div>
        <div className="container">
          <div>
            <table className={styles.table}>
              <thead>
                <tr className="">
                  <th className={styles.BoardListTh1}></th>
                  <th className={styles.BoardListTh2}>제목</th>
                  <th className={styles.BoardListTh3}>닉네임</th>
                  <th className={styles.BoardListTh4}>등록일</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map(item => {
                    const releaseDate = new Date(item.releaseDate);
                    const formattedReleaseDate = releaseDate.toLocaleDateString('ko-KR');

                    return (
                      <tr key={item.seqBoard} className={styles.BoardListTr2}>
                        <td>{item.seqBoard}</td>
                        <td>
                          <Link
                            className={`col-2 text-truncate ${styles.BoardListTitle}`}
                            to={`/boardDetail/${item.seqBoard}`}>
                            {item.title}
                          </Link>
                        </td>
                        <td className={`col-2 text-truncate ${styles.BoardListTd3}`}>
                          {userList && userList.filter(user => user.email === item.email)[0] ? (
                            userList.filter(user => user.email === item.email)[0].nickname
                          ) : (
                            <>삭제된 유저</>
                          )}
                        </td>
                        <td className={styles.BoardListTd4}>{formattedReleaseDate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              {storedUser && storedUser.email ? (
                <Link to="/boardWrite">
                  <button className={styles.BoardListWriteButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                    글쓰기
                  </button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        <div className="text-center">
          <div>
            <Row>
              <div className={styles.BoardListPaging}>
                <div>
                  <Col>
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                      <p style={{ width: '650px', textAlign: 'center' }}>
                        {pagingArray.map(item => (
                          <span key={item}>
                            {/* page는 useParams()으로 받은 객체라서 parseInt() 사용 */}
                            <Link
                              id={item - 1 === parseInt(page) ? styles.currentPaging : styles.paging}
                              to={`/BoardList/${item - 1}`}>
                              {item}
                            </Link>
                          </span>
                        ))}
                      </p>
                    </div>
                  </Col>
                </div>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
