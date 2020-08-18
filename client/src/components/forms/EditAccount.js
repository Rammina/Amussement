import "./EditAccount.scss";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import serverRest from "../../apis/serverRest";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { editUserAccount } from "../../flux/actions/settingsActions";
import { renderError, getErrorClass, validateEmail } from "../../helpers";

import ErrorNotifications from "../ErrorNotifications/ErrorNotifications";

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
      {renderError(meta, "edit-account")}
    </React.Fragment>
  );
};

const EditAccount = (props) => {
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
  const onSubmit = async (formValues) => {
    console.log(formValues);
    // run an action
    props.editUserAccount(formValues);
    props.closeEditAccount();
  };

  return (
    <form id="edit-account-form" autoComplete="off">
      <div className="edit-account form-content-container">
        <div className="door-title-container">
          <h2 className="heading">Edit Your Account</h2>
        </div>
        {renderErrorNotifications()}
        <div className="textfield-container">
          <Field
            name="username"
            component={renderInput}
            type="text"
            props={{
              inputProps: {
                placeholder: "Username",
                className: "textfield",
                maxLength: "30",
                autoComplete: "off",
                id: "edit-account-username-field",
                // autoFocus: true
              },
              labelProps: {
                class: "textfield-label",
                text: "Username",
                id: "edit-account-username-label",
              },
            }}
          />
        </div>
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
                id: "edit-account-email-field",

                // autoFocus: true
              },
              labelProps: {
                class: "textfield-label",
                text: "Email",
                id: "edit-account-email-label",
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
                placeholder: "Enter Password for Confirmation",
                className: "textfield",
                maxLength: "30",
                autoComplete: "off",
                type: "password",
                id: "edit-account-password-field",
                // autoFocus: true
              },
              labelProps: {
                class: "textfield-label",
                text: "Password",
                id: "edit-account-password-label",
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
            Save
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
  if (!formValues.username) {
    errors.username = "Please input a username.";
  }
  if (!formValues.password) {
    errors.password = "Please input your password.";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

const editAccount = connect(mapStateToProps, { editUserAccount })(EditAccount);

export default reduxForm({
  form: "editAccount",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(editAccount);
