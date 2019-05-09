import React from 'react'
import { connect } from 'react-redux';
import { changePage } from '../actions/pageActions';

function Navbar(props) {
  const { curPage } = props;

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

const mapStateToProps = state => ({
  curPage: state.page
});

export default connect(mapStateToProps, { changePage })(Navbar);
