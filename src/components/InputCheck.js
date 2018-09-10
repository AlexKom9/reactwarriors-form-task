import React from "react";

export default class InputCheck extends React.Component {
  constructor() {
    super();

    this.state = {
      isSelected: false
    };
  }

  handleSelected = event => {
    this.setState({
      isSelected: event.target.checked
    });
  };

  render() {
    const { id, name, checkBoxText, onChange, value } = this.props;
    return (
      <div className="mb-4">
        <div className="mb-4">
          <div className="custom-control custom-checkbox mb-2">
            <input
              type="checkbox"
              className="custom-control-input"
              id={id}
              name={name}
              onChange={handleSelected}
            />
            <label className="custom-control-label" htmlFor={id}>
              {checkBoxText}
            </label>
          </div>

          {this.state.isSelected && (
            <div className="form-group">
              <input
                name={name}
                id={id}
                type="text"
                className="mb-2 form-control"
                placeholder="Enter your profile url"
                onChange={onChange}
                value={value}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
