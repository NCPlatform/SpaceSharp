import React, { useState } from 'react';
import css from '../../css/BoardWrite.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const BoardWrite = () => {

    const[boardDTO, setBoardDTO] = useState(
        {
            "seqBoardCategory" : '3',
            "title" : '',
            "content" : '',
            "seqRefSeqBoard" : '',
            "email" : 'user',
            "release" : ''
        }
    )

    const { title, content } = boardDTO

    const[titleDiv, setTitleDiv] = useState('')
    const[contentDiv, setContentDiv] = useState('')

    const onChange = (e) => {
        setBoardDTO({ ...boardDTO, [e.target.name] : e.target.value } )
        console.log(e)
    }

    const board = [
        {
            "seqBoardCategory" : '3',
            "title" : '아무거나',
            "content" : '비어있지 않음',
            "seqBoardCategory" : '',
            "email" : 'user',
            "release" : '2023-11-03'
        }
    ];
        
        const onWriteSuccess = () => {

           var sw = 1
           
           if(!title) {
            setTitleDiv('제목을 입력하세요')
            sw = 0
           }
           else if(!content) {
            setTitleDiv('')
            setContentDiv('내용을 입력하세요')
            sw = 0
           }
           else {
            
            setContentDiv('');
            console.log(boardDTO)
           }
        }
        
        
    return (
        <div className='container'>
            <div>
                <div className='BoardWriteHeader '>
                    <div className='d-flex justify-content-between'>
                        <h3 className='text-start'> 게시판 글쓰기 </h3>
                        
                        <div className='BoardWriteHeaderButton'>
                            <button className="btn btn-success" onClick={ onWriteSuccess }>등록</button>
                        </div>
                    </div>
                </div>
                <div className='BoardWriteBody'>
                    <div className='BoardWriteTitle'>
                        <input type='text'  className="form-control" name='title' value={ boardDTO.title } onChange={ onChange } maxLength={50} placeholder='제목을 입력해주세요.' />
                        <div id='titleDiv'>{ titleDiv }</div>
                    </div>
                    <div className='BoardWirteContent'>
                        <textarea className="form-control" name='content' value={ boardDTO.content } onChange={ onChange } placeholder='내용을 입력해주세요.'  rows={30} />
                        <div id='contentDiv'>{ contentDiv }</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardWrite;