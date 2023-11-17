import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import styles from '../../css/BoardWrite.module.css';

const BoardReply = ( {seqRefSeqBoard} ) => {

    const [commentContent, setCommentContent] = useState('');
    const [commentEmail, setCommentEmail] = useState('');
    const [commentTitle, setCommentTitle] = useState('');

    const[boardDTO, setBoardDTO] = useState(
        {
            "seqBoardCategory" : 7,
            "title" : '',
            "content" : '',
            "seqRefSeqBoard" : seqRefSeqBoard,
            "email" : 'user'
        }
    )

    useEffect(()=>{
        setBoardDTO({...boardDTO, "seqRefSeqBoard" : seqRefSeqBoard})
    },[seqRefSeqBoard])

    const { title, content } = boardDTO

    const Navigate = useNavigate()

    const[titleDiv, setTitleDiv] = useState('')
    const[contentDiv, setContentDiv] = useState('')

    const onChange = (e) => {
        setBoardDTO({ ...boardDTO, [e.target.name] : e.target.value } )
        console.log(boardDTO)
    }

    const handleCommentSubmit = () => {
        axios.post('/user/writeReply', {
          content: commentContent,
          seqRefSeqBoard: seqRefSeqBoard,
          email: commentEmail,
          title: commentTitle
        })
        .then(response => {
          console.log(response.data); // 서버에서의 응답을 처리
          // 댓글 작성 후 필요한 동작을 수행할 수 있습니다.
        })
        .catch(error => {
          console.error('Error adding comment:', error);
        });
      };
        
        const onWriteSuccess = () => {


           if(!title) {
            setTitleDiv('제목을 입력하세요')
           }
           else if(!content) {
            setTitleDiv('')
            setContentDiv('내용을 입력하세요')
           }
           else {
            console.log(boardDTO);
            setContentDiv('');

            axios.post('/user/writeReply', null, {params:boardDTO})
                 .then(res => {
                    Swal.fire({
                        title: '게시글이 등록되었습니다.',
                        imageUrl: 'https://item.kakaocdn.net/do/d640911d600b52c55d356740537ae9569f5287469802eca457586a25a096fd31',
                        imageWidth: 300,
                        imageHeight: 200,
                        imageAlt: '구데타마',
                      })
                      Navigate('/BoardList/0');
                 })
                 .catch( error=> console.log(error) )
           }
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
        

    return (
        <div className='container'>
            <div>
                <div className={styles.BoardWriteHeader}>
                    <div className='d-flex justify-content-between'>
                        <h3 className={styles.textStart}> 답글 </h3>
                        
                        
                    </div>
                </div>
                <div className={styles.BoardWriteBody} >
                    <div className={styles.BoardWriteTitle}>
                       
                        <input type='text'  className="form-control" name='title' value={title} onChange={ onChange } maxLength={50} placeholder='제목을 입력해주세요.' />
                        <div id='titleDiv'>{ titleDiv }</div>
                    </div>
                    <div className={styles.BoardWirteContent} >
                   
                            <ReactQuill
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            placeholder='내용을 입력해주세요.'
                            onChange={handleProcedureContentChange}
                            value={content}
                            className='form-control'
                            style={{ height: "100px" }}
                            >

                            </ReactQuill>
                        {/* <textarea className="form-control" name='content' value={ boardDTO.content } onChange={ onChange } placeholder='내용을 입력해주세요.'  rows={30} /> */}
                        <div id={styles.contentDiv}>{ contentDiv }</div>
                    </div>
                       
                </div>
            </div>
                        <div>
                            <button className={`btn btn-success ${styles.overlayButton}`} onClick={ onWriteSuccess }>등록</button>
                        </div>
        </div>
    );
};

export default BoardReply;
