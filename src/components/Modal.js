import React, { useState } from 'react'
import { connect } from 'react-redux';
import { fetchCooks } from '../actions/cookActions';

function Modal(props) {
  const { cooks, handleSubmit, children } = props;
  const [selectedCook, setSelectedCook] = useState('none');

  const submitHandler = (e, selectedCook) => {
    e.preventDefault();
    handleSubmit(selectedCook);
  }
  return (
    <div id="modal">
      <div id="modal-header">
        {children}
      </div>

      <form onSubmit={e => submitHandler(e, selectedCook)}>
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