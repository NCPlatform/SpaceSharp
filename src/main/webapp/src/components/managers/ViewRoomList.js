import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios'

const ViewRoomList = ({seq, func, roomList, roomAvailable}) => {
    // ================================== modal CSS
    
    const bg = {width: '100%', height: '100%', position: 'fixed', left: 0, top: 0, backgroundColor: 'black', opacity: 0.6} 
    const pop = {width: '80%', height: '80%', backgroundColor: '#FAFAFA', position: 'absolute', left: '50%', top: '50%', padding: '5%', boxSizing: 'border-box', transform: 'translate(-50%, -50%)'}
    const close = {position: 'absolute', top: '5%', right: '5%', cursor: 'pointer', color: 'grey'}
    const subject = {position: 'absolute', top:'10%', left: '5%'}
    const table = {position: 'absolute', top: '20%', left: '5%', marginRight: '5%'}

    // ================================== modal ACTION

    const closeAction = () => {
        func()
    }
   

    const locate = (seq, namespace) => {
        window.location.href = '/manager/'+namespace+'/'+seq
    }
    // ================================== NOTE

    const styleA = {width :'2%', textAlign: 'center'}
    const styleB = {width :'6%', textAlign: 'center'}
    const styleC = {width: '4%', textAlign: 'center'}
    const styleD = {width: '4%', textAlign: 'center'}
    const styleE = {width: '100%'}
    const styleF = {borderBottom: '1px solid gray'}
    const styleG = {cursor: 'pointer'}
    
    return (
        <>
            <div style = {bg}></div>
            <div style = {pop}>
                <h2 style = {subject}>룸 리스트</h2>
                <a onClick = {closeAction}><span style = {close}>X</span></a>
                <table style = {table}>
                    <thead>
                        <tr style = {{borderBottom: '1px solid gray'}}>
                            <th style = {styleA}>일련번호</th>
                            <th style = {styleB}>룸 이름</th>
                            <th style = {styleC}>룸 이미지</th>
                            <th style = {styleD}>수용인원</th>
                            <th style = {styleC}>선택</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roomAvailable === true ? 
                            roomList.map((item) => <tr key = {item.seqRoom} style = {styleF}>
                                    <td style = {styleA}>{item.seqRoom}</td>
                                    <td style = {styleB}><a style = {styleG} onClick = {() => locate(item.seqRoom, 'roomInfo')}> {item.name}</a></td>
                                    <td style = {styleC}><img src = {item.img} alt = {item.name} style = {styleE}/></td>
                                    <td style = {styleD}>{item.people}</td>
                                    <td style = {styleC}>
                                        <Button variant="outline-dark" type = 'button' onClick = {() => locate(item.seqRoom, 'roomInfo')}>룸 상세보기</Button>
                                        
                                    </td>

                                </tr>
                                
                            ) :

                            <tr>
                                <td colSpan = '5'>
                                    아직 등록된 룸이 없습니다. <span style = {{color: 'blue'}}>새로운 룸을 추가</span>해 볼까요?
                                </td>
                            </tr>
                            
                        }
                    </tbody>

                </table>
                
                
            </div>
        </>
    );
};

export default ViewRoomList;