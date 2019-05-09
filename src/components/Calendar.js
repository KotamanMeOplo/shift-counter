import React from 'react'

function Calendar(props) {
  const daysOfTheWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const { month, year } = props;
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

  return (
    <div>
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
                { week.map((date, j) => <td key={j}>{date}</td>) }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Calendar;