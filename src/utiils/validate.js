const validate = (values, activeStep) => {
  const {firstName, lastName, password, repeatPassword, gender, email, mobile, city, avatar} = values;
  const errors = {};

  switch (activeStep) {
    case 0:
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
      if (Number(city) === 0) {
        errors.city = "Chose your city"
      }
      //url validation
      const urlRegExp = new RegExp('^(https?:\/\/)?'+ // protocol
        '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
        '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
        '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
        '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
        '(\#[-a-z\d_]*)?$','i'); // fragment locater
      const socials = this.state.values.socials;
      for (let key in socials){
        if(socials[key].selected){
        //todo: validation
        }
      }

      break;
    case 2:
      if (!avatar) {
        errors.avatar = "Upload your avatar"
      }
      break;
  }
  return errors
};
export default validate