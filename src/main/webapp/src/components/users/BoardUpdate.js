import React from 'react';
import css from '../../css/BoardUpdate.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


const BoardUpdate = () => {
    return (
        <div className='container'>
            <div>
                <div className='BoardUpdateHeader '>
                    <div className='d-flex justify-content-between'>
                        <h3 className='text-start'> 게시판 글쓰기 </h3>
                        
                        <div className='BoardUpdateHeaderButton'>
                            <button className="btn btn-success">등록</button>
                        </div>
                    </div>
                </div>
                <div className='BoardUpdateBody'>
                    <div className='BoardUpdateTitle'>
                        <input type='text'  className="form-control" maxLength={50} placeholder='제목을 입력해주세요.' />
                    </div>
                    <div className='BoardUpdateContent'>
                        <textarea className="form-control" placeholder='내용을 입력해주세요.'  rows={30} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardUpdate;