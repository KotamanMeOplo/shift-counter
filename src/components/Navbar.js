import React from 'react'
import { connect } from 'react-redux';
import { changePage } from '../actions/pageActions';

function Navbar(props) {
  const onClickButton = (e) => {
    props.changePage(e.target.innerHTML);
  };

  return (
    <nav>
      {
        ['Calendar', 'Cooks', 'Planner', 'Info'].map(a =>
          <button onClick={onClickButton}>{a}</button>
        )
      }
    </nav>
  )
};

export default connect(null, { changePage })(Navbar);
