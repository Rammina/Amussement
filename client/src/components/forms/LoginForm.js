import React, { useState } from "react";
import { Link } from "react-router-dom";

import serverRest from "../../apis/serverRest";

import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";

import { loginUser } from "../../flux/actions/authActions";
import { formShowLoader } from "../../flux/actions/loaderActions";
import { renderError, getErrorClass, validateEmail } from "../../helpers";
import ErrorNotifications from "../ErrorNotifications/ErrorNotifications";
import LoadingSpinner from "../loaders/LoadingSpinner";

import history from "../../history";

const onInput = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
const handleEnterKeyOnField = (e) => {
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
        onKeyDown={(e) => {
          handleEnterKeyOnField(e);
        }}
        onInput={(e) => {
          onInput(e);
        }}
        autoFocus={inputProps.autoFocus || false}
      />
      {renderError(meta, "login")}
    </React.Fragment>
  );
};

const LoginForm = (props) => {
  // const [showLoader, setShowLoader] = useState(false);

  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };

  const renderLoader = () => {
    return <LoadingSpinner showLoader={props.showLoader} />;
  };

  // submit handler
  const onSubmit = async (formValues) => {
    console.log(formValues);
    console.log(loginUser);
    // setShowLoader(true);
    props.formShowLoader("loginForm", true);
    await props.loginUser(formValues);
    // setShowLoader(false);
    // props.dispatch(reset("loginForm"));
  };

  return (
    <form id="login-form" autoComplete="off">
      <div className="login form-content-container">
        <div className="door-title-container">
          <h2 className="heading">Login</h2>
        </div>
        {renderErrorNotifications()}
        <div className="textfield-container">
          <Field
            name="email"
            component={renderInput}
            type="text"
            props={{
              inputProps: {
                placeholder: "Email",
                className: "textfield",
                maxLength: "64",
                autoComplete: "off",
                id: "login-form-email-field",
                autoFocus: true,
                // autoFocus: true
              },
              labelProps: {
                class: "textfield-label",
                text: "Email",
                id: "login-form-email-label",
              },
            }}
          />
        </div>
        <div className="textfield-container">
          <Field
            name="password"
            component={renderInput}
            type="password"
            props={{
              inputProps: {
                placeholder: "Password",
                className: "textfield",
                maxLength: "30",
                autoComplete: "off",
                type: "password",
                id: "login-form-password-field",
                // autoFocus: true
              },
              labelProps: {
                class: "textfield-label",
                text: "Password",
                id: "login-form-password-label",
              },
            }}
          />
        </div>

        <div className="form-button-container">
          <button
            className={"form-button submit mt-20"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            {renderLoader()} Sign In
          </button>
        </div>
      </div>
    </form>
  );
};

const validate = (formValues) => {
  console.log(formValues);
  const errors = {};
  if (!formValues.email) {
    errors.email = "Please input an email.";
  } else if (!validateEmail(formValues.email)) {
    errors.email = "Invalid email address.";
  }
  if (!formValues.password) {
    errors.password = "Please input a password.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  showLoader: state.loader.showLoginFormLoader,
});

const loginForm = connect(mapStateToProps, { loginUser, formShowLoader })(
  LoginForm
);

export default reduxForm({
  form: "loginForm",
  destroyOnUnmount: false,
  validate,
})(loginForm);
