import React from 'react'
import { connect } from 'react-redux';
import CalendarPage from './pages/CalendarPage';
import CooksPage from './pages/CooksPage';
import PlannerPage from './pages/PlannerPage';

function Content(props) {
  return (
    <div id='content'>
      {
        props.page === 'Calendar' &&
        <CalendarPage />
      }
      {
        props.page === 'Cooks' &&
        <CooksPage />
      }
      {
        props.page === 'Planner' &&
        <PlannerPage />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  page: state.page
});

export default connect(mapStateToProps, null)(Content);