import React, { useEffect } from 'react';
import axios from 'axios'

const ViewRoomList = ({seq, func, roomContent}) => {
    // ================================== modal CSS
    
    const bg = {width: '100%', height: '100%', position: 'fixed', left: 0, top: 0, backgroundColor: 'black', opacity: 0.6} 
    const pop = {width: '80%', height: '80%', backgroundColor: '#FAFAFA', position: 'absolute', left: '50%', top: '50%', padding: '5%', boxSizing: 'border-box', transform: 'translate(-50%, -50%)'}
    const space = {height: '30px'}
    const close = {position: 'absolute', top: '5%', right: '5%', cursor: 'pointer', color: 'grey'}
    const subject = {position: 'absolute', top:'10%', left: '5%'}

    // ================================== modal ACTION

    const closeAction = () => {
        func()
    }

   

    // ================================== NOTE
    
    return (
        <>
            <div style = {bg}></div>
            <div style = {pop}>
                <h2 style = {subject}>룸 리스트</h2>
                <a onClick = {closeAction}><span style = {close}>X</span></a>
                <div style = {space}></div>
                <table>


                </table>
                
                
            </div>
        </>
    );
};

export default ViewRoomList;