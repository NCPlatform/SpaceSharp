import React, { useRef, useState } from 'react';
import axios from 'axios';
import TextEditor from '../../TextEditor';

const ManagerAddPlace = () => {

    // useState & variables ==========================================
        
        // Session
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

      //  const [whenOff, setWhenOff] = useState('')
        
        const [exceptNoHolidays, setExceptNoHolidays] = useState('visible')

        const [exceptSelfHolidays, setExceptSelfHolidays] = useState('hidden')

        const { daum } = window;


        // 231120 modified
        const [imageList, setImageList] = useState([])

        const [file, setFile] = useState('')

        
    // functions =====================================================
        const doNothing = () => {}

        const insertData = (e) => { // input onchange
            let {name, value} = e.target
           // name === 'placeEx' ? value = '<p>'+value+'</p>' : value = value
         //   name === 'seqHotelCategory' ? seqHotelCategory!== '' ? value = seqHotelCategory+','+value : value = value : value = value
   // 1109 >>      //   name === 'holiday' ? value === 'no holidays' ? console.log('holiday 값이 변경되었으며 연중무휴입니다.') ? value === 'self-holiday' ? console.log('직접 입력 상태입니다.') : console.log('직접 입력 상태가 아닙니다') : console.log('holiday 값이 변경되었지만 no holidays가 아닙니다.') : console.log('holiday 값이 변경되지 않았습니다.')
         //   name === 'holiday' ? value === 'no holidays' || 'self-holiday' ? setExceptNoHolidays('hidden') : setExceptNoHolidays('visible') : value = value
           
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

       
       
        // 231120 modified ============================

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


        const settingHolidays = (e) => { // [FIX] 여기도 수정 필요
            let {name, value} = e.target
            value === 'no holidays' ? setExceptNoHolidays('hidden') : setExceptNoHolidays('visible') 
            value === 'self-holiday' ? setExceptSelfHolidays('visible') : doNothing()
            //name === 'selfHoliday' ? setExceptSelfHolidays('visible') : doNothing()
            setHotelDTO({
                ...hotelDTO, [name]: value
            })
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


        
    // CSS ===========================================================

        const styleA = {fontSize: '1.2em', fontWeight: 'bold'} // style = {styleA}
        const styleB = {width: '350px'} // style = {styleB}
        const styleC = {fontSize: '0.8em', color: 'gray'}
        const styleD = {padding: '5px'}
        const styleE = {width: '45px'} 
        const styleF = {visibility: exceptNoHolidays}
        const styleG = {visibility: exceptSelfHolidays}
        const styleH = {width: '253px'}   

    // API, etc ======================================================
        const confirmVals = () => {
            console.log(hotelDTO)
            

        }

        const submitVals = () => {
            // axios.post('http://localhost:8080/manager/addedPlace', null, {
            //     params: hotelDTO
            // }).then(res => 
            //    // console.log(res)
            //     window.location.href = '/manager/addRoom/'+res.data
            //                         // 맨 앞에 /가 있느냐 없느냐에 따라 결과가 다름
            // ).catch(e => console.log(e))
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

    // NOTE ========================================================== 231107 ~ 추가중
        /*
            1. [TO DO] addr을 카카오맵 불러와서 찍어볼까 생각 중에 있음. 기본 구현 다 되면 진행해볼 예정
            1-1. 도로명주소 찾기 기능을 이용해 유저가 넣는 값 통제하기 

            2. 이 단계에서 유저가 집어넣으면 안 되는 값들
                 -> seq_hotel(AI), ownerEmail(세션에서 줌)
            2-1. ownerEmail 세션 태우기    

            3. [TO DO] textarea -> 글자 수 세기 추가 (jquery -> vanilaJS)

            4. [TO DO] 해시태그 -> 해시태그 넣어서 동적으로 추가되는 게 보이게 구현하기 (완료)
            4-1. [TO DO] 사용자는 hashtag의 # 제외한 value만 입력할 수 있도록 하기  (완료)
            4-2. [TO DO] 해시태그 객체가 동적으로 추가되게 하려면? 방법 생각해 보기  (완료)

            5. [FIX] 공휴일 설정 바꾸기

        */

    return (
        <div>
            <form>
                <span style = {styleA}>새로운 플레이스 추가하기</span>
                <table>
                    <tbody>
                        <tr>
                            <td>[확인용]OwnerEmail</td>
                            <td>
                            <input type = 'text' readOnly name = 'ownerEmail' value = {ownerEmail}/>
                            </td>
                        </tr>
                        <tr>
                            <td>플레이스 이름&emsp;</td>
                            <td><input type = 'text'  style = {styleB} name = 'name' onChange = {insertData}/></td>
                        </tr>
                        <tr>
                            <td>한 마디 소개</td>
                            <td><input type = 'text' style = {styleB} name = 'subscribe' onChange = {insertData} placeholder = '손님들에게 보여질 소개 멘트를 작성해 주세요.'/></td>
                        </tr>
                        <tr>
                            <td>소개</td>
                            <td>
                                <div>
                                <TextEditor func = {editorVal}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>해시태그</td>
                            <td><input type = 'text' style = {styleB} name = 'keyword' placeholder='#'onChange = {settingHashTags} onBlur = {insertTags}/>
                                <div id = 'addTags'>
                                    
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>숙소 사진 등록</td>
                            <td>
                                <input type = 'file' name = 'img[]' multiple = 'multiple' onChange = {settingImages}/>
                                <br/>
                                {
                                    imageList.map((item, index) => <img key = {index} src = {item} style = {{width: '40px', height: '40px'}} alt = ''/>)
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>시설</td>
                            <td><input type = 'text' style = {styleB} name = 'facilities' placeholder = '시설 소개를 작성해 주세요.' onChange = {insertData}/></td>
                        </tr>
                        <tr>
                            <td>오시는 길</td>
                            <td><input type = 'text' style = {styleB} name = 'mainKeyword' placeholder = '가까운 지하철역 기준으로 작성해 주세요.' onChange = {insertData}/></td>
                        </tr>
                        <tr>
                            <td>주소</td>
                            <td>
                                <div>
                                    <input type = 'text' readOnly style = {styleH} id = 'roadAddr' placeholder = '우측 버튼 클릭'/>
                                    &nbsp; <button type = 'button' id = 'mapBtn' onClick = {searchAddr} >주소 검색</button>
                                    <br/><input type = 'text' style = {styleH} id = 'detailAddr' onChange = {settingAddr} placeholder = '상세주소 입력'/>
                                   
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>영업시간 & 휴무일</td>
                            <td>
                                <input style = {styleE} type = 'number' name = 'openTime' onChange = {settingOn}/>시부터 <input style = {styleE} type = 'number' name =  'closeTime' onChange = {settingOn} onBlur = {fixWorkTime}/>시까지
                                <br/>
                                <div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' value = 'law' onChange = {setCate}/>법정공휴일</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' value = 'Sun' onChange = {setCate}/>매주 일요일</label></td>
                                                <td style = {styleD}> <label><input type = 'checkbox' name = 'holiday' value = 'Mon' onChange = {setCate}/>매주 월요일</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' value = 'Tue' onChange = {setCate}/>매주 화요일</label></td>
                                            </tr>
                                            <tr>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' value = 'Wed' onChange = {setCate}/>매주 수요일</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' value = 'Thu' onChange = {setCate}/>매주 목요일</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' value = 'Fri' onChange = {setCate}/>매주 금요일</label></td>
                                                <td style = {styleD}><label><input type = 'checkbox' name = 'holiday' value = 'Sat' onChange = {setCate}/>매주 토요일</label></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                     </div>
                            </td>
                        </tr>
                        <tr>
                            <td>유의사항</td>
                            <td><textarea rows = '5' cols = '45' name = 'alert' onChange = {insertData} placeholder = '이용자가 유의해야 할 사항을 적어 주세요.'></textarea></td>
                        </tr>
                        <tr>
                            <td>쿠폰 가능 여부</td> 
                            <td><label><input type = 'checkbox' name = 'coupon' onChange = {setBooleans} />&nbsp; 체크하시면 이용자가 결제 시 쿠폰을 사용할 수 있습니다.</label></td>
                        </tr>
                        <tr>
                            <td>환불 정책</td>
                            <td><textarea rows = '5' cols = '45' name = 'refund' onChange = {insertData} placeholder = '플레이스의 환불 정책을 작성해 주세요.' /></td>
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
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '01'/> 파티룸</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '02' /> 스터디룸</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '03'/>공연장</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '04'/>공유주방</label></td>
                                        </tr>
                                        <tr>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '05'/>촬영장</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '06'/>카페</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '07'/>연습실</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '08'/>컨퍼런스</label></td>
                                        </tr>
                                        <tr>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '09'/>강의실</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '10'/>운동시설</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '11'/>갤러리</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '12'/>공용 오피스</label></td>
                                        </tr>
                                        <tr>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '13'/>당일 캠핑</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'seqHotelCategory' onChange = {setCate} value = '14'/>가정집</label></td>
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
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'TV' onChange = {setBooleans}/>TV/프로젝터</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'internet' onChange = {setBooleans}/>인터넷/WIFI</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'copy' onChange = {setBooleans}/>프린터기</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'whiteboard' onChange = {setBooleans}/>화이트보드</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'mic' onChange = {setBooleans}/>음향/마이크</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'cooking' onChange = {setBooleans}/>취사가능</label></td>
                                        </tr>
                                        <tr>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'food' onChange = {setBooleans}/>음식물반입가능</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'alcohol' onChange = {setBooleans}/>주류반입가능</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'washing' onChange = {setBooleans}/>샤워시설</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'parking' onChange = {setBooleans}/>주차가능</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'smoke' onChange = {setBooleans}/>흡연가능</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'animal' onChange = {setBooleans}/>반려동물동반</label></td>
                                        </tr>
                                        <tr>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'pc' onChange = {setBooleans}/>PC</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'socket' onChange = {setBooleans}/>콘센트</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'open24' onChange = {setBooleans}/>24시 운영</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'noHoliday' onChange = {setBooleans}/>연중무휴</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'restaurant' onChange = {setBooleans}/>식당 및 카페</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'freeFood' onChange = {setBooleans}/>다과 및 음료</label></td>
                                        </tr>
                                        <tr>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'locker' onChange = {setBooleans}/>개인사물함</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'mailService' onChange = {setBooleans}/>메일 서비스</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'kitchen' onChange = {setBooleans}/>주방</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'waterFurifier' onChange = {setBooleans}/>정수기</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'catering' onChange = {setBooleans}/>케이터링</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'heater' onChange = {setBooleans}/>난방</label></td>
                                        </tr>
                                        <tr>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'airConditioner' onChange = {setBooleans}/>에어컨</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'fax' onChange = {setBooleans}/>팩스</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'wareHouse' onChange = {setBooleans}/>창고서비스</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'percelService' onChange = {setBooleans}/>택배서비스</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'privateToilet' onChange = {setBooleans}/>내부화장실</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'fittingRoom' onChange = {setBooleans}/>탈의실</label></td>
                                        </tr>
                                        <tr>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'roofTop' onChange = {setBooleans}/>루프탑/테라스</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'rounge' onChange = {setBooleans}/>라운지</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'mirror' onChange = {setBooleans}/>전신거울</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'bbq' onChange = {setBooleans}/>바베큐</label></td>
                                            <td style = {styleD} rowSpan = '2'><label><input type = 'checkbox' name = 'doorlock' onChange = {setBooleans}/>도어락</label></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        
                    </tbody>
                    
                </table>
                        <button type = 'button' onClick = {confirmVals}>DTO 값 확인하기</button>
                        <button type = 'button' onClick = {submitVals}>플레이스 등록하기</button> 
                        
            </form>
        </div>
    );
};

export default ManagerAddPlace;