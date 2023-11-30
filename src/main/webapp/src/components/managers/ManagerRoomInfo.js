import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddFinishModal from './AddFinishModal';
import TextEditor from '../../TextEditor';
import Button from 'react-bootstrap/Button';
import Disp_topNav from './Disp_topNav';


const ManagerRoomInfo = () => {
    // useState & variables ==========================================
    
        const {roomSeq} = useParams()

        const [roomDTO, setRoomDTO] = useState({
            seqHotel: '', //<< 이 값은 추후 hotelSeq로 줄 것
            name: '', 
            price: 0, normalExplain: '',
            placeSize: '', people: '', datetime: '', // << 최소 예약 시간
            reserveRule: ''
        })

        const {normalExplain, name, price, placeSize, people, datetime, reserveRule} = roomDTO


        const [retrieveDTO, setRetrieveDTO] = useState({
            seqHotel: '', //<< 이 값은 추후 hotelSeq로 줄 것
            name: '', 
            price: 0, normalExplain: '',
            placeSize: '', people: '', datetime: '', // << 최소 예약 시간
            reserveRule: ''
        })

        const [imageList, setImageList] = useState([])

        const [file, setFile] = useState('')

        const [isMeter, setIsMeter] = useState(true)

        const [isFinished, setIsFinished] = useState(false)

        const fileRef = useRef()
        
        const [modifyBit, setModifyBit] = useState(false)

        const [isReady, setIsReady] = useState(false) // TextEditor 컴포넌트 로드


    // functions =====================================================

        const insertData = (e) => { // input onChange
            let {name, value} = e.target
            
            setRoomDTO({
                ...roomDTO, [name]: value
            })
        }

        const editorVal = (val) => {
            setRoomDTO({...roomDTO, normalExplain:val})
        }
        
        const findClk = (e) => {
            fileRef.current.click()
        }

        const settingImages = (e) => {
            const imageFiles = Array.from(e.target.files)
            let imgArray = []

            imageFiles.map(item => {
                const objectURL = URL.createObjectURL(item)
                imgArray.push(objectURL)

                return null;
            })

            setImageList(imgArray)
            setFile(e.target.files)

        }

        const settingPeople = () => {
            let people = '최소 '
            var min = document.getElementById('min')
            people += min.value + '명 ~ 최대 '
            var max = document.getElementById('max')
            people += max.value + '명'
            console.log(people)

            setRoomDTO({...roomDTO, people:people})
        }

        const convertMeter = (e) => {
            setIsMeter(!isMeter)
        }

        const setSize = (e) => {
            let {value} = e.target
            isMeter === false ? value *= 3.05785 : value = value
            value = Math.round(value * 100) / 100;
            value += 'm2'
            setRoomDTO({...roomDTO, placeSize:value})
        }

    // MODIFY ACTION ================================================

    useEffect(() => {
        const elements = document.getElementsByClassName('DTOs');

        for (const element of elements) {
            element.disabled = modifyBit === true ? false : true
        }

        axios.post('http://localhost:8080/manager/viewRoomInfo', null, {
            params: {
                seq: roomSeq
            }
        }).then(res => {setRoomDTO(res.data)
                        setRetrieveDTO(res.data)
                        setIsReady(true)

                        }).catch(e => console.log(e))

       
    },[])

    const settingModifyBit = () => {
        setModifyBit(true)
    }
    const isModify = () => {
        setModifyBit(true)
        settingModifyBit()
        const elements = document.getElementsByClassName('DTOs');

        for (const element of elements) {
            element.disabled = false;
        }

        
      }

      const isDelete = () => {
        window.confirm('정말 플레이스를 삭제하시겠어요? \n룸도 함께 삭제되며, 삭제 후에는 취소할 수 없습니다.') && 
            axios.post('http://localhost:8080/manager/deleteRoom', null, {
                params: {
                    seq: roomSeq
                }
            }).then(() => {window.alert('플레이스 삭제가 완료되었습니다.'); window.location.href = '/manager/myplace'}).catch((e) => console.log(e))
      }

      const isFinish = () => {
        setModifyBit(false)
        const elements = document.getElementsByClassName('DTOs');

        for (const element of elements) {
            element.disabled = true;
        }
        submitVals()
      }

      const isCancel = () => {
        console.log('취소 눌렀음')
        setRoomDTO(retrieveDTO)
        setImageList([])
        setModifyBit(false)
        const elements = document.getElementsByClassName('DTOs');

        for (const element of elements) {
            element.disabled = true;
        }
      }



    // CSS ===========================================================

        const styleA = {fontSize: '1.2em', fontWeight: 'bold'} // style = {styleA}
        const styleB = {width: '60%'} // style = {styleB}
        const styleC = {width: '15%'} // style = {styleC}
        const styleD = {width: '25%'}
        const styleE = {display: 'none'}
       

        // layout 관련
        const styleZ = {marginLeft: '10%', marginTop: '3%'}

    // API, etc ======================================================
        
        const confirmVals = () => {
            console.log(roomDTO)
        }

        const submitVals = () => {
            var formData = new FormData()
            formData.append('roomDTO', new Blob([JSON.stringify(roomDTO)], {type: 'application/json'}))
            
            Object.values(file).map((item, index) => {
                formData.append('img', item)
                return null;
            })

            axios.post('http://localhost:8080/manager/addedRoom', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then( 
                setIsFinished(true)
            ).catch(e => console.log(e))
        }
    // NOTE ========================================================== 231115 ~ 추가중
        /*

          1. 이 단계에서 중요한 작업 
            1) URL이 /addRoom/:roomSeq로 구성되어 있는 만큼 권한이 없는 접근을 차단할 필요가 있음
                => hotelSeq의 ownerEmail과 세션의 ownerEmail이 일치하지 않으면 alert(권한이 없습니다.) 후 쫓아내기
                => 리다이렉트 이용한 쫓아내기 고려 중 (redirect: /manager/noAuth 혹은 매니저 페이지 메인)
        
          2. people(수용 가능 인원) 작업 시 최소 ~ 최대 미리 지정해 두고 input 두 개 넣어서 DTO 만들기
            ex) <td> 최소 <input type = 'number'> ~ 최대 <input type = 'number'> 명까지 수용 가능</td> (완료)

          3. 면적 등록 시 n평 / n제곱미터 변환 기능 구현 (완료)

          4. 룸 등록 완료 후 선택 창 모달 띄우기 > 메인으로 가기 / 숙소 관리로 이동하기 / 새로운 룸 추가하기

        */
    return (
        <div>
            <Disp_topNav/>
            <div id = 'disp' style = {styleZ}>
                <form>
                    <span style = {styleA}>룸 정보 상세보기</span>
                    <table>
                        <tbody>
                            <tr>
                                <td>룸 이름</td>
                                <td>
                                    <input type = 'text'  style = {styleB} name = 'name' value = {name} onChange = {insertData} className = 'DTOs'/>
                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                    <Button variant="outline-dark" type = 'button' onClick = {isModify} style = {{display: modifyBit && 'none'}} >수정</Button>        
                                    <Button variant="outline-dark" type = 'button' onClick = {isDelete} style = {{display: modifyBit && 'none'}}>삭제</Button>
                                    <Button variant="outline-dark" type = 'button' onClick = {isFinish} style = {{display: modifyBit || 'none'}} >완료</Button>        
                                    <Button variant="outline-dark" type = 'button' onClick = {isCancel} style = {{display: modifyBit || 'none'}}>취소</Button>
                                </td>
                            </tr>
                            <tr>
                                <td>룸 소개</td>
                                <td>
                                    <div>
                                    <TextEditor func = {editorVal} readOnly = {!modifyBit} texthold = 'normalExplain' value = {normalExplain}/>
                                    </div>
                                    <br/><br/>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>룸 사진 등록</td>
                                <td>
                                    <input type = 'file' name = 'img[]' multiple = 'multiple' onChange = {settingImages} ref = {fileRef} style = {styleE}/>
                                    <Button variant="outline-dark" onClick = {findClk} >파일 찾아보기</Button> &nbsp;
                                    
                                    {
                                        imageList.map((item, index) => <img key = {index} src = {item} style = {{width: '40px', height: '40px'}} alt = ''/>)
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>수용 가능 인원</td>
                                <td>
                                    <div style = {styleB} id = 'peopleMinMax'>
                                        <input type = 'number' id = 'min' style = {styleC}/>명부터 <input type = 'number' id = 'max' style = {styleC} onBlur = {settingPeople}/>명까지
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>룸 면적</td>
                                <td>
                                    <div>
                                        <input type = 'number' style = {styleD} placeholder = '숫자만 입력' onBlur = {setSize}/>&nbsp;{
                                            isMeter === true ? '제곱미터' : '평'
                                        }&nbsp;<Button variant="outline-dark" type = 'button' onClick = {convertMeter}>{
                                            isMeter === true ? '평수로 입력하기' : '제곱미터로 입력하기'
                                        }</Button> 
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>장소 대여료</td>
                                <td><input type = 'number' style = {styleB} name = 'price' placeholder = '시간당 대여료를 입력해 주세요.' onChange = {insertData}/></td>
                            </tr>
                            
                            <tr>
                                <td>최소 대여 가능 시간&emsp;</td>
                                <td><input type = 'number' style = {styleB} name = 'datetime' placeholder = '숫자만 입력 가능합니다.' onChange = {insertData}/></td>
                            </tr>

                            <tr>
                                <td>총 예약인원</td>
                                <td><input type = 'text' style = {styleB} name = 'reserveRule' onChange = {insertData} placeholder = '이용 인원 관련 규칙을 작성해 주세요.'/></td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <Button variant="outline-dark" type = 'button' onClick = {confirmVals}>DTO 값 확인하기</Button>&nbsp;
                    {
                        isFinished && <AddFinishModal value = {roomSeq}/>
                    }
                </form>
            </div>
        </div>
    );
};

export default ManagerRoomInfo;