import React from 'react'

import countries from "../../data/countries";
import cities from "../../data/cities";

const Result = props => {
  const { values } = props;

  console.log(values);
  return (
    <div>
      <div className="row mb-4">
        <div className="col-4">
          <img className="w-100" src={values.avatarImg} alt="avatar"/>
        </div>
        <div className="col-8">
          <h4>{values.firstName} {values.lastName}</h4>
        </div>
      </div>
      <p>
        <strong>Email: </strong>
        <span>{values.email}</span>
      </p>
      <p>
        <strong>Mobile: </strong>
        <span>{values.mobile}</span>
      </p>
      <p>
        <strong>Location: </strong>
        <span>{cities[Number(values.city)].name} {countries[values.country - 1].name}</span>
      </p>
    </div>
  )
};

export default Result