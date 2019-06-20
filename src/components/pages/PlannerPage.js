import React, { useState } from 'react';
import { connect } from 'react-redux';

const getTable = cooks => cooks.map(cook => [cook, true, true, true, true, true, true, true]);

// Find days where only one cook's available and assign him to said day
const getResults = (table, changedDay = -1, def = ['', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a']) => {  
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
      results[i + 1] = a[0];
    } else if(i === changedDay - 1) {
      results[i + 1] = 'n/a';
    }
  });

  return results;
}

function PlannerPage(props) {
  const { cooks } = props;
  const [table, setTable] = useState(getTable(cooks));
  const [results, setResults] = useState(getResults(table));

  const tableHeading = ['N/A', 'M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const invertDay = (i, j) => {
    const tableCopy = [...table];
    tableCopy[i][j] = !tableCopy[i][j];
    setTable(tableCopy);
    setResults(getResults(table, j, results));
  }

  const chingeRes = _ => {
    const arr = [];
    for(let i = 0; i < 7; i ++) {
      arr.push(i);
    }
    setResults(arr);
  }

  return (
    <div>
      <h1>Planner</h1>

      <table>
        <thead>
          <tr>
            {
              tableHeading.map((a, i) => <th key={i}>{a}</th>)
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

          {
            results.map((a, i) => 
              <td key={i}>
                <button style={{backgroundColor: a.color || 'transparent'}} onClick={chingeRes}>{a.name ? a.name[0] : a}</button>
              </td>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks
});

export default connect(mapStateToProps, null)(PlannerPage);