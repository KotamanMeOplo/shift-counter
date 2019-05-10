import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addCook, deleteCook } from '../../actions/cookActions';

function CooksPage(props) {
  const { cooks } = props;

  const [cookName, setCookName] = useState('');
  const [cookTimes, setCookTimes] = useState(0);

  const onSubmit = e => {
    e.preventDefault();

    const newCook = {
      name: cookName,
      initialTimes: cookTimes,
      additionalTimes: 0
    };

    props.addCook(newCook);
    setCookName('');
    setCookTimes(0);
  }

  const onEditCook = cook => {
    setCookName(cook.name);
    setCookTimes(cook.initialTimes);

    props.deleteCook(cook);
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
            <button onClick={_ => props.deleteCook(a)}>Delete</button>
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

export default connect(mapStateToProps, { addCook, deleteCook })(CooksPage);