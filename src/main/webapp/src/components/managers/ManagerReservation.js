import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Reservation = () => {
  const handleDateClick = (e) => {
    alert(e.dateStr);
  };

  return (
    <div className="container mt-5 pt-5">
      <h1>예약 현황</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={(e) => handleDateClick(e)}
        defaultView="dayGridMonth"
      />
    </div>
  );
};

export default Reservation;