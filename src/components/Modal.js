import React, { useState, Fragment } from 'react';

function Modal(props) {
  const { cooks, handleSubmit, children, open, onClose } = props;
  const [selectedCook, setSelectedCook] = useState('None');

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
              <label className="radio">
                <input
                  type="radio"
                  name="cooks"
                  value="None" 
                  onChange={_ => setSelectedCook('None')}
                  checked={selectedCook === 'None'}
                />
                None
              </label>
              {
                cooks.map(cook => 
                  <label className="radio">
                    <input
                      type="radio"
                      name="cooks"
                      value={cook.name}
                      key={cook.name}
                      onChange={e => setSelectedCook(e.target.value)}
                      checked={selectedCook === cook.name}
                    />
                    { cook.name }
                  </label>
                )
              }
              <button type="submit">Submit</button>
            </form>
          </div>
        </Fragment>
      }
    </div>
  )
}

export default Modal;