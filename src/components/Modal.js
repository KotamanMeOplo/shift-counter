import React, { useState, Fragment } from 'react';

function Modal(props) {
  const { cooks, handleSubmit, children, open, onClose } = props;
  const [selectedCook, setSelectedCook] = useState('none');

  const submitHandler = (e, selectedCook) => {
    e.preventDefault();
    handleSubmit(selectedCook);
  }
  
  return (
    <div>
      { open &&
        <Fragment>
          <div id="backdrop" onClick={onClose} />
          <div id="modal" className="card accent-card">
            <h3 id="modal-header">
              {children}
            </h3>

            <form onSubmit={e => submitHandler(e, selectedCook)}>
              <select className="button" onChange={e => setSelectedCook(e.target.value)} value={selectedCook}>
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
        </Fragment>
      }
    </div>
  )
}

export default Modal;