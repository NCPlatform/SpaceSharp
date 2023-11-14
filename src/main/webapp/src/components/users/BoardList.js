import React, { useEffect, useState } from 'react';
import styles from '../../css/BoardList.module.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BoardList = () => {

    const { page } = useParams()

    const [list, setList] = useState([])
    const [pagingArray, setPagingArray] = useState([])

    const [pageSize, setPageSize] = useState('10');

    const handlePageSizeChange = (e) => {
        setPageSize(e.target.value)
    };


    const[boardDTO, setBoardDTO] = useState(
        {
            "seqBoard": '',
            "seqBoardCategory" : 7,
            "title" : '',
            "content" : '',
            "seqRefSeqBoard" : 0,
            "email" : 'user',
            "releaseDate" : ''
        }
    )

    const { seqBoard, seqBoardCategory, title, seqRefSeqBoard, email, release } = boardDTO

        useEffect(() => {
            axios.get(`/user/list?page=${page}&size=${pageSize}`)
                 .then(res => {
                    setList(res.data.content)

                    setPagingArray(Array.from({ length: res.data.totalPages }, (_, index) => index + 1))
                 })
                 .catch(error => console.log(error))
        }, [page, pageSize])

       
    return(
    <div className='container'>
        <div>
        <div>
            <h1>{boardDTO.seqBoardCategory}</h1>
        </div>
        <div className={styles.secondArea}>
        <Row md={1}>
            <Col className='d-flex justify-content-end '>
            <div className={styles.noticeHide}>
                <label>
                <input type='checkbox' />
                공지 숨기기
                </label>
            </div>
            <div>
            <a href="/ArticleList.nhn?search.clubid=15057835&amp;search.menuid=2&amp;search.boardtype=C" onclick="clickcr(this, 'btp.wzine', '', '', event);" className="sort_card icorn">
            <span className="blind"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-view-stacked" viewBox="0 0 16 16">
            <path d="M3 0h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3zm0 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3z"/>
            </svg> </span>
            </a>&nbsp;
            <a href="/ArticleList.nhn?search.clubid=15057835&amp;search.menuid=2&amp;search.boardtype=I" onclick="clickcr(this, 'btp.album', '', '', event);" className="sort_album icorn">
            <span className="blind"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-ui-checks-grid" viewBox="0 0 16 16">
            <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z"/>
            </svg> </span>
            </a>&nbsp;
            <a href="/ArticleList.nhn?search.clubid=15057835&amp;search.menuid=2&amp;search.boardtype=L" onclick="clickcr(this, 'btp.board', '', '', event);" className="sort_list  is_selected icorn">
            <span className="blind"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-ui-checks" viewBox="0 0 16 16">
            <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
            </svg></span>
            </a>
            </div>
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
        <div className='container'>
            <div>
            <table className={styles.table}>
            <thead>
                <tr className=''>
                    <th className={styles.BoardListTh1}>글번호</th>
                    <th className={styles.BoardListTh2}>제목</th>
                    <th className={styles.BoardListTh3}>이메일</th>
                    <th className={styles.BoardListTh4}>등록일</th>
                    <th className={styles.BoardListTh5} style={{ visibility:'hidden' }}>seqRefSeqBoard</th>
                </tr>
            </thead>
            <tbody>
                {
                    list && list.map(item => {
                        const releaseDate = new Date(item.releaseDate);
                        const formattedReleaseDate = releaseDate.toLocaleDateString('ko-KR');
                
                        return(
                            <tr key={ item.seqBoard }>
                                <td>{ item.seqBoard }</td>
                                <td><Link className={styles.BoardListTitle } to={`/boardDetail/${item.seqBoard}`}>{ item.title }</Link></td>
                                <td>{ item.email }</td>
                                <td>{ formattedReleaseDate }</td>
                                <td style={{ visibility:'hidden' }}>{ item.seqRefSeqBoard }</td>
                            </tr>
                            
                
                )       
            })  
        }
            </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <Link to="/boardWrite" >
                    <button className={styles.BoardListWriteButton}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>글쓰기</button>
                </Link>
            </div>
            </div>
        </div>
        <div className='text-center'>
        <div>
            <Row>

            <div className={styles.BoardListPaging}>
                <div>
                    <Col>
                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <p style={{ width: '650px', textAlign: 'center'}}>
                        {
                            pagingArray.map(item => 
                            <span key={item}>
                                {/* page는 useParams()으로 받은 객체라서 parseInt() 사용 */}
                                <Link id={ (item -1) === parseInt(page) ? styles.currentPaging : styles.paging } to = { `/BoardList/${item-1}` }>{item}</Link>
                            </span>)
                        }
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