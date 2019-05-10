import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux';
import Modal from './Modal';

function Calendar(props) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfTheWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const { month, year, cooks } = props;

  const firstDayOfTheMonth = new Date(year, month, 1);
  const lastDayOfTheMonth = new Date(year, month + 1, 0);
  const numDayOfMonth = lastDayOfTheMonth.getDate();

  const dateTable = [[]];
  for(let i = 1; i < firstDayOfTheMonth.getDay(); i ++) {
    dateTable[0].push('');
  }

  let i = 1;
  let iteration = 0;
  while(i < numDayOfMonth) {
    if(iteration > 0) {
      dateTable.push([]);
    }

    for(let j = dateTable[iteration].length; j < 7 && i <= numDayOfMonth; j ++) {
      dateTable[iteration].push(i ++);
    }
    iteration ++;
  }

  const numOfWeeks = dateTable.length;
  for(let j = dateTable[numOfWeeks - 1].length; j < 7; j ++) {
    dateTable[numOfWeeks - 1].push('');
  }

  const onDateClick = date => {
    setSelectedDate([date, month + 1, year].join('/'));
    setModalVisibility(true);
  }

  return (
    <div>
      {
        modalVisibility &&
        <Fragment>
          <div id="backdrop" onClick={_ => setModalVisibility(false)} />
          <Modal date={selectedDate} submitHandler={_ => setModalVisibility(false)} />
        </Fragment>
      }

      <table>
        <thead>
          <tr>
            { daysOfTheWeek.map((a, i) => <th key={i}>{a}</th>) }
          </tr>
        </thead>
        <tbody>
          {
            dateTable.map((week, i) => (
              <tr key={i}>
                { week.map((date, j) => {
                  const now = new Date();
                  const dateIsToday = date === now.getDate() && month === now.getMonth() && year === now.getFullYear();

                  const fullDate = [date, month + 1, year].join('/');
                  const bgColor = cooks.reduce((pr, cur) => {
                    if(cur.additionalTimes.includes(fullDate)) {
                      return cur.color;
                    } else {
                      return pr
                    }
                  }, 'white');

                  const style = {
                    borderWidth: dateIsToday ? '5px' : '0px',
                    backgroundColor: bgColor
                  };

                  return (
                    <td key={j}>
                      <button style={style} onClick={_ => onDateClick(date)}>{date}</button>
                    </td>
                  );
                }) }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks
});

export default connect(mapStateToProps, null)(Calendar);