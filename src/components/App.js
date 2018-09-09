import React from "react";
import Field from "./Field"
import Select from './Select'
//steps import
import MainInfo from './steps/MainInfo'
import ContactsInfo from './steps/ContactsInfo'
import Avatar from './steps/Avatar'
import Result from './steps/Result'

import countries from '../data/countries'
import cities from '../data/cities'


const initialState = {
  activeStep: 0,
  values: {
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
  },
  steps: [
    {
      isActive: true,
      isCompleted: false,
    },
    {
      isActive: false,
      isCompleted: false,
    },
    {
      isActive: false,
      isCompleted: false,
    },
    {
      isActive: false
    }

  ]
  ,
  errors: {
    firstName: false,
    lastName: false,
    password: false,
    repeatPassword: false,
    gender: false,
    email: false,
    mobile: false,
    country: false,
    city: false,
    avatar: false,
  }
};

export default class App extends React.Component {


  constructor() {
    super();
    this.state = {...initialState};
  }

  onChange = (event) => {
    console.log(event.target.value);
    const values = {
      ...this.state.values,
      [event.target.name]: event.target.value
    };
    this.setState((prevState) => ({
      values: values
    }))
  };

  onChangeCountry = (event) => {
    console.log(event.target.value);
    const values = {
      ...this.state.values,
      country: event.target.value
    };
    this.setState({
      values: values
    })
  };

  onChangeAvatar = (event) => {
    const file = event.target.files[0];
    const values = {
      ...this.state.values,
      avatar: true,
      avatarName: file.name
    };

    this.setState({
      values: values
    });
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const values = {
        ...this.state.values,
        avatarImg: reader.result
      };

      this.setState({
        values: values
      })
    };
  };

  getCitiesByCountry = () => {
    const {country} = this.state.values;

    let countryCitiesFiltered = [{id: 0, name: "Select city"}];

    for (let key in cities) {
      console.log('key -- ', key);
      console.log('city -- ', cities[key])
      if (Number(cities[key].country) === (Number(country))) {
        const cityData = {
          id: key,
          name: cities[key].name
        };
        countryCitiesFiltered.push(cityData)
      }
    }
    return countryCitiesFiltered
  };

  nextStep = () => {
    let errors = {};
    const {activeStep, values, values: {firstName, lastName, password, repeatPassword, gender, email, mobile, city, avatar}, steps} = this.state;
    console.log('active step  ---- ', activeStep);

    switch (activeStep) {
      case 0:
        console.log('case 1')
        if (!firstName.length) {
          errors.firstName = "Please enter your First Name"
        }
        if (!lastName.length) {
          errors.lastName = "Please enter your Last Name"
        }
        if (password.length < 5) {
          errors.password = "password must be at least 5 symbols"
        }
        if (repeatPassword.length === 0) {
          errors.repeatPassword = "repeat password"
        } else if (password !== repeatPassword) {
          errors.repeatPassword = "Password must be the same"
        }
        if (!gender) {
          errors.gender = "Required"
        }
        break;

      case 1:
        //email validate
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.length) {
          errors.email = "Enter you email"
        } else if (!re.test(email)) {
          errors.email = "Enter correct email"
        }
        // phone validate
        const phoneRegExp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (mobile.length === 0) {
          errors.mobile = "Enter mobile"
        } else if (!mobile.match(phoneRegExp)) {
          errors.mobile = "Enter correct mobile"
        }
        //city validate
        console.log(typeof this.state.city);
        if (Number(city) === 0) {
          errors.city = "Chose your city"
        }
        break;
      case 2:
        if (!avatar) {
          errors.avatar = "Upload your avatar"
        }
        break;
    }

    this.setState({
      errors: errors
    });

    if (!Object.values(errors).length && activeStep < 3) {
      const steps = [...this.state.steps];

      steps[this.state.activeStep] = {
        isActive: false,
        isCompleted: true,
      };
      steps[this.state.activeStep + 1] = {
        isActive: true,
        isCompleted: false,
      };

      this.setState({
        activeStep: this.state.activeStep + 1,
        steps: steps
      })
    }

  };
  prevStep = () => {
    if (this.state.activeStep > 0) {

      const steps = [...this.state.steps];

      steps[this.state.activeStep] = {
        isActive: false,
        isCompleted: false,
      };
      steps[this.state.activeStep - 1] = {
        isActive: true,
        isCompleted: false,
      };

      this.setState({
        activeStep: this.state.activeStep - 1,
        steps: steps
      })
    }
  };

  resetData = () => {
    this.setState(initialState)
  };


  render() {
    const {activeStep, values, errors, steps} = this.state;

    return (
      <div className="form-container card">
        <form className="form card-body">
          <div className="steps mb-4">
            <div className={"step " + (steps[0].isActive || steps[0].isCompleted ? 'active' : '')}>
              <span>1</span>
            </div>
            <div className={"step " + (steps[1].isActive || steps[1].isCompleted ? 'active' : '')}>
              <span>2</span>
            </div>
            <div className={"step " + (steps[2].isActive || steps[2].isCompleted ? 'active' : '')}>
              <span>3</span>
            </div>
            <div className={"step " + (steps[3].isActive || steps[3].isCompleted ? 'active' : '')}>
              <span>4</span>
            </div>
          </div>

          <div className="mb-4">
            {steps[0].isActive && (
              <MainInfo
                values={values}
                errors={errors}
                onChange={this.onChange}/>
            )}

            {steps[1].isActive && (
              <ContactsInfo
                values={values}
                errors={errors}
                onChange={this.onChange}
                onChangeCountry={this.onChangeCountry}
                getCitiesByCountry={this.getCitiesByCountry()}/>
            )}
            {steps[2].isActive && (
              <Avatar
                values={values}
                errors={errors}
                onChangeAvatar={this.onChangeAvatar}
              />
            )}
            {steps[3].isActive && (
              <Result
                values={values}
              />
            )}
          </div>
          <div className="">
            {activeStep !== 3 && (
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
            {activeStep === 3 && (
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
  }
  ;

  componentDidMount() {
    console.log()
  }
}
