import "./DeleteAccount.scss";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import serverRest from "../../apis/serverRest";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { deleteUserAccount } from "../../flux/actions/settingsActions";
import { modalStatusReset } from "../../flux/actions/modalActions";
import { formShowLoader } from "../../flux/actions/loaderActions";
import { renderError, getErrorClass } from "../../helpers";

import ErrorNotifications from "../ErrorNotifications/ErrorNotifications";
import Modal from "../Modal/Modal";
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
      {renderError(meta, "delete-account")}
    </React.Fragment>
  );
};

const DeleteAccount = (props) => {
  /*
  useEffect(() => {
    console.log("this runs upon render");
    if (props.deleteAccountSubmitSuccess) {
      props.hideSection();
      // reset success status through MODAL_STATUS_RESET
      props.modalStatusReset();
    }
  }, [props.deleteAccountSubmitSuccess]);
  */

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
    props.formShowLoader("deleteAccountForm", true);
    await props.deleteUserAccount(formValues);
  };
  return ReactDOM.createPortal(
    <React.Fragment>
      <Modal
        componentClass="delete-account"
        onModalClose={() => {
          console.log("closing delete-account modal");
          props.hideSection();
        }}
        headerClassName="user-settings-sidebar-header"
        headingText="Delete Account"
        modalContent={
          <form id="delete-account-form" autoComplete="off">
            <div className="delete-account form-content-container modal-form-content">
              <p className="modal-paragraph delete-account">
                Are you sure you want to delete your account?
              </p>
              <p
                id="delete-account-description-paragraph"
                className="modal-paragraph small-text delete-account"
              >
                (Warning: Deleted accounts cannot be restored.)
              </p>

              {renderErrorNotifications()}

              <div
                className="textfield-container"
                id="delete-account-password-container"
              >
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
                      id: "delete-account-password-field",

                      autoFocus: true,
                    },
                    labelProps: {
                      class: "textfield-label",
                      text: "Password",
                      id: "delete-account-password-label",
                    },
                  }}
                />
              </div>
              <div className="form-button-container">
                <button
                  id="delete-account-submit"
                  className={"form-button submit mt-20 danger"}
                  type="submit"
                  onClick={props.handleSubmit(onSubmit)}
                >
                  {renderLoader()} Delete Account
                </button>
              </div>
            </div>
          </form>
        }
      />
    </React.Fragment>,
    document.getElementById("modal")
  );
};

const validate = (formValues) => {
  console.log(formValues);
  const errors = {};
  if (!formValues.password) {
    errors.password = "Please input your password.";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  // I doubt this matters because you should just link to sign up page after disabling account
  // deleteAccountSubmitSuccess: state.modalSubmit.deleteAccountSubmitSuccess,
  showLoader: state.loader.showDeleteAccountFormLoader,
});

const deleteAccount = connect(mapStateToProps, {
  deleteUserAccount,
  modalStatusReset,
  formShowLoader,
})(DeleteAccount);

export default reduxForm({
  form: "deleteAccount",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(deleteAccount);
