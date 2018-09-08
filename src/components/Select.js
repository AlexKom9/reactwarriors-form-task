import React from 'react'

const Select = (props) => {
  const {id, name, value, options, onChange} = props;

  console.log(typeof options);

  const getOptionItems = (items) => items.map(item => (
    <option
      key={item.id}
      value={item.id}>
      {item.name}
    </option>
  ));


  return (
    <div className="form-group">
      <label htmlFor="country">Country</label>
      <select
        className="form-control"
        id={id}
        name={name}
        value={value}
        onChange={onChange}>
        {getOptionItems(options)}
      </select>
    </div>
  )
};

export default Select