import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { changeUserPassword } from "../../../flux/actions/settingsActions";
import { modalStatusReset } from "../../../flux/actions/modalActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";
import { renderError, getErrorClass } from "../../../helpers";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
import Modal from "../../Modal/Modal";

import LoadingSpinner from "../../loaders/LoadingSpinner";

const onInput = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
const handleEnterKeyOnField = (e) => {
  // This prevents submission bugging or refreshing upon pressing enter
  // in an input field inside a form
  /* if (e.keyCode === 13) {
    e.preventDefault();
    e.stopPropagation();
  } */
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
      {renderError(meta, "change-user-password")}
    </React.Fragment>
  );
};

const ChangeUserPassword = (props) => {
  useEffect(() => {
    console.log("this runs upon render");
    if (props.changePasswordSubmitSuccess) {
      props.hideSection();
      // reset success status through MODAL_STATUS_RESET
      props.modalStatusReset();
    }
  }, [props.changePasswordSubmitSuccess]);

  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    console.log(errorMessage);
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
    props.actionShowLoader("changeUserPasswordForm", true);
    await props.changeUserPassword(formValues);
  };

  // just change the header message depending on window width
  const renderHeadingText = () => {
    // this needs to be based on state

    return window.innerWidth >= 450
      ? "Change Your Password"
      : "Change Password";
  };

  const content = (
    <Modal
      componentClass="change-user-password"
      onModalClose={() => {
        console.log("closing change-user-password modal");
        props.hideSection();
      }}
      headerClassName="settings-page-sidebar-header"
      headingText={renderHeadingText()}
      actionButtons={
        <button
          className={"form-button submit mt-20"}
          type="submit"
          onClick={props.handleSubmit(onSubmit)}
        >
          {renderLoader()} Change Password
        </button>
      }
    >
      <form id="change-user-password-form" autoComplete="off">
        <div className="change-user-password form-content-container modal-form-content">
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
                  type: "password",
                  autoFocus: true,
                },
                labelProps: {
                  class: "textfield-label",
                  text: "Current Password *",
                  id: "change-user-password-password-label",
                },
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
                  type: "password",
                  // autoFocus: true
                },
                labelProps: {
                  class: "textfield-label",
                  text: "New Password *",
                  id: "change-user-password-new-password-label",
                },
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
                  type: "password",
                },
                labelProps: {
                  class: "textfield-label",
                  text: "Confirm New Password *",
                  id: "change-user-password-new-password-2-label",
                },
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={props.handleSubmit(onSubmit)}
          style={{ display: "none" }}
        >
          Save
        </button>
      </form>
    </Modal>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const validate = (formValues) => {
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  changePasswordSubmitSuccess: state.modalSubmit.changePasswordSubmitSuccess,
  showLoader: state.loader.showChangeUserPasswordFormLoader,
});

const changeUserPass = connect(mapStateToProps, {
  changeUserPassword,
  modalStatusReset,
  actionShowLoader,
})(ChangeUserPassword);

export default reduxForm({
  form: "changeUserPassword",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(changeUserPass);
