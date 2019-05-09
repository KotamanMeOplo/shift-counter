import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addCook } from '../../actions/cookActions';

function CooksPage(props) {
  const { cooks } = props;

  const [cookName, setCookName] = useState('');
  const [cookTimes, setCookTimes] = useState(0);

  const onSubmit = e => {
    e.preventDefault();

    const newCook = {
      name: cookName,
      initialTimes: cookTimes
    };

    props.addCook(newCook);
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
        cooks.map(a => 
          <h3>{a.name}: {a.initialTimes}</h3>
        )
      }
    </div>
  )
}

const mapStateToProps = state => ({
  cooks: state.cooks
});

export default connect(mapStateToProps, { addCook })(CooksPage);