import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Disp_topNav from './Disp_topNav';
import { Button } from 'react-bootstrap';
import ViewRoomList from './ViewRoomList';
import ManagerHeader from './ManagerHeader';



const MyPlace = () => {
    
    // ================================= variables
    const [sessionEmail, setSessionEmail] = useState(JSON.parse(window.sessionStorage.getItem('user')).email)
    const [dataList, setDataList] = useState([])
    const [available, setAvailable] = useState(true) // 데이터가 있는지 없는지
    const [roomListOn, setRoomListOn] = useState(false)
    const [seq, setSeq] = useState(0)
    // room List
    const [roomList, setRoomList] = useState([])
    const [roomAvailable, setRoomAvailable] = useState(true)
    
    // ================================= functions
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const session = window.sessionStorage.getItem('user');
                // const userEmail = JSON.parse(session).email;
                // setSessionEmail(userEmail)
                const userEmail = sessionEmail;

                const response = await axios.post('http://localhost:8080/manager/getMyPlace', null, {
                    params: {
                        email: userEmail
                    }
                });
                
                response.data.totalElements === 0 && setAvailable(false) 
                const content = response.data.content;
                console.log(content)

                available === true && settingData(content, 'hotel')
            } catch (error) {
                console.error("데이터를 가져오는 도중 에러 발생:", error);
            }
        };

        fetchData();
    }, [sessionEmail]); 
    
    const settingData = (content, type) => { // 여기 수정 필요 
        type === 'hotel' ? 
        setDataList(prevDataList => [...prevDataList, ...content.map(item => ({
            seqHotel: item[0],
            name: item[1],
            addr: item[2],
           img: item[3].substr(0,item[3].indexOf(',')) === '' ? item[3] : item[3].substr(0,item[3].indexOf(','))
        }))]) 
        :
        content.length === 0 ? setRoomAvailable(false) : 
        content.forEach((item) => {
            setRoomList(prevRoomList => [
                ...prevRoomList,
                { seqRoom: item.seqRoom, name: item.name, people: item.people, 
                  img: item.img.substr(0, item.img.indexOf(',')) === '' ? item.img : item.img.substr(0, item.img.indexOf(',')) }
              ])
            setRoomAvailable(true)
        })
        
        
    }

    const locate = (seq, namespace) => {
        window.location.href = '/manager/'+namespace+'/'+seq
    }

    const viewRoomList = (seq) => {
        console.log(seq)
        setSeq(seq)
        setRoomListOn(true) // 모달 창 열기 
        window.scrollTo(0,0)
        axios.post('http://localhost:8080/manager/getMyRoom', null, {
                    params: {
                        seqHotel: seq
                    }
                }).then(res => {
                    
                    settingData(res.data, 'room')
               //  console.log(res.data.length)
                }
                   // settingData(res, 'room') 
                ).catch(e => console.log(e));
    }

    const roomListToggle = () => { // 컴포넌트에 모달창 닫기 용도로 전달되는 함수다. 
        setRoomListOn(!roomListOn)
        setRoomList([]) // 닫으면 가져왔던 룸 리스트 정보가 초기화된다.
        // 위 라인이 없으면 이전에 조회했던 룸 리스트에 새롭게 조회하는 룸 리스트가 더해진다.
    }
    
    const newPlace = () => {
        window.location.href = '/manager/addPlace'
    }

    // ===================================================== CSS
        const styleA = {width: '10%', textAlign: 'left', paddingLeft: '5%'} // 주소 td
        const styleB = {width: '7%', textAlign: 'center'} // 이미지 th 
        const styleC = {width: '5%', textAlign: 'center'} // 고유번호 th, td
        const styleD = {width: '10%', textAlign: 'center'} // 플레이스명 td, th
        const styleE = {width: '100%', height: '150px', objectFit: 'cover'}
        const styleF = {width: '10%', textAlign: 'center'} // 주소 th
        const styleG = {cursor: 'pointer'} // 링크
        const styleH = {width: '85%'} // entire table width
        const styleI = {borderBottom: '1px solid gray', borderTop: '1px solid gray'} // 각 td 테두리
        const styleJ = {borderBottom: '1px solid gray'} // 맨 위 td 테두리
        const styleK = {color: '#5AA2E1', cursor: 'pointer'}
        const styleL = {fontSize: '1.3em'}
        const styleM = {textAlign: 'center'}
        const styleN = {width: '85%'}
    

        // layout
        const styleZ = {marginLeft: '10%', marginTop: '1%', marginRight: '5%'}

    // ===================================================== test, API, etc.
    

    return (
        <div>
             <ManagerHeader />
            <div className="container mt-5 pt-5">
                <table style = {styleH}>
                    <thead>
                        <tr>
                            <th style = {styleC}>
                            고유번호
                            </th>
                            <th style = {styleD}>
                                플레이스명
                            </th>
                            <th style = {styleB}>
                                이미지
                            </th>
                            <th style = {styleF}>
                                주소
                            </th>
                            <th style = {styleB}>
                                선택
                            </th>
                        </tr>
                    </thead>
                   
                    <tbody>
                        <tr>
                            <td colSpan = '5'><hr/></td>
                        </tr>
                        { available ? dataList.map((item, index) => <tr key = {item.seqHotel} style = { index === 0 ? styleJ : styleI }>

                                <td style = {styleC}>{item.seqHotel}</td>
                                <td style = {styleD}><a style = {styleG} onClick = {() => locate(item.seqHotel, 'placeInfo')}> {item.name}</a></td>
                                <td style = {styleB}><img src = {item.img} alt = {item.name} style = {styleE}/></td>
                                <td style = {styleA}>{item.addr}</td>
                                <td style = {styleB}>
                                    <Button variant="outline-dark" type = 'button' style = {styleN} onClick = {() => locate(item.seqHotel, 'placeInfo')}>플레이스 상세보기</Button>
                                    <br/>
                                    <Button variant="outline-dark" type = 'button' style = {styleN} onClick = {() => viewRoomList(item.seqHotel)}>룸 리스트 보기</Button>
                                </td>

                            </tr>) : <td colSpan = '4' style = {styleM}><span style = {styleL}><br/><br/><br/><br/><br/>아직 등록하신 숙소 데이터가 없어요. <br/>
                                    <span style = {styleK} onClick = {newPlace}>새로운 숙소를 등록</span>하러 가 볼까요?</span></td>
                        }
                    </tbody>
                </table>
                {
                    // RoomList 모달
                    roomListOn && <ViewRoomList seq = {seq} roomList = {roomList} func = {roomListToggle} roomAvailable = {roomAvailable}/>
                }
            </div>
        </div>
    );
};

export default MyPlace;
