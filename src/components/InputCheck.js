import React from 'react'

const InputCheck = function (props) {

  const {isSelected, id, name, checkBoxText, onCheckChange, onInputChange, value} = props;

  return (

    <div className="mb-4">

      <div className="mb-4">
        <div className="custom-control custom-checkbox mb-2">
          <input
            type="checkbox"
            className="custom-control-input"
            id={id}
            name={name}
            onChange={onCheckChange}
          />
          <label className="custom-control-label" htmlFor={id}>{checkBoxText}</label>
        </div>

        {isSelected && (
          <div className="form-group">
            <input
              name={name}
              id={id}
              type="text"
              className="mb-2 form-control"
              placeholder="Enter your profile url"
              onChange={onInputChange}
              value={value}
            />
          </div>
        )}

      </div>
    </div>
  )
};

export default InputCheck