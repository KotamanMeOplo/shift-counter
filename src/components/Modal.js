import React, { useState } from 'react'
import { connect } from 'react-redux';
import { fetchCooks } from '../actions/cookActions';

function Modal(props) {
  const { cooks, date, fetchCooks, submitHandler } = props;
  const [selectedCook, setSelectedCook] = useState('none');

  const onSubmit = e => {
    e.preventDefault();

    const cooksCopy = [...cooks]

    for(let i = 0; i < cooksCopy.length; i ++) {
      //Delete the date from other Cooks
      if(cooksCopy[i].additionalTimes.includes(date)) {
        cooksCopy[i].additionalTimes = cooksCopy[i].additionalTimes.filter(a => a !== date);
      }

      if(cooksCopy[i].name === selectedCook) {
        cooksCopy[i].additionalTimes.push(date);
      }

    }
    
    localStorage.cooks = JSON.stringify(cooksCopy);
    fetchCooks();
    submitHandler();
  }

  return (
    <div id="modal">
      <div id="modal-header">
        <h3>The Cook on {date}</h3>
      </div>

      <form onSubmit={onSubmit}>
        <select onChange={e => setSelectedCook(e.target.value)} value={selectedCook}>
          <option name="none">none</option>
          {
            cooks.map(cook => 
                <option name={cook.name} key={cook.name}>{cook.name}</option>
            )
          }
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks
});

export default connect(mapStateToProps, { fetchCooks })(Modal);