import React from 'react'
import { connect } from 'react-redux';
import { changePage } from '../actions/pageActions';

function Navbar(props) {
  const onClickButton = (e) => {
    props.changePage(e.target.innerHTML);
  };

  return (
    <nav>
      <button onClick={onClickButton}>Calendar</button>
      <button onClick={onClickButton}>Cooks</button>
      <button onClick={onClickButton}>Planner</button>
    </nav>
  )
};

export default connect(null, { changePage })(Navbar);
