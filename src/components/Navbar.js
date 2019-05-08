import React from 'react'
import { connect } from 'react-redux';
import { changePage } from '../actions/pageActions';

function Navbar(props) {
  const { curPage } = props;

  const onSelect = (e) => {
    props.changePage(e.target.value);
  };

  return (
    <div>
      <select name="pages" onChange={onSelect}>
        <option value="calendar">Calendar</option>
        <option value="cooks">Cooks</option>
        <option value="planner">Planner</option>
      </select>
      {curPage}
    </div>
  )
};

const mapStateToProps = state => ({
  curPage: state.page
});

export default connect(mapStateToProps, { changePage })(Navbar);
