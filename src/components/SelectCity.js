import React, { Component } from "react";

export default class SelectCity extends Component {
  getCitiesByCountry = () => {
    const { country } = this.props.country;

    let countryCitiesFiltered = [{ id: 0, name: "Select city" }];

    for (let key in cities) {
      if (Number(cities[key].country) === Number(country)) {
        const cityData = {
          id: key,
          name: cities[key].name
        };
        countryCitiesFiltered.push(cityData);
      }
    }
    return countryCitiesFiltered;
  };

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
