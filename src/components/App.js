import React from "react";
//steps import
import MainInfo from './steps/MainInfo'
import ContactsInfo from './steps/ContactsInfo'
import Avatar from './steps/Avatar'
import Result from './steps/Result'


import validate from '../utiils/validate'

import cities from '../data/cities'


const initialState = {
  activeStep: 1,
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
    socials: {
      facebook: {
        selected: false,
        url: null,
      },
      instagram: {
        selected: false,
        url: null,
      },
      linkedIn: {
        selected: false,
        url: null,
      }
    }


  },
  steps: [
    {
      isActive: false,
      isCompleted: false,
    },
    {
      isActive: true,
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
    socials: {
      facebook: false,
      instagram: false,
      linkedIn: false,
    }
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
    const {activeStep, values, steps} = this.state;

    const errors = validate(values, activeStep);

    this.setState({
      errors: errors
    });

    if (!Object.values(errors).length && activeStep < 3) {


      const newSteps = [...steps];

      newSteps[this.state.activeStep] = {
        isActive: false,
        isCompleted: true,
      };
      newSteps[this.state.activeStep + 1] = {
        isActive: true,
        isCompleted: false,
      };
      // console.log(newSteps);

      this.setState({
        activeStep: this.state.activeStep + 1,
        steps: newSteps
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


  onChangeSocials = (event) => {
    console.dir(event.target.checked);
    const newValues = {...this.state.values};
    newValues['socials'][event.target.name]['selected'] = event.target.checked;
    this.setState({
      values: newValues
    });
  };

  onChangeSocialUrl = (event) => {
    console.log(event.target.value);
    console.log('-----name ---', event.target.name)
    const newValues = {...this.state.values};
    newValues['socials'][event.target.name].url = event.target.value;
    this.setState({
      values: newValues
    })
  };

  render() {
    const {activeStep, values, values: {socials}, errors, steps} = this.state;

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

          <div>

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
                getCitiesByCountry={this.getCitiesByCountry()}
                onChangeSocials={this.onChangeSocials}
                onChangeSocialUrl={this.onChangeSocialUrl}
                />
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
    )
  };

  componentDidMount() {
    console.log()
  }
}
