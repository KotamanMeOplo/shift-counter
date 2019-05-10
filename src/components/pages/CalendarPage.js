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
      <h3>Calendar</h3>

      <div>
        <button onClick={_ => onArrowClick(-1)}>&lt;</button>
      { months[month] } { year }
      <button onClick={_ => onArrowClick(1)}>&gt;</button>
      </div>
      <Calendar month={month} year={year} />

      {
        cooks.map(cook => 
          <div>
            <h3><div className="cook-color" style={{backgroundColor: cook.color}} />: {cook.name} => {cook.initialTimes + cook.additionalTimes.length}</h3>
          </div>
        )
      }
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks
});

export default connect(mapStateToProps, null)(CalendarPage);