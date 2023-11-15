import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
const AddRoom = () => {
    
   // const {roomSeq} = useParams()
   // console.log(roomSeq)
    const [roomDTO, setRoomDTO] = useState({
        seqRoom: 0, seqHotel: 0, name: '', 
        price: 0, img: '', normalExplain: '',
        placeSize: '', people: '', datetime: '',
        reserveRule: ''
    })
    return (
        <div>
            {/* <h3>등록 진행 중인 숙소의 Seq Number는 {roomSeq} 입니다.</h3> */}
            
        </div>
    );
};

export default AddRoom;