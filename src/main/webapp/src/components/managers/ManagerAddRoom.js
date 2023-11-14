import React from 'react';
import { useParams } from 'react-router-dom';
const AddRoom = () => {
    
    const {roomSeq} = useParams()
    console.log(roomSeq)
    
    return (
        <div>
            <h3>등록 진행 중인 숙소의 Seq Number는 {roomSeq} 입니다.</h3>
        </div>
    );
};

export default AddRoom;