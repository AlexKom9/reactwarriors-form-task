import React from 'react'

const Avatar = props => {
  const { values, errors, onChangeAvatar} = props;

  console.log(values);
  return (
    <div>
      <img className="w-100 mb-4" src={!values.avatarImg ? "img/default-avatar.png" : values.avatarImg} alt="avatar"/>
      <div className="custom-file">
        <input
          type="file"
          className={"custom-file-input " + (errors.avatar ? 'is-invalid': '')}
          id="avatar"
          onChange={onChangeAvatar}
        />
        <label className="custom-file-label" htmlFor="avatar">{values.avatarName ? values.avatarName : "Choose" +
          " avatar..."}</label>
        {errors.avatar ? <div className="invalid-feedback">{errors.avatar}</div> : ''}

      </div>
    </div>
  )
};

export default Avatar