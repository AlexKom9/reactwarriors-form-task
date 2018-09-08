import React from "react";
import Field from "./Field"
import Select from './Select'
import countries from '../data/countries'
import cities from '../data/cities'


export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      activeStep: 4,
      firstName: "",
      lastName: "",
      password: "",
      repeatPassword: "",
      gender: null,
      email: "",
      mobile: "",
      country: 1,
      countryCities: [],
      city: 0,
      avatar: false,
      avatarName: false,
      avatarImg: null,
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
        avatar: false,
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
    console.log(event.target.value);
    this.setState({
      country: event.target.value
    })
  };

  onChangeAvatar = (event) => {
    const file = event.target.files[0];
    this.setState({
      avatar: true,
      avatarName: file.name
    });
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.setState({
        avatarImg: reader.result
      })
    };
    console.log(file);
  };

  getCitiesByCountry = () => {
    const {country} = this.state;

    let countryCities = Object.values(cities);
    let countryCitiesFiltered = [{id: 0, name: "Select city"}];

    countryCities.forEach((elem, index) => {
      if (Number(elem.country) === Number(country)) {
        const cityData = {
          id: index + 1,
          name: elem.name
        };

        countryCitiesFiltered.push(cityData)
      }
    });
    return countryCitiesFiltered
  };

  nextStep = () => {
    let errors = {};
    switch (this.state.activeStep) {
      case 1:
        if (!this.state.firstName.length) {
          errors.firstName = "Please enter your First Name"
        }
        if (!this.state.lastName.length) {
          errors.lastName = "Please enter your Last Name"
        }
        if (this.state.password.length < 5) {
          errors.password = "password must be at least 5 symbols"
        }
        if (this.state.password !== this.state.repeatPassword) {
          errors.repeatPassword = "Password must be the same"
        }
        if (!this.state.gender) {
          errors.gender = "Required"
        }
        break;

      case 2:
        //email validate
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!this.state.email.length) {
          errors.email = "Enter you email"
        } else if (!re.test(this.state.email)) {
          errors.email = "Enter correct email"
        }
        // phone validate
        const phoneRegExp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (this.state.mobile.length === 0) {
          errors.mobile = "Enter mobile"
        } else if (!this.state.mobile.match(phoneRegExp)) {
          errors.mobile = "Enter correct mobile"
        }
        //city validate
        console.log(typeof this.state.city);
        if (this.state.city === 0) {
          errors.city = "Chose your city"
        }
      case 3:
        if (!this.state.avatar) {
          errors.avatar = "Upload your avatar"
        }
    }

    this.setState({
      errors: errors
    });

    console.log(Object.values(errors).length);
    if (!Object.values(errors).length && this.state.activeStep < 4) {
      console.log('next');
      this.setState({
        activeStep: this.state.activeStep + 1
      })
    }

  };
  prevStep = () => {
    if (this.state.activeStep > 1) {
      this.setState({
        activeStep: this.state.activeStep - 1
      })
    }
  };

  resetData = () => {
    this.setState({
      activeStep: 1
    })
  };


  render() {
    const {
      activeStep,
      firstName,
      lastName,
      password,
      repeatPassword,
      email,
      mobile,
      country,
      city,
      avatarName,
      avatarImg,
      errors
    } = this.state;


    return (
      <div className="form-container card">
        <form className="form card-body">
          <div className="steps mb-4">
            <div className={"step " + (activeStep === 1 ? 'active' : '')}>
              <span>1</span>
            </div>
            <div className={"step " + (activeStep === 2 ? 'active' : '')}>
              <span>2</span>
            </div>
            <div className={"step " + (activeStep === 3 ? 'active' : '')}>
              <span>3</span>
            </div>
            <div className={"step " + (activeStep === 4 ? 'active' : '')}>
              <span>4</span>
            </div>
          </div>
          <div className="mb-4">
            {activeStep === 1 && (
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


                <div>
                  <span>Gender</span>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="female"
                      name="gender"
                      value="female"
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
                  {errors.gender ? <div className="invalid-feedback">{errors.gender}</div> : ''}
                </div>
              </div>
            )}

            {activeStep === 2 && (
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
                  options={this.getCitiesByCountry()}
                  onChange={this.onChange}
                />
              </div>
            )}
            {activeStep === 3 && (
              <div>
                <img className="w-100 mb-4" src={!avatarImg ? "img/default-avatar.png" : avatarImg} alt="avatar"/>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="avatar"
                    onChange={this.onChangeAvatar}
                  />
                  <label className="custom-file-label" htmlFor="avatar">{avatarName ? avatarName : "Choose" +
                    " avatar..."}</label>
                  {this.state.errors.avatar ? <div className="invalid-feedback">{errors.avatar}</div> : ''}

                </div>
              </div>
            )}
            {activeStep === 4 && (
              <div>
                {/*<h2>Step four !</h2>*/}
                <div className="row mb-4">
                  <div className="col-4">
                    <img className="w-100" src={avatarImg} alt="avatar"/>
                  </div>
                  <div className="col-8">
                    <h4>{firstName} {lastName}</h4>
                  </div>
                </div>
                <p>
                  <strong>Email:</strong>
                  <span>{email}</span>
                </p>
                <p>
                  <strong>Mobile:</strong>
                  <span>{mobile}</span>
                </p>
                <p>
                  <strong>Location:</strong>
                  <span>{cities[Number(city)]} {countries[Number(country)]}</span>
                </p>
              </div>
            )}
          </div>
          <div className="">
            {activeStep !== 4 && (
              <div className="d-flex justify-content-around">
                <button
                  type="button"
                  className="btn"
                  onClick={this.prevStep}>
                  Prev
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={this.nextStep}>
                  Next
                </button>
              </div>
            )}
            {activeStep === 4 && (
              <div className="d-flex justify-content-around">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.resetData}>
                  Reset
                </button>
              </div>
            )}
          </div>

        </form>
      </div>
    );
  };

  componentDidMount() {
    console.log()
  }
}
