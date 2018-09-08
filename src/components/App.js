import React from "react";
import Field from "./Field"
import Select from './Select'
import countries from '../data/countries'
import cities from '../data/cities'


export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      step: 2,
      firstName: "",
      lastName: "",
      password: "",
      repeatPassword: "",
      gender: false,
      email: "",
      mobile: "",
      country: 1,
      countryCities: [],
      city: "",
      errors: {
        firstName: false,
        lastName: false,
        password: false,
        repeatPasword: false,
        gender: false,
        email: false,
        mobile: false,
        country: false,
        city: false,
      }
    }
  }

  onChange = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  onChangeCountry = (event) => {
    console.log(event.target.value)
    this.setState({
      country: event.target.value
    })
  };




  render() {
    const {step, firstName, lastName, password, repeatPassword, email, mobile, country, city, errors} = this.state;

    console.log(country);
    const getCitiesByCountry = () => {

      console.log('start');
      let countryCities = Object.values(cities);
      console.log(countryCities);
      return countryCities.filter((elem) => {
        return elem.country === country
      });
    };

    return (
      <div className="form-container card">
        <form className="form card-body">
          {step === 1 && (
            <div>
              <Field
                id="firstName"
                name="firstName"
                labelText="Firstname"
                type="text"
                placehoder="Enter your Firstname"
                value={firstName}
                error={errors.firstName}
                onChange={this.onChange}
              />
              <Field
                id="lastName"
                name="lastName"
                labelText="lastName"
                type="text"
                placehoder="Enter your Lastname"
                value={lastName}
                error={errors.lastName}
                onChange={this.onChange}
              />
              <Field
                id="password"
                name="password"
                labelText="Enter password"
                type="password"
                placehoder="Enter your password"
                value={password}
                error={errors.password}
                onChange={this.onChange}
              />
              <Field
                id="repeatPassword"
                name="repeatPassword"
                labelText="Repeat password"
                type="password"
                placehoder="Repeat password"
                value={repeatPassword}
                error={errors.repeatPassword}
                onChange={this.onChange}
              />

              <div>Gender</div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="female"
                  name="gender"
                  value="female"
                  // checked={this.state.gender === 'female'}
                  onChange={this.onChange}/>
                <label className="form-check-label" htmlFor="female">Female</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={this.onChange}/>
                <label className="form-check-label" htmlFor="male">Male</label>
              </div>

              <div className="d-flex justify-content-around">
                <button type="button" className="btn">Prev</button>
                <button type="button" className="btn">Next</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <Field
                id="email"
                name="email"
                labelText="Enter email"
                type="text"
                placehoder="Enter your email"
                value={email}
                error={errors.email}
                onChange={this.onChange}
              />
              <Field
                id="mobile"
                name="mobile"
                labelText="Enter mobile"
                type="number"
                placehoder="Enter your mobile"
                value={mobile}
                error={errors.mobile}
                onChange={this.onChange}
              />
              <Select
                id="country"
                name="country"
                labelText="Chose country"
                value={country}
                error={errors.country}
                options={countries}
                onChange={this.onChangeCountry}
              />

              <Select
              id="city"
              name="city"
              labelText="Chose city"
              value={city}
              error={errors.city}
              options={getCitiesByCountry()}
              onChange={this.onChangeCity}
              />
            </div>
          )}

        </form>
      </div>
    );
  };
  componentDidMount(){
    console.log()
  }
}
