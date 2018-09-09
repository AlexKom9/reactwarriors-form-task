import React from 'react'
import Field from '../Field'
import Select from '../Select'
import InputCheck from '../InputCheck'

import countries from "../../data/countries";

const ContactsInfo = props => {
  const {values, values:{socials}, errors, onChange, onChangeCountry, getCitiesByCountry, onChangeSocials} = props;

  console.log(values);
  return (
    <div>
      <Field
        id="email"
        name="email"
        labelText="Enter email"
        type="text"
        placehoder="Enter your email"
        value={values.email}
        error={errors.email}
        onChange={onChange}
      />
      <Field
        id="mobile"
        name="mobile"
        labelText="Enter mobile"
        type="number"
        placehoder="Enter your mobile"
        value={values.mobile}
        error={errors.mobile}
        onChange={onChange}
      />

      <Select
        id="country"
        name="country"
        labelText="Chose country"
        value={values.country}
        error={errors.country}
        options={countries}
        onChange={onChangeCountry}
      />

      <Select
        id="city"
        name="city"
        labelText="Chose city"
        value={values.city}
        error={errors.city}
        options={getCitiesByCountry}
        onChange={onChange}
      />

      <InputCheck
        isSelected={socials.facebook.selected}
        name="facebook"
        id="facebook"
        checkBoxText="FaceBook"
        onCheckChange={onChangeSocials}
        onCheckInputChange={this.onChange}
        error={errors.socials.facebook}
      />

      <InputCheck
        isSelected={socials.instagram.selected}
        name="instagram"
        id="instagramm"
        checkBoxText="Instagram"
        onCheckChange={onChangeSocials}
        onCheckInputChange={this.onChange}
        error={errors.socials.instagram}
      />
      <InputCheck
        isSelected={socials.linkedIn.selected}
        name="linkedIn"
        id="linkedIn"
        checkBoxText="LinkedIn"
        onCheckChange={onChangeSocials}
        onCheckInputChange={this.onChange}
        error={errors.socials.linkedIn}
      />
    </div>
  )
};

export default ContactsInfo