import React, { useState } from 'react'
import { connect } from 'react-redux';
import { fetchCooks } from '../../actions/cookActions';

function CooksPage(props) {
  const { cooks } = props;

  const [cookName, setCookName] = useState('');
  const [cookTimes, setCookTimes] = useState(0);

  const getAllCooks = () => JSON.parse(localStorage.getItem('cooks')) || [];

  const onSubmit = e => {
    e.preventDefault();

    const newCook = {
      name: cookName,
      initialTimes: cookTimes,
      additionalTimes: 0
    };

    // Update local storage
    const allCooks = getAllCooks();
    allCooks.push(newCook);
    localStorage.cooks = JSON.stringify(allCooks);

    props.fetchCooks();
    setCookName('');
    setCookTimes(0);
  }

  const onDeleteCook = cook => {
    let allCooks = getAllCooks();
    allCooks = allCooks.filter(a => a.name !== cook.name);
    localStorage.cooks = JSON.stringify(allCooks);

    props.fetchCooks();
  }

  const onEditCook = cook => {
    setCookName(cook.name);
    setCookTimes(cook.initialTimes);

    onDeleteCook(cook);
  }

  return (
    <div>
      <h1>Cooks</h1>

      <form onSubmit={e => onSubmit(e)}>
        <label>Name: </label>
        <input name="name" value={cookName} onChange={e => setCookName(e.target.value)} />
        <label>Times: </label>
        <input name="times" type="number" value={cookTimes} onChange={e => setCookTimes(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      {
        cooks.map((a, i) => 
          <div key={i}>
            <h3>{a.name}: {a.initialTimes}</h3>
            <button onClick={_ => onDeleteCook(a)}>Delete</button>
            <button onClick={_ => onEditCook(a)}>Edit</button>
          </div>
        )
      }
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks
});

export default connect(mapStateToProps, { fetchCooks })(CooksPage);