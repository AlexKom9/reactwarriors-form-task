import React from 'react'

const Field = props => {
  const { id, labelText, type, placeholder, value, name, error, onChange } = props;
  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
      {error ? <div className="invalid-feedback">{error}</div> : ''}
    </div>
  )
};

export default Field