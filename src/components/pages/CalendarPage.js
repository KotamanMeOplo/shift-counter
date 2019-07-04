import React, { useState } from 'react';
import { connect } from 'react-redux';
import Calendar from '../Calendar';

function CalendarPage(props) {
  const { cooks } = props;

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
      <h1>Calendar</h1>

      <div id="calendar-controls">
        <button onClick={_ => onArrowClick(-1)}>&lt;</button>
        <h4 id="calendar-month-year">{ months[month] } { year }</h4>
        <button onClick={_ => onArrowClick(1)}>&gt;</button>
      </div>
      <Calendar month={month} year={year} />

      <div id="calendar-cooks" className="card light-card">
        <h5 id="calendar-stats-heading">COOK TIMES</h5>
        {
          cooks.map(cook => 
              <h3 key={cook.name}><div className="cook-color" style={{backgroundColor: cook.color}} />: {cook.name} => {cook.initialTimes + cook.additionalTimes.length}</h3>
          )
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks
});

export default connect(mapStateToProps, null)(CalendarPage);