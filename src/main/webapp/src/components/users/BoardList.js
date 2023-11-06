import React from 'react';
import '../../css/BoardList.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const BoardList = () => {
    return(
    <div className='container'>
        <div>
        <div>
            <h1>seq카테고리</h1>
        </div>
        <div className='secondArea'>
        <Row md={1}>
            <Col className="d-flex justify-content-end ">
            <div className='noticeHide'>
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
            <select className='BoardListSelect'>
            <option>10개씩</option>
            <option>15개씩</option>
            <option>20개씩</option>
            <option>25개씩</option>
            <option>30개씩</option>
            <option>50개씩</option>
            </select>
            </div>
            </Col>
            </Row>
        </div>
        <div>
            
            <table className='table '>
            <thead>
                <tr className=''>
                <th scope="col">글번호</th>
                <th scope="col">제목</th>
                <th scope="col">이메일</th>
                <th scope="col">등록일</th>
                </tr>
            </thead>
            <tbody>
                <tr className=''>
                <td>1</td>
                <td>첫번째 게시글입니다.</td>
                <td>aaaaaa@aaaa.com</td>
                <td>2020-10-25</td>
                </tr>
                
            </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <button className='BoardListWriteButton'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>글쓰기</button>
            </div>
        </div>
        <div className='text-center'>
        <div>
            <Row>

            <div className='BoardListPaging'>
                <div>
                    <Col>
                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        &lt;<button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingPN">이전</button>
                        <button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingButton">1</button>
                        <button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingButton">2</button>
                        <button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingButton">3</button>
                        <button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingButton">4</button>
                        <button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingButton">5</button>
                        <button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingButton">6</button>
                        <button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingButton">7</button>
                        <button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingButton">8</button>
                        <button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingButton">9</button>
                        <button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingButton">10</button>
                        <button type="button" class="btn btn--bs-light-bg-subtle BoardListPagingPN">다음</button>&gt; 
                    </div>
                    </Col>
                </div>
            </div>

            </Row>
            
            <div className='BoardListFooter'>
                <div className='BoardListFooter1'>
            <Row>
                <Col md={3}>
                <div className='BoardListFooter2'>
                    <select className="form-select BoardListSelect">
                        <option>전체기간</option>
                        <option>1일</option>
                        <option>1주</option>
                        <option>1개월</option>
                        <option>6개월</option>
                        <option>1년</option>
                    </select>
                </div>
                </Col>
                <Col md={3}>
                <div className='BoardListFooter2'>
                    <select className="form-select BoardListSelect">
                        <option>제목만</option>
                        <option>글작성자</option>
                        <option>댓글내용</option>
                        <option>댓글작성자</option>
                    </select>
                </div>
                </Col>
                <Col md={6}>
                <div class="input-group mb-3 BoardListInput">
                    <input type="text" className="form-control BoardListInput" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn btn-success BoardListButton" type="button" id="button-addon2">검색</button>
                </div>
                </Col>
            </Row>
                </div>
            </div>
           
        </div>
        </div>
        </div>
  </div>
    );
};

export default BoardList;