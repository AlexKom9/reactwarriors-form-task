import React from "react";
import Field from "../Field";
import Select from "../Select";
import InputCheck from "../InputCheck";

import countries from "../../data/countries";

const ContactsInfo = props => {
  const {
    values,
    values: { socials },
    errors,
    onChange,
    onChangeCountry,
    getCitiesByCountry,
    onChangeSocials,
    onChangeSocialUrl
  } = props;

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
        countryId={values.country}
        value={values.city}
        error={errors.city}
        options={getCitiesByCountry}
        onChange={onChange}
      />
      {/*
      [{
        isSelected: socials.facebook.selected
        name: "facebook",
        id="facebook"
        checkBoxText="FaceBook"
        onCheckChange={onChangeSocials}
        onInputChange={onChangeSocialUrl}
        error={errors.socials.facebook}
        value={socials.facebook.url}
      }].map(input => (
        <InputCheck
          {...input}
        />
        <InputCheck
          isSelected={socials.facebook.selected}
          name="facebook"
          id="facebook"
          checkBoxText="FaceBook"
          onCheckChange={onChangeSocials}
          onInputChange={onChangeSocialUrl}
          error={errors.socials.facebook}
          value={socials.facebook.url}
      />
      ))
      */}
      <InputCheck
        isSelected={socials.facebook.selected}
        name="facebook"
        id="facebook"
        checkBoxText="FaceBook"
        onChange={onChangeSocialUrl}
        error={errors.socials.facebook}
        value={socials.facebook.url}
      />

      <InputCheck
        isSelected={socials.instagram.selected}
        name="instagram"
        id="instagram"
        checkBoxText="Instagram"
        onCheckChange={onChangeSocials}
        onInputChange={onChangeSocialUrl}
        error={errors.socials.instagram}
        value={socials.instagram.url}
      />
      <InputCheck
        isSelected={socials.linkedIn.selected}
        name="linkedIn"
        id="linkedIn"
        checkBoxText="LinkedIn"
        onCheckChange={onChangeSocials}
        onInputChange={onChangeSocialUrl}
        error={errors.socials.linkedIn}
        value={socials.linkedIn.url}
      />
    </div>
  );
};

export default ContactsInfo;
