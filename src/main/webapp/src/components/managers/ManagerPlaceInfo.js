import React, {useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Disp_topNav from './Disp_topNav';
import TextEditor from '../../TextEditor';
import axios from 'axios'


const ManagerPlaceInfo = () => {
    // ======================================== variables
    const {hotelSeq} = useParams()

    const session = JSON.parse(window.sessionStorage.getItem("user"))
    const [hotelDTO, setHotelDTO] = useState({
            
        name: '', subscribe: '', mainKeyword: '', seqHotelCategory: '',
        keyword: '', addr: '', ownerEmail: session.email,
        workinghour: '', holiday: '', placeEx: '', 
        facilities: '', alert: '', refund: '',
        coupon: false, TV: false, internet: false, 
        copy: false, whiteboard: false, mic: false, 
        cooking: false, food: false, alcohol: false,
        washing: false, parking: false, smoke: false,
        animal: false, pc: false,
        socket: false, open24: false, noHoliday: false, 
        restaurant: false, freeFood: false, locker: false,
        mailService: false, kitchen: false, waterFurifier: false, 
        catering: false, heater: false, airConditioner: false, // airconditional -> airconditioner
        fax: false, wareHouse: false, percelService: false, 
        privateToilet: false, fittingRoom: false, roofTop: false,
        rounge: false, mirror: false, bbq: false, doorlock: false

    })

    const {seqHotelCategory, holiday, ownerEmail} = hotelDTO

    const [whenOn, setWhenOn]  = useState({
        openTime: 0,
        closeTime: 24
    })

    const {openTime, closeTime} = whenOn

    const { daum } = window;

    // 231120 modified
    const [imageList, setImageList] = useState([])

    const [file, setFile] = useState('')

    const fileRef = useRef()

    // 수정 전용
    const [modifyBit, setModifyBit] = useState(false)
    // ======================================== functions 

    const insertData = (e) => { // input onchange
        let {name, value} = e.target
       
        setHotelDTO({
            ...hotelDTO, [name]: value
        })
    }

    const editorVal = (val) => {
        
        setHotelDTO({...hotelDTO, placeEx:val})
    }

    const settingHashTags = (e) => {
        let {value} = e.target
        const div = document.getElementById('addTags')
        if (value.includes(',')) {
            const newA = document.createElement('a');
            const hashtag = value.replace(',', '');
    
            newA.setAttribute('style', 'margin-left: 5px;');
            newA.innerHTML = '<span>#' + hashtag + '</span>';
            e.target.value = ''; 
            newA.addEventListener('click', () => {
                newA.style.display = 'none'
            });
            div.appendChild(newA);
        }
    }

    const insertTags = () => {
        let tags = document.getElementById('addTags').innerText
        tags = tags.replaceAll('#',',#')
        console.log(tags)
       setHotelDTO({...hotelDTO, keyword:tags})
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

    const addInput = (name, mininame) => {
        const newInput = document.createElement('input')
        newInput.setAttribute('type', 'text')
        newInput.setAttribute('name', name) 
        newInput.setAttribute('style', 'width:75%')
        newInput.addEventListener('change', () => {
            settingInputs(name)
        })
        
        const InputAddBtn = document.getElementById(mininame+'AddBtn')
    
        const br = document.createElement('br')
        InputAddBtn.after(br)
        br.after(newInput)

    }

    const settingInputs = (name) => {
        const inputInfo = document.getElementsByName(name)
        let val = "";
        console.log(inputInfo)
        inputInfo.forEach((eachTags) => {
            val += ","+eachTags.value
        })
        setHotelDTO({...hotelDTO, [name]:val})
    }
    
    const settingVals = () => { // 주소창 입력하려 눌렀을 때 해시태그, 이미지 확정
        insertTags()
    }

    const searchAddr = () => {
        settingVals()
        new daum.Postcode({
            oncomplete: function(data) {
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                document.getElementById("roadAddr").value = roadAddr;
            }
        }).open();
    }

    const settingAddr = (e) => {
        const {value} = e.target
        const detailAddr = value;
        const roadAddr = document.getElementById('roadAddr').value
        const entireAddr = roadAddr + " " + detailAddr
        setHotelDTO({...hotelDTO, addr: entireAddr})
    }

    const setBooleans = (e) => {
        let {name, checked} = e.target
        setHotelDTO({...hotelDTO, [name]:checked}) 
    }

    const setCate = (e) => {
        let {name, value, checked} = e.target
        const origin = value;
        // [TEST] // 
        console.log('name is : ' + name + ' value is : '+ value + ' checked is : '+checked)

        // 이미 지정된 값이 있다면 ? 쉼표를 추가해서 복수 값으로 만들고 : 지정된 값이 없다면 그냥 놔두기
        name === 'seqHotelCategory' ? seqHotelCategory!== '' ? value = seqHotelCategory+','+value : value = value : value = value

        name === 'holiday' ? holiday !== '' ? value = holiday + ',' + value : value = value : value = value

        // 체크된 상태라면 ? DTO 안에 값을 넣고 : 아니면(체크되어 있던 것을 해제한 경우) 빈 칸으로 대체하기
        checked === true ? setHotelDTO({ ...hotelDTO, [name]:value }) : setHotelDTO({ ... hotelDTO, [name]:value.replaceAll(origin, '')})
    }

    const settingOn = (e) => {
        let {name, value} = e.target
        setWhenOn({...whenOn, [name]:value})
    }

    const fixWorkTime = (e) => {
        let workingvalue = openTime+'~'+closeTime+'시'
        console.log(workingvalue)
        setHotelDTO({...hotelDTO, workinghour: workingvalue })
    }

        // modify action =========================================

    useEffect(() => {

        const elements = document.getElementsByClassName('DTOs');

        for (const element of elements) {
            element.disabled = false;
        }
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
        window.confirm('정말 플레이스를 삭제하시겠어요? \n룸도 함께 삭제되며, 삭제 후에는 취소할 수 없습니다.')
      }

      const isFinish = () => {
        setModifyBit(false)
        const elements = document.getElementsByClassName('DTOs');

        for (const element of elements) {
            element.disabled = true;
        }
      }

      const isCancel = () => {
        setModifyBit(false)
        const elements = document.getElementsByClassName('DTOs');

        for (const element of elements) {
            element.disabled = true;
        }
      }
    
    // ======================================== CSS
    const styleA = {fontSize: '1.2em', fontWeight: 'bold'} // style = {styleA}
    const styleB = {width: '75%'} // style = {styleB}
    const styleC = {fontSize: '0.8em', color: 'gray'}
    const styleD = {padding: '5px'}
    const styleE = {width: '7%'} 
    const styleF = {width: '175%' } // refund
    const styleH = {width: '60%'}   
    const styleI = {width: '50%'}
    const styleJ = {width: '20%'} // td 
    const styleK = {display: 'none'}


    // layout
    const styleZ = {marginLeft: '10%', marginTop: '1%', marginRight: '5%'}
    

    // ======================================== API / Test / etc
    const confirmVals = () => {
        console.log(hotelDTO)
    }

    const submitVals = () => {
        var formData = new FormData()
        formData.append('hotelDTO', new Blob([JSON.stringify(hotelDTO)], {type: 'application/json'}))

        Object.values(file).map((item, index) => {
            formData.append('img', item)
            return null;
        })

        console.log(formData)
       
        axios.post('http://localhost:8080/manager/addedPlace', formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }

        }).then(res=>{alert('플레이스 등록이 완료되었어요! 호실 등록으로 이동합니다.');  window.location.href = '/manager/addRoom/'+res.data
        }).catch(e => console.log(e))

    }




    return (
        <div>
            <Disp_topNav/>
            <div style = {styleZ}>
            <form>
                    <span style = {styleA}>플레이스 정보 상세보기</span>
                    <table>
                        <tbody>
                            <tr>
                                <td style = {styleJ}>내 이메일 주소</td>
                                <td>
                                <input type = 'text' readOnly name = 'ownerEmail' value = {ownerEmail} style = {styleI} className = 'DTOs'/>
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                <Button variant="outline-dark" type = 'button' onClick = {isModify} style = {{display: modifyBit && 'none'}} >수정</Button>        
                                <Button variant="outline-dark" type = 'button' onClick = {isDelete} style = {{display: modifyBit && 'none'}}>삭제</Button>
                                <Button variant="outline-dark" type = 'button' onClick = {isFinish} style = {{display: modifyBit || 'none'}} >완료</Button>        
                                <Button variant="outline-dark" type = 'button' onClick = {isCancel} style = {{display: modifyBit || 'none'}}>취소</Button>
                                </td>
                            </tr>
                            <tr>
                                <td>플레이스 이름&emsp;</td>
                                <td><input type = 'text'  style = {styleB} name = 'name' onChange = {insertData} className = 'DTOs'/></td>
                            </tr>
                            <tr>
                                <td>한 마디 소개</td>
                                <td><input type = 'text' style = {styleB} name = 'subscribe' onChange = {insertData} placeholder = '손님들에게 보여질 소개 멘트를 작성해 주세요.' className = 'DTOs'/></td>
                            </tr>
                            <tr>
                                <td>소개</td>
                                <td>
                                    <div>
                                    <TextEditor func = {editorVal} readOnly = {!modifyBit} />
                                    
                                    </div>
                                    <br/><br/>
                                </td>
                            </tr>
                            <tr>
                                <td>해시태그</td>
                                <td><input type = 'text' style = {styleB} name = 'keyword' placeholder='#'onChange = {settingHashTags} onBlur = {insertTags} className = 'DTOs'/>
                                    <div id = 'addTags'>
                                        
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>숙소 사진 {modifyBit && '등록'}</td>
                                <td>
                                    <input type = 'file' name = 'img[]' multiple = 'multiple' onChange = {settingImages} ref = {fileRef} style = {styleK}/>
                                    <Button variant="outline-dark" onClick = {findClk} style = {{display: modifyBit || 'none'}}>파일 찾아보기</Button> &nbsp;
                                    { // modifyBit 시 처리 필요 
                                        imageList.map((item, index) => <img key = {index} src = {item} style = {{width: '40px', height: '40px'}} alt = ''/>)
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>시설</td>
                                <td>
                                    <input type = 'text' style = {styleB} name = 'facilities' placeholder = '시설 소개를 작성해 주세요.' onChange = {insertData}  className = 'DTOs'/>
                                    <Button variant="outline-dark" type = 'button' id = 'facilAddBtn' onClick = {() => addInput('facilities', 'facil')}  style = {{display: modifyBit || 'none'}}>+</Button>
                    
                                    <br/>
                                </td>
                            </tr>
                            <tr>
                                <td>오시는 길</td>
                                <td><input type = 'text' style = {styleB} name = 'mainKeyword' placeholder = '가까운 지하철역 기준으로 작성해 주세요.' onChange = {insertData}  className = 'DTOs'/></td>
                            </tr>
                            <tr>
                                <td>주소</td>
                                <td>
                                    <div>
                                        <input type = 'text' readOnly  style = {styleH} id = 'roadAddr' className = 'DTOs' />
                                        &nbsp;
                                        <Button variant="outline-dark" type = 'button' onClick = {searchAddr} style = {{display: modifyBit || 'none'}}>주소 검색</Button>
                                        <br/><input type = 'text' style = {styleH} id = 'detailAddr' onChange = {settingAddr} placeholder = '상세주소 입력'  className = 'DTOs'/>
                                    
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>영업시간 & 휴무일</td>
                                <td>
                                    <input style = {styleE} type = 'number' name = 'openTime' onChange = {settingOn}  className = 'DTOs'/>시부터 <input style = {styleE} type = 'number' name =  'closeTime' onChange = {settingOn} onBlur = {fixWorkTime} className = 'DTOs'/>시까지
                                    <br/>
                                    <div>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '법정공휴일' onChange = {setCate}/>법정공휴일</label></td>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 일요일' onChange = {setCate}/>매주 일요일</label></td>
                                                    <td style = {styleD}> <label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 월요일' onChange = {setCate}/>매주 월요일</label></td>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 화요일' onChange = {setCate}/>매주 화요일</label></td>
                                                </tr>
                                                <tr>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 수요일' onChange = {setCate}/>매주 수요일</label></td>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 목요일' onChange = {setCate}/>매주 목요일</label></td>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 금요일' onChange = {setCate}/>매주 금요일</label></td>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 토요일' onChange = {setCate}/>매주 토요일</label></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                </td>
                            </tr>
                            <tr>
                                <td>유의사항</td>
                                <td>
                                    <input type = 'text' style = {styleB} name = 'alert' placeholder = '예약시 주의사항을 적어 주세요.' onChange = {insertData}  className = 'DTOs'/>
                                    <Button variant="outline-dark" type = 'button' id = 'alertAddBtn' onClick = {() => addInput('alert', 'alert')}  style = {{display: modifyBit || 'none'}}>+</Button>
                    
                                    <br/>
                                </td>
                            </tr>
                            <tr>
                                <td>쿠폰 가능 여부</td> 
                                <td><label><input type = 'checkbox' name = 'coupon' onChange = {setBooleans} />&nbsp; 체크하시면 이용자가 결제 시 쿠폰을 사용할 수 있습니다.</label></td>
                            </tr>
                            <tr>
                                <td>환불 정책</td>
                                <td><br/>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>이용 8일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' onChange = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 7일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' onChange = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 6일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' onChange = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 5일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' onChange = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 4일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' onChange = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 3일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' onChange = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 2일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' onChange = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 전날&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' onChange = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 당일&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' onChange = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan = '2'>장소 카테고리 선택하기<br/>
                                    <span style = {styleC}>최대 ? 개까지 선택할 수 있어요. <br/>선택하신 카테고리는 이용자가 장소를 찾기 위해 카테고리 기반 검색을 할 때 반영돼요.</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan = '2'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '01'/> 파티룸</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '02' /> 스터디룸</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '03'/>공연장</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '04'/>공유주방</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '05'/>촬영장</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '06'/>카페</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '07'/>연습실</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '08'/>컨퍼런스</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '09'/>강의실</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '10'/>운동시설</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '11'/>갤러리</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '12'/>공용 오피스</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '13'/>당일 캠핑</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '14'/>가정집</label></td>
                                                <td style = {styleD}><label></label></td>
                                                <td style = {styleD}><label></label></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan = '2'>편의시설 선택<br/>
                                    <span style = {styleC}>최대 ? 개까지 선택할 수 있어요. <br/>선택하신 편의시설은 이용자가 장소를 찾기 위해 편의시설 기반 검색을 할 때 반영돼요.</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan = '2'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'TV' onChange = {setBooleans}/>TV/프로젝터</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'internet' onChange = {setBooleans}/>인터넷/WIFI</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'copy' onChange = {setBooleans}/>프린터기</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'whiteboard' onChange = {setBooleans}/>화이트보드</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'mic' onChange = {setBooleans}/>음향/마이크</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'cooking' onChange = {setBooleans}/>취사가능</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'food' onChange = {setBooleans}/>음식물반입가능</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'alcohol' onChange = {setBooleans}/>주류반입가능</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'washing' onChange = {setBooleans}/>샤워시설</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'parking' onChange = {setBooleans}/>주차가능</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'smoke' onChange = {setBooleans}/>흡연가능</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'animal' onChange = {setBooleans}/>반려동물동반</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'pc' onChange = {setBooleans}/>PC</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'socket' onChange = {setBooleans}/>콘센트</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'open24' onChange = {setBooleans}/>24시 운영</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'noHoliday' onChange = {setBooleans}/>연중무휴</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'restaurant' onChange = {setBooleans}/>식당 및 카페</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'freeFood' onChange = {setBooleans}/>다과 및 음료</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'locker' onChange = {setBooleans}/>개인사물함</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'mailService' onChange = {setBooleans}/>메일 서비스</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'kitchen' onChange = {setBooleans}/>주방</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'waterFurifier' onChange = {setBooleans}/>정수기</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'catering' onChange = {setBooleans}/>케이터링</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'heater' onChange = {setBooleans}/>난방</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'airConditioner' onChange = {setBooleans}/>에어컨</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'fax' onChange = {setBooleans}/>팩스</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'wareHouse' onChange = {setBooleans}/>창고서비스</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'percelService' onChange = {setBooleans}/>택배서비스</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'privateToilet' onChange = {setBooleans}/>내부화장실</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'fittingRoom' onChange = {setBooleans}/>탈의실</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'roofTop' onChange = {setBooleans}/>루프탑/테라스</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'rounge' onChange = {setBooleans}/>라운지</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'mirror' onChange = {setBooleans}/>전신거울</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'bbq' onChange = {setBooleans}/>바베큐</label></td>
                                                <td style = {styleD} rowSpan = '2'><label><input type = 'checkbox' className = 'DTOs' name = 'doorlock' onChange = {setBooleans}/>도어락</label></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            
                        </tbody>
                        
                    </table>
                            <br/>
                            
                    <Button variant="outline-dark" type = 'button' onClick = {confirmVals} style = {{ display: modifyBit || 'none' }}>DTO 값 확인하기</Button>&nbsp;
                    
                </form>
            </div>
        </div>
    );
};

export default ManagerPlaceInfo;