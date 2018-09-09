import React from 'react'
import Field from '../Field'

const MainInfo = props => {
  const { values, errors, onChange } = props;

  console.log(values);
  return (
    <div>
      <Field
        id="firstName"
        name="firstName"
        labelText="Firstname"
        type="text"
        placehoder="Enter your Firstname"
        value={values.firstName}
        error={errors.firstName}
        onChange={onChange}
      />
      <Field
        id="lastName"
        name="lastName"
        labelText="lastName"
        type="text"
        placehoder="Enter your Lastname"
        value={values.lastName}
        error={errors.lastName}
        onChange={onChange}
      />
      <Field
        id="password"
        name="password"
        labelText="Enter password"
        type="password"
        placehoder="Enter your password"
        value={values.password}
        error={errors.password}
        onChange={onChange}
      />
      <Field
        id="repeatPassword"
        name="repeatPassword"
        labelText="Repeat password"
        type="password"
        placehoder="Repeat password"
        value={values.repeatPassword}
        error={errors.repeatPassword}
        onChange={onChange}
      />
      <div>
        <span>Gender</span>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="female"
            name="gender"
            value="female"
            onChange={onChange}/>
          <label className="form-check-label" htmlFor="female">Female</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="male"
            name="gender"
            value="male"
            onChange={onChange}/>
          <label className="form-check-label" htmlFor="male">Male</label>
        </div>
        {errors.gender ? <div className="invalid-feedback">{errors.gender}</div> : ''}
      </div>
    </div>
  )
};

export default MainInfo