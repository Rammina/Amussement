// import "./EditAccount.scss";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import serverRest from "../../apis/serverRest";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { changeUserPassword } from "../../flux/actions/settingsActions";
import { renderError, getErrorClass, validateEmail } from "../../helpers";

import ErrorNotifications from "../ErrorNotifications/ErrorNotifications";

import history from "../../history";

const onInput = e => {
  e.preventDefault();
  e.stopPropagation();
};
const handleEnterKeyOnField = e => {
  // This prevents submission bugging or refreshing upon pressing enter
  // in an input field inside a form
  if (e.keyCode === 13) {
    e.preventDefault();
    e.stopPropagation();
  }
};

const renderInput = ({ input, meta, inputProps, labelProps }) => {
  const errorClass = getErrorClass(meta);
  const labelClass = labelProps.class || null;
  const labelId = labelProps.id || null;
  return (
    <React.Fragment>
      <label
        htmlFor={inputProps.id}
        className={`${errorClass} ${labelClass}`}
        id={labelId || ""}
      >
        {labelProps.text}
      </label>
      <input
        {...inputProps}
        {...input}
        className={`${inputProps.className} ${errorClass}`}
        onKeyDown={e => {
          handleEnterKeyOnField(e);
        }}
        onInput={e => {
          onInput(e);
        }}
        autoFocus={inputProps.autoFocus || false}
      />
      {renderError(meta, "change-user-password")}
    </React.Fragment>
  );
};

const ChangeUserPassword = props => {
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");
  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    console.log(errorMessage);
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };
  // submit handler
  const onSubmit = async formValues => {
    console.log(formValues);
    // run an action
    await props.changeUserPassword(formValues);
    props.hideSection();
  };

  return (
    <form id="change-user-password-form" autoComplete="off">
      <div className="change-user-password form-content-container">
        <div className="door-title-container">
          <h2 className="heading">Change Your Password</h2>
        </div>
        {renderErrorNotifications()}
        <div className="textfield-container">
          <Field
            name="password"
            component={renderInput}
            type="password"
            props={{
              inputProps: {
                placeholder: "Current Password",
                className: "textfield",
                maxLength: "30",
                autoComplete: "off",
                id: "change-user-password-password-field",
                type: "password"
                // autoFocus: true
              },
              labelProps: {
                class: "textfield-label",
                text: "Current Password",
                id: "change-user-password-password-label"
              }
            }}
          />
        </div>
        <div className="textfield-container">
          <Field
            name="new_password"
            component={renderInput}
            type="password"
            props={{
              inputProps: {
                placeholder: "New Password",
                className: "textfield",
                maxLength: "30",
                autoComplete: "off",
                id: "change-user-password-new-password-field",
                type: "password"
                // autoFocus: true
              },
              labelProps: {
                class: "textfield-label",
                text: "New Password",
                id: "change-user-password-new-password-label"
              }
            }}
          />
        </div>
        <div className="textfield-container">
          <Field
            name="new_password_2"
            component={renderInput}
            type="password"
            props={{
              inputProps: {
                placeholder: "Confirm New Password",
                className: "textfield",
                maxLength: "30",
                autoComplete: "off",
                id: "change-user-password-new-password-2-field",
                type: "password"
                // autoFocus: true
              },
              labelProps: {
                class: "textfield-label",
                text: "Confirm New Password",
                id: "change-user-password-new-password-2-label"
              }
            }}
          />
        </div>

        <div className="form-button-container">
          <button
            className={"form-button submit mt-20"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            Change Password
          </button>
        </div>
      </div>
    </form>
  );
};

const validate = formValues => {
  console.log(formValues);
  const errors = {};
  if (!formValues.password || formValues.password.length < 6) {
    errors.password = "Please input your current password.";
  }
  if (!formValues.new_password) {
    errors.new_password = "Please input your new password.";
  } else if (formValues.new_password.length < 6) {
    errors.new_password = "Password has to be at least 6 characters long.";
  }
  if (!formValues.new_password_2 || formValues.new_password_2.length < 6) {
    errors.new_password_2 = "Please repeat your new password.";
  }
  if (formValues.new_password !== formValues.new_password_2) {
    errors.new_password_2 = "Password confirmation does not match.";
  }
  return errors;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const changeUserPass = connect(
  mapStateToProps,
  { changeUserPassword }
)(ChangeUserPassword);

export default reduxForm({
  form: "changeUserPassword",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate
})(changeUserPass);
