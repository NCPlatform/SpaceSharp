import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ManagerHeader from "./ManagerHeader";
import {format} from 'date-fns';
import Swal from 'sweetalert2'
import axios from "axios";


const Reservation = () => {

  // ==================== LOAD
  const [ready, isReady] = useState(false)
  const [userEmail, setUserEmail] = useState(JSON.parse(window.sessionStorage.getItem('user')).email)
  const [reserveDTO, setReserveDTO] = useState([{
     departure: new Date('2023-12-05T14:41:00.000Z'), // ISO 8601 형식의 날짜 문자열을 Date 객체로 변환
     arrival: new Date('2023-12-06T10:30:00.000Z'),   // ISO 8601 형식의 날짜 문자열을 Date 객체로 변환
     user_name: '', room_name: '', owner_email: ''
  }])
  
  useEffect(()=>{
    userEmail && 
    axios.post('http://localhost:8080/manager/getMyReservations', null, {
      params:{
        userEmail: userEmail
      }
    }).then(res => {
                      console.log(res.data)
                      setReserveDTO(res.data)  
                  }).catch(e => console.log(e))


  },[])

  // ===================== onClick Events
  const handleDateClick = (e) => {
    alert(e.dateStr);
  };

  const handleEventClick = (e) => {
    const {title, start, end} = e.event
    const formatStart = format(start, 'yyyy년 MM월 dd일 HH시 mm분 ~ ')
    const formatEnd = format(end, 'yyyy년 MM월 dd일 HH시 mm분')
    Swal.fire({
      title: title.split('/ ')[1],
      html: '예약자 성명 : <b>'+title.split(' /')[0]+'</b><br/><span style = "font-size: 0.8em">'+formatStart+formatEnd+'</span>',
      icon: "info"
    });
    console.log('events:', [
      { title: '정우성 / 스페이스 주다 을지센터점', start: '2023-12-18 00:00:00.000000', end: '2023-12-26 11:00:00.000000' },
      { title: '신현빈 / 302호', start: '2023-12-18 12:00:00.000000', end: '2023-12-19 14:00:00.000000' },
      { title: '이정재 / 스페이스 주다 을지센터점', start: '2023-12-25 00:00:00.000000', end: '2023-12-25 23:59:00.000000' },
      ...reserveDTO.map((reserve) => ({
        title: reserve.user_name + ' / ' + reserve.room_name,
        start: new Date(reserve.startDate), // startDate에 따라 변경 필요
        end: new Date(reserve.endDate),     // endDate에 따라 변경 필요
      })),
    ]);
  }

  return (
    <div>
      <ManagerHeader />
      <div className="container mt-5 pt-5">
        <h1>예약 현황</h1>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={(e) => handleDateClick(e)}
          defaultView="dayGridMonth" 
          events={[{ title: '정우성 / 스페이스 주다 을지센터점', start: '2023-12-18 00:00:00.000000', end: '2023-12-26 11:00:00.000000' },
          { title: '신현빈 / 302호', start: '2023-12-18 12:00:00.000000', end: '2023-12-19 14:00:00.000000' },
          { title: '이정재 / 스페이스 주다 을지센터점', start: '2023-12-25 00:00:00.000000', end: '2023-12-25 23:59:00.000000' },
          
            ...reserveDTO.map((reserve) => ({
              title: reserve.user_name + ' / ' + reserve.room_name,
              start: new Date(reserve.startDate).toLocaleDateString('en-US', {timeZone: 'Asia/Seoul'}), // startDate에 따라 변경 필요
              end: new Date(reserve.endDate).toLocaleDateString('en-US', {timeZone: 'Asia/Seoul'}),     // endDate에 따라 변경 필요
            })),
          ]}
          eventClick={(e) => handleEventClick(e)}
        />
      </div>
    </div>
  );
};

export default Reservation;
