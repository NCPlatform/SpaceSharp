import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import styles from '../../css/BoardRead.module.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav.js';
import Swal from 'sweetalert2';
import BoardReply from './BoardReply.js';

const BoardDetail = () => {
  const { paramSeqBoard, paramSeqRefSeqBoard } = useParams();

  const [comments, setComments] = useState();
  const [userList, setUserList] = useState([])

  const navigate = useNavigate();

  const categoryTitles = {
    7: '1:1 문의',
  };

  const [boardDTO, setBoardDTO] = useState({
    seqBoard: '',
    seqBoardCategory: 7,
    title: '',
    content: '',
    seqRefSeqBoard: 0,
    email: 'user',
    releaseDate: '',
  });

  const storedUser = JSON.parse(window.sessionStorage.getItem('user'));
  const [userEmail, setUserEmail] = useState('');
  const usergrade = storedUser ? storedUser.usergrade : null;

  useEffect(() => {
    if (storedUser && storedUser.email === boardDTO.email) {
      setBoardDTO(prevState => ({
        ...prevState,
        email: storedUser.email // Update the email to match the stored user's email
      }));
      setUserEmail(storedUser.email); // Set userEmail from storedUser's email
    }
  }, [storedUser]);
  

  const onDeleteSuccess = e => {
    e.preventDefault();

    console.log(boardDTO);

    axios
      .post(`/user/delete`, null, { params: boardDTO })
      .then(res => {
        Swal.fire({
          title: '게시글이 삭제되었습니다.',
          imageWidth: 300,
          imageHeight: 200,
        });
        navigate('/BoardList/0');
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    axios.get(`/user/list`)
         .then(res => {
          setUserList(res.data.userList);
         })
         .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    axios
      .get(`/user/getBoard?seqBoard=${paramSeqBoard}`)
      .then(response => {
        console.log('API Response:', response.data);
        setBoardDTO(response.data);
      })
      .catch(error => console.error('Error:', error));
  }, [paramSeqBoard]);

  useEffect(() => {
    axios
      .get(`/user/getReply?seqRefSeqBoard=${paramSeqBoard}`)
      .then(response => {
        console.log('Comments:', response.data);
        setComments(response.data);
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, []);

  const formattedReleaseDate = new Date(boardDTO.releaseDate).toLocaleDateString('ko-KR');
  
  const removeHtmlTags = html => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <Nav />
      <div className={`container ${styles.BoardReadWrap}`}>
        <div>
          <Row>
            <Col className="d-flex justify-content-end ">
              <div>
                <button className="btn btn-secondary" onClick={() => navigate('/BoardList/0')}>
                  목록
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="text-center">
          <div>
            <div>
              <Row md={1}>
                <Col className={`d-flex justify-content-start ${styles.BoardReadSeq}`}>
                  <div className={styles.BoardDetailCategoryTitle}>
                    <h1>{categoryTitles[boardDTO.seqBoardCategory]}</h1>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={`d-flex justify-content-start ${styles.BoardReadTitle}`}>
                  <div className="">

                    <p className={styles.BoardReadTitle1}>{boardDTO.title}</p>
                  </div>
                </Col>
              </Row>
              <div className={`${styles.BoardDetailUser1}`}>
                <div className={`${styles.BoardDetailUser2}`}>
                  <div className={`${styles.BoardDetailUser3}`}>
                    <div className={`${styles.BoardDetailUser4}`}>
                      <p className={styles.BoardReadP}>{userList&&userList.filter(user => user.email === boardDTO.email)[0]?.name}({boardDTO.email})</p>
                    </div>
                  </div>
                </div>
                <div className={`${styles.BoardDetailUser5}`}>
                  <div className={`${styles.BoardDetailUser6}`}>
                  <p className={styles.BoardReadP}>{formattedReleaseDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.BoardReadContent} d-flex justify-content-start`}>
              <div>{removeHtmlTags(boardDTO.content)}</div>
            </div>

          
            {boardDTO.email === userEmail ? (
            <div>
              <Link to={`/boardUpdate/${paramSeqBoard}`} className="btn btn-secondary">
                수정
              </Link>{' '}
              &nbsp;
              <button className="btn btn-secondary" onClick={onDeleteSuccess}>
                삭제
              </button>
            </div>
            ) : null }

            <div>
              {comments ? (
                <div>
                  {/* 댓글 목록 표시 */}
                  <div>
                    <div>
                      <div className={styles.BoardDetailCommentsEmail}>
                        {' '}
                        작성자 &nbsp; {comments.email} &nbsp; / &nbsp; 작성일 &nbsp;{' '}
                        {new Date(comments.releaseDate).toLocaleDateString('ko-KR')}
                      </div>{' '}
                      <br />
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default" style={{ color: 'teal' }}>
                          제목{' '}
                        </span>
                        <input
                          className={`form-control ${styles.BoardDetailCommentsTitle}`}
                          value={comments.title}
                          readOnly
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default" style={{ color: 'teal' }}>
                          내용{' '}
                        </span>
                        <input
                          className={`form-control ${styles.BoardDetailCommentsContent}`}
                          value={removeHtmlTags(comments.content)}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* 내용 입력란 */}
                  {/* ... */}
                  {storedUser && usergrade === 10 ? (
                  <BoardReply seqRefSeqBoard={boardDTO.seqBoard} />
                  ) : null }
                </div>
              )}
            </div>
          </div><br /><br />

          <div>
            <button className="btn btn-secondary" onClick={() => navigate('/BoardList/0')}>
              목록
            </button>{' '}
            &nbsp;
            <button className="btn btn-secondary" onClick={scrollToTop}>
              TOP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardDetail;
