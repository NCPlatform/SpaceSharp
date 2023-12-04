import React, {useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Disp_topNav from './Disp_topNav';
import TextEditor from '../../TextEditor';
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel';


const ManagerPlaceInfo = () => {
    // ======================================== variables
    const {hotelSeq} = useParams()

    const session = JSON.parse(window.sessionStorage.getItem("user"))
    const [hotelDTO, setHotelDTO] = useState({
            
        name: '', subscribe: '', mainKeyword: '', seqHotelCategory: '',
        seqHotel: hotelSeq, img: '',
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
    

    const {name, subscribe, mainKeyword, seqHotelCategory, keyword, addr, workinghour, holiday,
            placeEx, facilities, alert, refund, coupon, TV, internet, copy, whiteboard, mic,
            cooking, food, alcohol, washing, parking, smoke, animal, pc, socket, open24, noHoliday,
            restaurant, freeFood, locker, mailService, kitchen, waterFurifier, catering, heater,
            airConditioner, fax, wareHouse, percelService, privateToilet, fittingRoom, roofTop,
            rounge, mirror, bbq, doorlock, ownerEmail, img} = hotelDTO

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

    const [isReady, setIsReady] = useState(false) // TextEditor 컴포넌트 로드


    // ======================================== functions 

    const insertData = (e) => { // input onchange
        let {name, value} = e.target
       
        setHotelDTO({
            ...hotelDTO, [name]: value
        })
    }

    const editorVal_placeEx = (val) => {
        
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

    const settingInputs = (name) => {
        const inputInfo = document.getElementsByName(name)
        let val = "";
        console.log(inputInfo)
        inputInfo.forEach((eachTags) => {
            val += ","+eachTags.value
        })
        setHotelDTO({...hotelDTO, [name]:val})
    }

    const searchAddr = () => {
        
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
        console.log('EFFECT 발동')
        const elements = document.getElementsByClassName('DTOs');

        for (const element of elements) {
            element.disabled = modifyBit === true ? false : true
           // console.log(element.name)
        }

        axios.post('http://localhost:8080/manager/viewPlaceInfo', null, {
            params: {
                seq: hotelSeq
            }
        }).then(res => {setHotelDTO(res.data)
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
            axios.post('http://localhost:8080/manager/deletePlace', null, {
                params: {
                    seqHotel: hotelSeq
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
       window.location.reload()
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
        

        // imageList.length가 0이면(사진이 수정되지 않았다면) 다른 링크로 보내야 한다.
        // (multipartFile을 파라메터로 요구하지 않는 메서드로 DTO만 보내야 함)

        if(imageList.length === 0){

            var formData = new FormData()
            formData.append('hotelDTO', new Blob([JSON.stringify(hotelDTO)], {type: 'application/json'}))

            axios.post('http://localhost:8080/manager/addedPlaceWithoutImage', formData, {
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
                
            }).then(res => {window.alert('플레이스 수정이 완료되었어요!'); window.location.href = '/manager/myplace'}).catch(e => console.log(e))
        }

        else{
            var formData = new FormData()
            formData.append('hotelDTO', new Blob([JSON.stringify(hotelDTO)], {type: 'application/json'}))

            Object.values(file).map((item, index) => {
                formData.append('img', item)
                return null;
            })
            console.log(formData)
            // JPA에서 save 메서드를 쓰기 때문에 수정과 등록이 똑같은 주소로 가능하다.
            axios.post('http://localhost:8080/manager/addedPlace', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }

            }).then(res=>{window.alert('플레이스 수정이 완료되었어요!');  window.location.href = '/manager/myplace'
            }).catch(e => console.log(e))
        }
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
                                <td>
                                    
                                    <input type = 'text'  style = {styleB} name = 'name' onChange = {insertData} value = {name} className = 'DTOs'/>
                                    
                                </td>
                            </tr>
                            <tr>
                                <td>한 마디 소개</td>
                                <td><input type = 'text' style = {styleB} name = 'subscribe' onChange = {insertData} value = {subscribe} placeholder = '손님들에게 보여질 소개 멘트를 작성해 주세요.' className = 'DTOs'/></td>
                            </tr>
                            <tr>
                                <td>소개</td>
                                <td>
                                    <div>
                                        {
                                            isReady === true &&
                                            <TextEditor func = {editorVal_placeEx} readOnly = {!modifyBit} texthold = 'placeEx' value = {placeEx} />
                                        
                                        }
                                    
                                    </div>
                                    <br/><br/>
                                </td>
                            </tr>
                            <tr>
                                <td>해시태그</td>
                                <td>
                                   
                                            <input type = 'text' style = {styleB} value = {keyword} name = 'keyword' onChange = {insertData} className = 'DTOs'/>
                                        
                                </td>
                            </tr>
                            <tr>
                                <td>숙소 사진 {modifyBit && '등록'}</td>
                                <td>
                                    <input type = 'file' name = 'img[]' multiple = 'multiple' onChange = {settingImages} ref = {fileRef} style = {styleK}/>
                                    <Button variant="outline-dark" onClick = {findClk} style = {{display: modifyBit || 'none'}}>파일 찾아보기</Button> &nbsp;
                                    <br/><span style = {{fontSize: '0.9em'}}>이미지의 순서 변경이나 일부 이미지만 수정은 불가합니다. <br/>파일 추가 시 기존 이미지는 모두 사라집니다.</span>
                                    <Carousel>
                                        {imageList.length > 0 ? 
                                                ( imageList.map((item, index) => (
                                                    <Carousel.Item><img key={index} src={item} style={{ width: '100%' }} alt="" /></Carousel.Item>
                                                    ))) 
                                                : ( img.split(',').map((item, index) => (
                                                    <Carousel.Item><img key={index} src={item} style={{ width: '100%' }} alt="" /></Carousel.Item>
                                                    )))
                                        }
                                   
                                    </Carousel>
                                </td>
                            </tr>
                            <tr>
                                <td>시설</td>
                                <td>
                                    {/* <TextEditor func = {editorVal_facilities} readOnly = {!modifyBit} texthold = 'facilities' /> */}
                                    {/* <br/><br/> */}
                                    <textarea rows = '10' cols = '60'
                                        name = 'facilities' onChange = {insertData} className = 'DTOs EditVals' defaultValue = {facilities}>
                                        
                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>오시는 길</td>
                                <td><input type = 'text' style = {styleB} name = 'mainKeyword' placeholder = '가까운 지하철역 기준으로 작성해 주세요.' value = {mainKeyword} onChange = {insertData}  className = 'DTOs'/></td>
                            </tr>
                            <tr>
                                <td>주소
                                    {
                                        modifyBit === true && 
                                        <div>
                                            
                                            <span style = {{fontSize: '0.9em'}}>주소 변경 시에만<br/>입력해 주세요.</span>
                                            
                                        </div>
                                    }

                                </td>
                                <td>
                                    <div>
                                        
                                        {
                                            modifyBit === false ? 
                                            <input type = 'text' style = {styleB} name = 'addr' value = {addr} className = 'DTOs'/>
                                            :

                                        <div>
                                            <input type = 'text' readOnly  style = {styleH} id = 'roadAddr' className = 'DTOs' />
                                            &nbsp;
                                            <Button variant="outline-dark" type = 'button' onClick = {searchAddr} style = {{display: modifyBit || 'none'}}>주소 검색</Button>
                                            <br/><input type = 'text' style = {styleH} id = 'detailAddr' onChange = {settingAddr} placeholder = '상세주소 입력'  className = 'DTOs'/>
                                        </div>
                                         }
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>영업시간 & 휴무일
                                    {
                                        modifyBit === true && 
                                        <div>
                                            
                                            <span style = {{fontSize: '0.9em'}}>영업 시간은 변경 시에만<br/>입력해 주세요.</span>
                                            
                                        </div>
                                    }
                                </td>
                                <td>
                                    <input style = {styleE} type = 'number' name = 'openTime' onChange = {settingOn} Value = {modifyBit === false && isReady === true && workinghour.split('~')[0]} className = 'DTOs'/>시부터 <input style = {styleE} type = 'number' name =  'closeTime' onChange = {settingOn} onBlur = {fixWorkTime} Value = {modifyBit === false && isReady === true && workinghour.split('~')[1].slice(0,-1)} className = 'DTOs'/>시까지
                                    <br/>
                                    <div>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '법정공휴일' checked = {holiday.includes('법정공휴일')} onChange = {setCate}/>법정공휴일</label></td>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 일요일' checked = {holiday.includes('매주 일요일')} onChange = {setCate}/>매주 일요일</label></td>
                                                    <td style = {styleD}> <label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 월요일' checked = {holiday.includes('매주 월요일')} onChange = {setCate}/>매주 월요일</label></td>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 화요일' checked = {holiday.includes('매주 화요일')} onChange = {setCate}/>매주 화요일</label></td>
                                                </tr>
                                                <tr>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 수요일' checked = {holiday.includes('매주 수요일')} onChange = {setCate}/>매주 수요일</label></td>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 목요일' checked = {holiday.includes('매주 목요일')} onChange = {setCate}/>매주 목요일</label></td>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 금요일' checked = {holiday.includes('매주 금요일')} onChange = {setCate}/>매주 금요일</label></td>
                                                    <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' className = 'DTOs' value = '매주 토요일' checked = {holiday.includes('매주 토요일')} onChange = {setCate}/>매주 토요일</label></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                </td>
                            </tr>
                            <tr>
                                <td>유의사항</td>
                                <td>
                                        {/* <TextEditor func = {editorVal_alert} readOnly = {!modifyBit} texthold = {'alert'} /> */}
                                        {/* <br/><br/> */}
                                        <textarea rows = '10' cols = '60'
                                        
                                        name = 'alert' onChange = {insertData}  className = 'DTOs EditVals' defaultValue={alert} 
                                    ></textarea>
                                </td>

                            </tr>
                            <tr>
                                <td>쿠폰 가능 여부</td> 
                                <td><label><input type = 'checkbox' className = 'DTOs' name = 'coupon' onChange = {setBooleans} checked = {coupon}/>&nbsp; 체크하시면 이용자가 결제 시 쿠폰을 사용할 수 있습니다.</label></td>
                            </tr>
                            <tr>
                                <td>환불 정책</td>
                                <td><br/>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>이용 8일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' value = {modifyBit === false ? refund.split(',')[0]: undefined}   onBlur = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 7일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' value = {modifyBit === false ? refund.split(',')[1]: undefined}   onBlur = {() => settingInputs('refund')}  />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 6일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' value = {modifyBit === false ? refund.split(',')[2]: undefined}   onBlur = {() => settingInputs('refund')}  />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 5일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' value = {modifyBit === false ? refund.split(',')[3]: undefined}   onBlur = {() => settingInputs('refund')}  />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 4일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' value = {modifyBit === false ? refund.split(',')[4]: undefined}   onBlur = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 3일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' value = {modifyBit === false ? refund.split(',')[5]: undefined}    onBlur = {() => settingInputs('refund')} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 2일 전&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' value = {modifyBit === false ? refund.split(',')[6]: undefined}   onBlur = {() => settingInputs('refund')}  />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 전날&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' value = {modifyBit === false ? refund.split(',')[7]: undefined}    onBlur = {() => settingInputs('refund')}  />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>이용 당일&emsp;</td>
                                                <td>
                                                    <input type = 'text' className = 'DTOs' style = {styleF} name = 'refund' value = {modifyBit === false ? refund.split(',')[8]: undefined}   onBlur = {() => settingInputs('refund')} />
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
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '01' checked = {seqHotelCategory.includes('01')}/> 파티룸</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '02' checked = {seqHotelCategory.includes('02')} /> 스터디룸</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '03' checked = {seqHotelCategory.includes('03')}/>공연장</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '04' checked = {seqHotelCategory.includes('04')}/>공유주방</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '05' checked = {seqHotelCategory.includes('05')}/>촬영장</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '06' checked = {seqHotelCategory.includes('06')}/>카페</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '07' checked = {seqHotelCategory.includes('07')}/>연습실</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '08' checked = {seqHotelCategory.includes('08')}/>컨퍼런스</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '09' checked = {seqHotelCategory.includes('09')}/>강의실</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '10' checked = {seqHotelCategory.includes('10')}/>운동시설</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '11' checked = {seqHotelCategory.includes('11')}/>갤러리</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '12' checked = {seqHotelCategory.includes('12')}/>공용 오피스</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '13' checked = {seqHotelCategory.includes('13')}/>당일 캠핑</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' className = 'DTOs' onChange = {setCate} value = '14' checked = {seqHotelCategory.includes('14')}/>가정집</label></td>
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
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'TV' checked = {TV} onChange = {setBooleans}/>TV/프로젝터</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'internet' checked = {internet} onChange = {setBooleans}/>인터넷/WIFI</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'copy' checked = {copy} onChange = {setBooleans}/>프린터기</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'whiteboard' checked = {whiteboard} onChange = {setBooleans}/>화이트보드</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'mic' checked = {mic} onChange = {setBooleans}/>음향/마이크</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'cooking' checked = {cooking} onChange = {setBooleans}/>취사가능</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'food' checked = {food} onChange = {setBooleans}/>음식물반입가능</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'alcohol' checked = {alcohol} onChange = {setBooleans}/>주류반입가능</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'washing' checked = {washing} onChange = {setBooleans}/>샤워시설</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'parking' checked = {parking} onChange = {setBooleans}/>주차가능</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'smoke' checked = {smoke} onChange = {setBooleans}/>흡연가능</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'animal' checked = {animal} onChange = {setBooleans}/>반려동물동반</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'pc' checked = {pc} onChange = {setBooleans}/>PC</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'socket' checked = {socket} onChange = {setBooleans}/>콘센트</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'open24' checked = {open24} onChange = {setBooleans}/>24시 운영</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'noHoliday' checked = {noHoliday} onChange = {setBooleans}/>연중무휴</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'restaurant' checked = {restaurant} onChange = {setBooleans}/>식당 및 카페</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'freeFood' checked = {freeFood} onChange = {setBooleans}/>다과 및 음료</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'locker' checked = {locker} onChange = {setBooleans}/>개인사물함</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'mailService' checked = {mailService} onChange = {setBooleans}/>메일 서비스</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'kitchen' checked = {kitchen} onChange = {setBooleans}/>주방</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'waterFurifier' checked = {waterFurifier} onChange = {setBooleans}/>정수기</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'catering' checked = {catering} onChange = {setBooleans}/>케이터링</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'heater' checked = {heater} onChange = {setBooleans}/>난방</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'airConditioner' checked = {airConditioner} onChange = {setBooleans}/>에어컨</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'fax' checked = {fax} onChange = {setBooleans}/>팩스</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'wareHouse' checked = {wareHouse} onChange = {setBooleans}/>창고서비스</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'percelService' checked = {percelService} onChange = {setBooleans}/>택배서비스</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'privateToilet' checked = {privateToilet} onChange = {setBooleans}/>내부화장실</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'fittingRoom' checked = {fittingRoom} onChange = {setBooleans}/>탈의실</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'roofTop' checked = {roofTop} onChange = {setBooleans}/>루프탑/테라스</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'rounge' checked = {rounge} onChange = {setBooleans}/>라운지</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'mirror' checked = {mirror} onChange = {setBooleans}/>전신거울</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' className = 'DTOs' name = 'bbq' checked = {bbq} onChange = {setBooleans}/>바베큐</label></td>
                                                <td style = {styleD} rowSpan = '2'><label><input type = 'checkbox' className = 'DTOs' name = 'doorlock' checked = {doorlock} onChange = {setBooleans}/>도어락</label></td>
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