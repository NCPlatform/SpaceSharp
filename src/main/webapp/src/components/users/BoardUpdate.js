import React, { useEffect, useState } from 'react';
import styles from '../../css/BoardUpdate.module.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import Swal from "sweetalert2";
import { Navigate } from 'react-router-dom';


const BoardUpdate = () => {

    const { paramSeqBoard } = useParams();

    const [titleDiv, setTitleDiv] = useState('')
    const [contentDiv, setContentDiv] = useState('')


    const[boardDTO, setBoardDTO] = useState(
        {
            "seqBoard": 0,
            "seqBoardCategory" : 7,
            "title" : '',
            "content" : '',
            "seqRefSeqBoard" : 0,
            "email" : 'user',
            "releaseDate" : ''
        }
    )

    const navigate = useNavigate()
    const [reset, setReset] = useState(false)

    const onChange = (e) => {
        setBoardDTO({ ...boardDTO, [e.target.name] : e.target.value } )
        //console.log(e)
    }

    const onUpdateSuccess = (e) => {
        e.preventDefault()

        var sw = 1
        if(!title) {
            setTitleDiv('제목 입력')
            sw = 0
        }
        if(!content) {
            setContentDiv('내용 입력')
            sw = 0
        }
        if(sw === 1){

         axios.put('/user/update', null, {params:boardDTO})
              .then(res => {
                 Swal.fire({
                     title: '게시글이 수정되었습니다.',
                     imageUrl: 'https://item.kakaocdn.net/do/d640911d600b52c55d356740537ae9569f5287469802eca457586a25a096fd31',
                     imageWidth: 300,
                     imageHeight: 200,
                     imageAlt: '구데타마',
                   })
                   navigate('/BoardList/0');
              })
              .catch( error=> console.log(error) )
            }
        }

        const onDeleteSuccess = (e) => {
            e.preventDefault()

            console.log(boardDTO)

            axios.post(`/user/delete`, null, {params:boardDTO})
                 .then(res => {
                    Swal.fire({
                        title: '게시글이 삭제되었습니다.',
                        imageUrl: 'https://item.kakaocdn.net/do/d640911d600b52c55d356740537ae9569f5287469802eca457586a25a096fd31',
                        imageWidth: 300,
                        imageHeight: 200,
                        imageAlt: '구데타마',
                      })
                      navigate('/BoardList/0');
                 })
                 .catch(error => console.log(error))
        }
     
        var modules = {
            toolbar: [
              [{ size: ["small", false, "large", "huge"] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
              ],
              [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
            ]
          };
        
          var formats = [
            "header", "height", "bold", "italic",
            "underline", "strike", "blockquote",
            "list", "color", "bullet", "indent",
            "link", "image", "align", "size",
          ];
        
          const handleProcedureContentChange = (content) => {
            // console.log("content---->", content);
            setBoardDTO({...boardDTO, content: content })
          };

          const onReset = (e) => {
            setReset(!reset)
         }

    useEffect(() => {
        axios.get(`/user/getBoard?seqBoard=${paramSeqBoard}`)
            .then(response => {
                console.log('API Response:', response.data);
                setBoardDTO(response.data);
            })
            .catch(error => console.error('Error:', error));
    }, [paramSeqBoard, reset]);

    const { title, content, seqBoard, seqBoardCategory, seqRefSeqBoard, email, release } = boardDTO


    return (
        <div className='container'>
            <div>
                <div className={styles.BoardWriteHeader}>
                    <div className='d-flex justify-content-between'>
                        <h3 className={styles.textStart}> 게시판 수정하기 </h3>
                        
                        <div className={styles.BoardWriteHeaderButton}>
                            <button className="btn btn-success" onClick={ onUpdateSuccess }>수정</button>
                            <button className="btn btn-success" onClick={ onDeleteSuccess }>삭제</button>
                            <button className="btn btn-success" onClick={ () => navigate('/BoardList/0') }>목록</button> &emsp;
                            <button className="btn btn-success" onClick={ onReset }>취소</button>
                        </div>
                    </div>
                </div>
                <div className={styles.BoardWriteBody}>
                    <div className={styles.BoardWriteTitle}>
                       
                        <input type='text'  className="form-control" name='title' value={ boardDTO.title } onChange={ onChange } maxLength={50} placeholder='제목을 입력해주세요.' />
                        <div id='titleDiv'>{titleDiv}</div>
                    </div>
                    <div className={styles.BoardWirteContent}>
                   
                            <ReactQuill
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            placeholder='내용을 입력해주세요.'
                            onChange={handleProcedureContentChange}
                            value={ boardDTO.content }
                            className='form-control'
                            style={{ height: "400px" }}
                            >

                            </ReactQuill>
                        {/* <textarea className="form-control" name='content' value={ boardDTO.content } onChange={ onChange } placeholder='내용을 입력해주세요.'  rows={30} /> */}

                        <div id={styles.contentDiv}>{contentDiv}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardUpdate;