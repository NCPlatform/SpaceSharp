import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
const AddRoom = () => {
    // useState & variables ==========================================
    
        const {hotelSeq} = useParams()

        const [roomDTO, setRoomDTO] = useState({
            seqHotel: hotelSeq, //<< 이 값은 추후 hotelSeq로 줄 것
            name: '', 
            price: 0, img: '', normalExplain: '',
            placeSize: '', people: '', datetime: '', // << 최소 예약 시간
            reserveRule: ''
        })

        const [isMeter, setIsMeter] = useState(true)

    // functions =====================================================

        const insertData = (e) => { // input onChange
            let {name, value} = e.target
            
            setRoomDTO({
                ...roomDTO, [name]: value
            })
        }

        const addImage = () => {
            const newImg = document.createElement('input')
            newImg.setAttribute('type', 'text')
            newImg.setAttribute('name', 'img')
            newImg.setAttribute('style', 'width: 350px')
            newImg.addEventListener('change', () => {
                console.log('이미지세팅===========')
                settingImgs()
            })
            const imgAddBtn = document.getElementById('imgAddBtn')

            const br = document.createElement('br')
            imgAddBtn.after(br)
            br.after(newImg)
            
        }

        const settingImgs = () => {
            const imgInfo = document.getElementsByName('img')
            let img = "";
            console.log(imgInfo)
            imgInfo.forEach((eachTags)=>{
                img += ","+eachTags.value
            })

            console.log(img)
            setRoomDTO({...roomDTO, img:img})
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
    // CSS ===========================================================
        const styleA = {fontSize: '1.2em', fontWeight: 'bold'} // style = {styleA}
        const styleB = {width: '350px'} // style = {styleB}
        const styleC = {width: '50px'} // style = {styleC}
        const styleD = {width: '110px'}
    // API, etc ======================================================
        
        const confirmVals = () => {
            console.log(roomDTO)
        }

        const submitVals = () => { 
            console.log(roomDTO)
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

        */
    return (
        <div>
            {/* <h3>등록 진행 중인 숙소의 Seq Number는 {roomSeq} 입니다.</h3> */}
            <form>
                <span style = {styleA}>새로운 룸 추가하기</span>
                <table>
                    <tbody>
                        <tr>
                            <td>룸 이름</td>
                            <td><input type = 'text'  style = {styleB} name = 'name' onChange = {insertData}/></td>
                        </tr>
                        <tr>
                            <td>룸 소개</td>
                            <td><input type = 'text' style = {styleB} name = 'normalExplain' onChange = {insertData} placeholder = '손님들에게 보여질 소개 멘트를 작성해 주세요.'/></td>
                        </tr>
                        
                        <tr>
                            <td>룸 사진 등록</td>
                            <td>
                                <input type = 'text' id = 'firstImage' style = {styleB} name = 'img' placeholder = "이미지 URL을 등록해 주세요" onChange = {insertData}/> <button type = 'button' id = 'imgAddBtn' onClick = {addImage}>+</button> 
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
                                    }&nbsp;<button type = 'button' onClick = {convertMeter}>{
                                        isMeter === true ? '평수로 입력하기' : '제곱미터로 입력하기'
                                    }</button> 
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
                            <td>예약 시 유의사항</td>
                            <td><textarea rows = '5' cols = '45' name = 'reserveRule' onChange = {insertData} placeholder = '이용자가 유의해야 할 사항을 적어 주세요.'></textarea></td>
                        </tr>
                    </tbody>
                </table>
                        <button type = 'button' onClick = {confirmVals}>DTO 값 확인하기</button>
                        <button type = 'button' onClick = {submitVals}>새로운 룸 등록하기</button> 
            </form>
        </div>
    );
};

export default AddRoom;