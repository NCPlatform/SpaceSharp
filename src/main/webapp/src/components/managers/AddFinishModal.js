import React from 'react';

const AddFinishModal = (value) => {
    const bg = {width: '100%', height: '100%', position: 'fixed', left: 0, top: 0, backgroundColor: 'black', opacity: 0.6} 
    const pop = {width: '500px', height: '200px', backgroundColor: '#FAF8F2', position: 'absolute', left: '50%', top: '50%', padding: '30px', boxSizing: 'border-box', transform: 'translate(-50%, -50%)'}
    const space = {height: '30px'}

    const addPlace = () => {
        window.location.href = '/manager/addPlace'
    }

    const addRoom = () => {
        window.location.href = '/manager/addRoom/'+value.value
    }

    const goMain = () => {
        window.location.href = '/manager'
    }
    return (
        <>
        <div style = {bg}></div>
        <div style = {pop}>
            <h2>플레이스 등록이 완료되었어요.</h2>
            <div style = {space}></div>
            <span>
                <button type = 'button' onClick = {addPlace}>플레이스 추가하기</button>&nbsp;
                <button type = 'button' onClick = {addRoom}>룸 추가하기</button>&nbsp;
                <button type = 'button' onClick = {goMain}>메인으로 돌아가기</button>&nbsp;
            </span>
            
        </div>
    </>
    );
};

export default AddFinishModal;