import React, { useState } from 'react'
import { connect } from 'react-redux';
import { fetchCooks } from '../../actions/cookActions';

function CooksPage(props) {
  const { cooks, fetchCooks } = props;

  const [cookName, setCookName] = useState('');
  const [cookTimes, setCookTimes] = useState(0);
  const [cookAdditionalTimes, setAdditionalTimes] = useState([]);
  const [cookColor, setCookColor] = useState('#000');

  const getAllCooks = () => JSON.parse(localStorage.getItem('cooks')) || [];

  const onSubmit = e => {
    e.preventDefault();
    
    const newCook = {
      name: cookName,
      initialTimes: parseInt(cookTimes),
      additionalTimes: cookAdditionalTimes,
      color: cookColor
    };

    // Update local storage
    const allCooks = getAllCooks();
    allCooks.push(newCook);
    localStorage.cooks = JSON.stringify(allCooks);

    fetchCooks();
    setCookName('');
    setCookTimes(0);
  }

  const onDeleteCook = cook => {
    let allCooks = getAllCooks();
    allCooks = allCooks.filter(a => a.name !== cook.name);
    localStorage.cooks = JSON.stringify(allCooks);

    fetchCooks();
  }

  const onEditCook = cook => {
    setCookName(cook.name);
    setCookTimes(cook.initialTimes);
    setAdditionalTimes(cook.additionalTimes);
    setCookColor(cook.color);

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
        <label>Color:</label>
        <input name="color" type="color" onChange={e => setCookColor(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      {
        cooks.map((a, i) => 
          <div key={i} className="cook-block">
            <h3 className="cook-info">{a.name}: {a.initialTimes}</h3>
            <div className="cook-color" style={{backgroundColor: a.color}} />
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