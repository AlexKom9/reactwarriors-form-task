import React from 'react'

const Select = (props) => {
  const {id, name, value, options, onChange, error} = props;

  console.log(options);

  const getOptionItems = (items) => items.map(item => (
    <option
      key={item.id}
      value={item.id}>
      {item.name}
    </option>
  ));


  return (
    <div className="form-group">
      <label htmlFor={id}>Country</label>
      <select
        className="form-control"
        id={id}
        name={name}
        value={value}
        onChange={onChange}>
        {getOptionItems(options)}
      </select>
      {error ? <div className="invalid-feedback">{error}</div> : ''}
    </div>
  )
};

export default Select