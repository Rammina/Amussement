import React, { useState } from "react";
import { Link } from "react-router-dom";

import serverRest from "../../apis/serverRest";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { registerUser } from "../../actions/authActions";
import { renderError, getErrorClass, validateEmail } from "../../helpers";

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
      {renderError(meta, "login")}
    </React.Fragment>
  );
};

const RegisterForm = props => {
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");
  const onSubmit = async formValues => {
    console.log(formValues);
    console.log(registerUser);
    await props.registerUser(formValues);
  };

  return (
    <form id="register-form" autoComplete="off">
      <div className="joinInnerContainer">
        <div className="door-title-container">
          <h2 className="heading">Create an account</h2>
        </div>
        <div className="join-textfield-container">
          <Field
            name="email"
            component={renderInput}
            type="text"
            props={{
              inputProps: {
                placeholder: "Email",
                className: "join-textfield",
                maxLength: "64",
                autoComplete: "off",
                id: "register-form-email-field"

                // autoFocus: true
              },
              labelProps: {
                class: "textfield-label",
                text: "Email",
                id: "register-form-email-label"
              }
            }}
          />
        </div>
        <div className="join-textfield-container">
          <Field
            name="username"
            component={renderInput}
            type="text"
            props={{
              inputProps: {
                placeholder: "Username",
                className: "join-textfield",
                maxLength: "30",
                autoComplete: "off",
                id: "register-form-username-field"
                // autoFocus: true
              },
              labelProps: {
                class: "textfield-label",
                text: "Username",
                id: "register-form-username-label"
              }
            }}
          />
        </div>
        <div className="join-textfield-container">
          <Field
            name="password"
            component={renderInput}
            type="password"
            props={{
              inputProps: {
                placeholder: "Password",
                className: "join-textfield",
                maxLength: "30",
                autoComplete: "off",
                type: "password",
                id: "register-form-password-field"
                // autoFocus: true
              },
              labelProps: {
                class: "textfield-label",
                text: "Password",
                id: "register-form-password-label"
              }
            }}
          />
        </div>
        <div className="join-textfield-container">
          <Field
            name="date_of_birth"
            component={renderInput}
            props={{
              inputProps: {
                placeholder: "Date of Birth",
                className: "join-textfield",
                id: "register-form-date_of_birth-field",
                type: "date",

                required: true
              },
              labelProps: {
                text: "Date of Birth",
                class: "textfield-label",
                id: "register-form-date_of_birth-label"
              }
            }}
          />
        </div>
        <div className="join-button-container">
          <button
            className={"join-button mt-20"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            Sign In
          </button>
        </div>
      </div>
    </form>
  );
};

const validate = formValues => {
  console.log(formValues);
  const errors = {};
  if (!formValues.email) {
    errors.email = "Please input an email.";
  } else if (!validateEmail(formValues.email)) {
    errors.email = "Invalid email address.";
  }
  if (!formValues.username) {
    errors.username = "Please input a username.";
  }
  if (!formValues.password) {
    errors.password = "Please input a password.";
  } else if (formValues.password.length < 6) {
    errors.password = "Password needs to be at least 6 characters.";
  }
  if (!formValues.date_of_birth) {
    errors.date_of_birth = "Please input your birth date.";
  }

  return errors;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const registerForm = connect(
  mapStateToProps,
  { registerUser }
)(RegisterForm);

export default reduxForm({
  form: "registerForm",
  validate
})(registerForm);
