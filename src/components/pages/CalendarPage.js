import React, { useState } from 'react';
import Calendar from '../Calendar';

function CalendarPage() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();

  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const onArrowClick = dir => {
    let newMonth = month + dir;
    let newYear = year;

    if(newMonth === 12) {
      newMonth = 0;
      newYear ++;
    } else if(newMonth === -1) {
      newMonth = 11;
      newYear --;
    }

    setMonth(newMonth);
    setYear(newYear);
  }

  return (
    <div>
      <h3>Calendar</h3>

      <div>
        <button onClick={_ => onArrowClick(-1)}>&lt;</button>
      { months[month] } { year }
      <button onClick={_ => onArrowClick(1)}>&gt;</button>
      </div>
      <Calendar month={month} year={year} />
    </div>
  )
}

export default CalendarPage;