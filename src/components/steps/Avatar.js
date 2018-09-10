import React from "react";

const Avatar = props => {
  const { values, errors, onChange } = props;

  const onChangeAvatar = event => {
    const file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = event => {
      props.onChange({
        target: {
          name: "avatar",
          value: event.target.result
        }
      });
    };
  };

  return (
    <div>
      <img
        className="w-100 mb-4"
        src={values.avatar ? values.avatar : "img/default-avatar.png"}
        alt="avatar"
      />
      <div className="custom-file">
        <input
          type="file"
          className={"custom-file-input " + (errors.avatar ? "is-invalid" : "")}
          id="avatar"
          onChange={onChangeAvatar}
        />
        <label className="custom-file-label" htmlFor="avatar">
          {values.avatarName ? values.avatarName : "Choose" + " avatar..."}
        </label>
        {errors.avatar ? (
          <div className="invalid-feedback">{errors.avatar}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Avatar;
