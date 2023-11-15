import React, { useEffect, useState } from 'react';
import axios from 'axios';

const setScript = () => {
            const deleteTags = document.createElement('script')
            deleteTags.setAttribute('type', 'text/javascript')
            deleteTags.innerText = 'const deleteTags = (event) => {event.target.setAttribute("style","display:none"); }'

            document.body.appendChild(deleteTags)

            const insertImage = document.createElement('script')
            insertImage.setAttribute('type', 'text/javascript')
            insertImage.innerText = 'const insertImage = (event) => {console.log(event.target.value)}'
            document.body.appendChild(insertImage)
}
 window.onload = setScript();


const ManagerAddPlace = () => {


    // useState & variables ==========================================
        const [hotelDTO, setHotelDTO] = useState({
            img: '',
            name: '', subscribe: '', mainKeyword: '', seqHotelCategory: '',
            keyword: '', addr: '', ownerEmail: '',
            workinghour: '', holiday: '', placeEx: '', // placeEx -> <p></p> 태그에 싸야 함
            facilities: '', alert: '', refund: '',
            coupon: false, TV: false, internet: false, 
            copy: false, whiteboard: false, mic: false, 
            cooking: false, food: false, alcohol: false,
            washing: false, parking: false, smoke: false,
            animal: false, pc: false, isTable: false, 
            socket: false, open24: false, noHoliday: false, 
            restaurant: false, freeFood: false, locker: false,
            mailService: false, kitchen: false, waterFurifier: false, 
            catering: false, heater: false, airConditioner: false, // airconditional -> airconditioner
            fax: false, wareHouse: false, percelService: false, 
            privateToilet: false, fittingRoom: false, roofTop: false,
            rounge: false, mirror: false, bbq: false, doorlock: false

        })

        const {name, subscribe, mainKeyword, keyword, seqHotelCategory, addr, ownerEmail, workinghour, holiday, placeEx, facilities, alert, refund, 
                coupon, TV, internet, copy, whiteboard, mic, cooking, food, alcohol, washing, parking,
                smoke, animal, pc, isTable, socket, open24, noHoliday, restaurant, freeFood, locker, mailService,
                kitchen, waterFurifier, catering, heater, airConditioner, fax, wareHouse, percelService,
                privateToilet, fittingRoom, roofTop, rounge, mirror, bbq, doorlock, img} = hotelDTO

        const [whenOn, setWhenOn]  = useState({
            openTime: 0,
            closeTime: 24
        })

        const {openTime, closeTime} = whenOn

        const [whenOff, setWhenOff] = useState('')

        const [tags, setTags] = useState([])
        
        const [exceptNoHolidays, setExceptNoHolidays] = useState('visible')

        const [exceptSelfHolidays, setExceptSelfHolidays] = useState('hidden')

    

    // functions =====================================================
        const doNothing = () => {}

        const insertData = (e) => { // input onchange
            let {name, value} = e.target
            name === 'placeEx' ? value = '<p>'+value+'</p>' : value = value
         //   name === 'seqHotelCategory' ? seqHotelCategory!== '' ? value = seqHotelCategory+','+value : value = value : value = value
   // 1109 >>      //   name === 'holiday' ? value === 'no holidays' ? console.log('holiday 값이 변경되었으며 연중무휴입니다.') ? value === 'self-holiday' ? console.log('직접 입력 상태입니다.') : console.log('직접 입력 상태가 아닙니다') : console.log('holiday 값이 변경되었지만 no holidays가 아닙니다.') : console.log('holiday 값이 변경되지 않았습니다.')
         //   name === 'holiday' ? value === 'no holidays' || 'self-holiday' ? setExceptNoHolidays('hidden') : setExceptNoHolidays('visible') : value = value
           
            setHotelDTO({
                ...hotelDTO, [name]: value
            })
            
        }
        
        const setHashScript = () => {
            // const deleteTags = document.createElement('script')
            // deleteTags.setAttribute('type', 'text/javascript')
            // deleteTags.innerText = 'const deleteTags = (event) => {console.log(event.target.innerText)}'
            // document.body.appendChild(deleteTags)
        }

        const settingHashTags = (e) => {
            let {name, value} = e.target
            var newA;
            const div = document.getElementById('addTags')
            if(value.includes(',')){
                newA = document.createElement('a')
            //    console.log(value.replace(',',''))
                newA.setAttribute('onClick', 'javascript:deleteTags(event);') // script 동적으로 추가해야 할 듯 
                newA.setAttribute('style', 'margin-left: 5px;')
                newA.innerHTML = '<span>#'+value.replace(',', '')+'</span>'
                e.target.value=''
                div.appendChild(newA)
            }

        }

        const insertTags = () => {
            let tags = document.getElementById('addTags').innerText
            tags = tags.replaceAll('#',',#')
            console.log(tags)
           setHotelDTO({...hotelDTO, keyword:tags})
        }

        const addImage = () => {
            const newImg = document.createElement('input')
            newImg.setAttribute('type', 'text')
            newImg.setAttribute('name', 'img')
           // newImg.setAttribute('onChange','javascript:insertImage(event)')
           // const firstImage = document.getElementById('firstImage')
            const imgAddBtn = document.getElementById('imgAddBtn')

            const br = document.createElement('br')
            imgAddBtn.after(br)
            imgAddBtn.after(newImg)
           // imgAddBtn.onChange=insertImage(e)
           // firstImage.after(newImg)
            
        }

        const settingImgs = () => {
            const imgInfo = document.getElementsByName('img')
            let img = "";
            console.log(imgInfo)
            imgInfo.forEach((eachTags)=>{
                img += ","+eachTags.value
            })

            console.log(img)
            setHotelDTO({...hotelDTO, img:img})
            // imgInfo.map((item) => {
            //     console.log(item.value)
            // })
        }

        // const insertImage = (e) => {
        //     let {value} = e.target
        //     console.log(value)
        // }

        const settingVals = () => { // 주소창 입력하려 눌렀을 때 해시태그, 이미지 확정
            settingImgs()
            insertTags()
        }

        const settingHolidays = (e) => {
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
            seqHotelCategory!== '' ? value = seqHotelCategory+','+value : value = value

            // 체크된 상태라면 ? DTO 안에 값을 넣고 : 아니면 console.log
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
        
    // API, etc ======================================================
        const confirmVals = () => {
            
            console.log(hotelDTO)
            axios.post('http://localhost:8080/manager/addPlace', null, {
                params: hotelDTO
            }).then(res => 
               // console.log(res)
                window.location.href = '/manager/addRoom/'+res.data
                                    // 맨 앞에 /가 있느냐 없느냐에 따라 결과가 다름
            ).catch(e => console.log(e))
        }

    // NOTE ========================================================== 231107 ~ 추가중
        /*
            1. [TO DO] addr을 카카오맵 불러와서 찍어볼까 생각 중에 있음. 기본 구현 다 되면 진행해볼 예정

            2. 이 단계에서 유저가 집어넣으면 안 되는 값들
                 -> seq_hotel(AI), ownerEmail(세션에서 줌)

            3. [TO DO] textarea -> 글자 수 세기 추가 (jquery -> vanilaJS)

            4. [TO DO] 해시태그 -> 해시태그 넣어서 동적으로 추가되는 게 보이게 구현하기
            4-1. [TO DO] 사용자는 hashtag의 # 제외한 value만 입력할 수 있도록 하기
            4-2. [TO DO] 해시태그 객체가 동적으로 추가되게 하려면? 방법 생각해 보기


        */

    return (
        <div>
            <form>
                <span style = {styleA}>새로운 플레이스 추가하기</span>
                <table>
                    <tbody>
                        <tr>
                            <td>[임시]OwnerEmail</td>
                            <td>
                            <input type = 'text' name = 'ownerEmail' onChange = {insertData}/>
                            </td>
                        </tr>
                        <tr>
                            <td>플레이스 이름&emsp;</td>
                            <td><input type = 'text'  style = {styleB} name = 'name' onChange = {insertData}/></td>
                        </tr>
                        <tr>
                            <td>한 마디 소개</td>
                            <td><input type = 'text' style = {styleB} name = 'placeEx' onChange = {insertData} placeholder = '손님들에게 보여질 소개 멘트를 작성해 주세요.'/></td>
                        </tr>
                        <tr>
                            <td>소개</td>
                            <td><textarea rows = '5' cols = '45' name = 'subscribe' onChange = {insertData} placeholder = '플레이스 소개를 작성해 주세요.'></textarea></td>
                        </tr>
                        <tr>
                            <td>해시태그</td>
                            <td><input type = 'text' style = {styleB} name = 'keyword' placeholder='#' onLoad = {setHashScript} onChange = {settingHashTags} onBlur = {insertTags}/>
                                <div id = 'addTags'>
                                    
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>숙소 사진 등록</td>
                            <td>
                                <input type = 'text' id = 'firstImage' style = {styleB} name = 'img' placeholder = "이미지 URL을 등록해 주세요" onChange = {insertData} onBlur = {settingImgs}/> <button type = 'button' id = 'imgAddBtn' onClick = {addImage}>+</button> 
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
                            <td><input type = 'text' style = {styleB} name = 'addr' placeholder = '주소를 입력해 주세요.' onChange = {insertData} onClick = {settingVals}/></td>
                        </tr>
                        <tr>
                            <td>영업시간 & 휴무일</td>
                            <td>
                                <input style = {styleE} type = 'number' name = 'openTime' onChange = {settingOn}/>시부터 <input style = {styleE} type = 'number' name =  'closeTime' onChange = {settingOn} onBlur = {fixWorkTime}/>시까지
                                <br/>
                                <select name = 'holiday' onChange = {settingHolidays}>휴무일 선택하기
                                    <option value = 'every Sun, holidays'>매주 일요일, 공휴일</option>
                                    <option value = 'only Sundays' >매주 일요일</option>
                                    <option value = 'only Mondays'>매주 월요일</option>
                                    <option value = 'only holidays'>공휴일에만</option>
                                    <option value = 'no holidays'>연중무휴</option>
                                    <option value = 'self-holiday'>직접입력</option>
                                    </select><span style = {styleF}>에 쉬어요</span><span style = {styleG}>&emsp;<input type = 'text' name = 'holiday' onChange = {settingHolidays} placeholder = '휴무일 직접 입력'/></span>
                            </td>
                        </tr>
                        <tr>
                            <td>유의사항</td>
                            <td><textarea rows = '5' cols = '45' name = 'alert' onChange = {insertData} placeholder = '이용자가 유의해야 할 사항을 적어 주세요.'></textarea></td>
                        </tr>
                        <tr>
                            <td>쿠폰 가능 여부</td> 
                            {
                                // 슬라이드 스위치로 진행 
                            }
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
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'isTable' onChange = {setBooleans}/>테이블</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'socket' onChange = {setBooleans}/>콘센트</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'open24' onChange = {setBooleans}/>24시 운영</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'noHoliday' onChange = {setBooleans}/>연중무휴</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'restaurant' onChange = {setBooleans}/>식당 및 카페</label></td>
                                        </tr>
                                        <tr>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'freeFood' onChange = {setBooleans}/>다과 및 음료</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'locker' onChange = {setBooleans}/>개인사물함</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'mailService' onChange = {setBooleans}/>메일 서비스</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'kitchen' onChange = {setBooleans}/>주방</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'waterFurifier' onChange = {setBooleans}/>정수기</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'catering' onChange = {setBooleans}/>케이터링</label></td>
                                        </tr>
                                        <tr>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'heater' onChange = {setBooleans}/>난방</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'airConditioner' onChange = {setBooleans}/>에어컨</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'fax' onChange = {setBooleans}/>팩스</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'wareHouse' onChange = {setBooleans}/>창고서비스</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'percelService' onChange = {setBooleans}/>택배서비스</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'privateToilet' onChange = {setBooleans}/>내부화장실</label></td>
                                        </tr>
                                        <tr>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'fittingRoom' onChange = {setBooleans}/>탈의실</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'roofTop' onChange = {setBooleans}/>루프탑/테라스</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'rounge' onChange = {setBooleans}/>라운지</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'mirror' onChange = {setBooleans}/>전신거울</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'bbq' onChange = {setBooleans}/>바베큐</label></td>
                                            <td style = {styleD}><label><input type = 'checkbox' name = 'doorlock' onChange = {setBooleans}/>도어락</label></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        
                    </tbody>
                    
                </table>
                        <button type = 'button' onClick = {confirmVals}>플레이스 등록하기</button> 
                        
            </form>
        </div>
    );
};

export default ManagerAddPlace;