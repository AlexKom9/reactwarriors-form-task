import React, { Component } from "react";

export default class SelectCity extends Component {
  render() {
    return (
      <Select
        id="city"
        name="city"
        labelText="Chose city"
        value={values.city}
        error={errors.city}
        options={getCitiesByCountry}
        onChange={onChange}
      />
    );
  }
}
