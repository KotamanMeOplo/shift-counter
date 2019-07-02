import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';

const getTable = cooks => cooks.map(cook => [cook, true, true, true, true, true, true, true]);

// Returns array with cooks for each day which has only one cook else returns previous value of day
const getResults = (table, changedDay = -1, def = ['n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a']) => {
  const cooksPerDay = table.reduce((pr, cur) => {
    for(let i = 1; i <= 7; i ++) {
      if(cur[i]) {
        pr[i - 1].push(cur[0]);
      }
    }

    return pr;
  }, [[], [], [], [], [], [], []]);
  
  const results = def;
  cooksPerDay.forEach((a, i) => {
    if(a.length === 1) {
      results[i] = a[0];
    } else if(results[i] !== 'n/a') {
      const isCurrentCookAvailable = a.findIndex(a => a === results[i]) === -1;
      if(isCurrentCookAvailable) {
        results[i] = 'n/a';
      }
    }
  });

  return results;
}

function PlannerPage(props) {
  const { cooks } = props;
  const [table, setTable] = useState(getTable(cooks));
  const [results, setResults] = useState(getResults(table));
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [availableCooks, setAvailableCooks] = useState([]);
  
  const tableHeading = ['N/A', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const invertDay = (i, j) => {
    const tableCopy = [...table];
    tableCopy[i][j] = !tableCopy[i][j];
    setTable(tableCopy);
    setResults(getResults(table, j, results));
  }

  const handleResultDayClick = dayIndex => {
    setSelectedDay(tableHeading[dayIndex + 1]);
    const currentCooks = [];
    for(let i of table) {
      if(i[dayIndex + 1]) {
        currentCooks.push(i[0]);
      }
    }
    setAvailableCooks(currentCooks);
    setModalVisibility(true);
  }

  const handleCookSelection = cook => {
    const dayIndex = tableHeading.findIndex(a => a === selectedDay);
    const resultsCopy = [...results];
    resultsCopy[dayIndex - 1] = cooks.filter(a => a.name === cook)[0];
    setResults(resultsCopy);

    setModalVisibility(false);
  }

  return (
    <div>
      <Modal
        open={modalVisibility}
        onClose={_ => setModalVisibility(false)}
        handleSubmit={cook => handleCookSelection(cook)}
        cooks={availableCooks}
      >
        Cook on {selectedDay}
      </Modal>

      <h1>Planner</h1>

      <table>
        <thead>
          <tr>
            {
              tableHeading.map((a, i) => <th key={i}>{a[0]}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            table.map((a, i) => 
              <tr key={i}>
                {
                  a.map((b, j) => {
                    let node;
                    if(j === 0) {
                      node = b.name;
                    } else if(b) {
                      node = <button style={{backgroundColor: 'green'}} onClick={_ => invertDay(i, j)}>I</button>
                    } else {
                      node = <button style={{backgroundColor: 'red'}} onClick={_ => invertDay(i, j)}>0</button>
                    }
                    
                    return (
                      <td key={j}>{node}</td>
                    )
                  })
                }
              </tr>
            )
          }

          <tr>
            <td></td>
            {
              results.map((a, i) => 
                <td key={i}>
                  <button
                    style={{backgroundColor: a.color || 'transparent'}}
                    onClick={_ => handleResultDayClick(i)}
                  >
                    {a.name ? a.name[0] : a}
                  </button>
                </td>
              )
            }
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks
});

export default connect(mapStateToProps, null)(PlannerPage);