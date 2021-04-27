import "./DisableAccount.scss";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { disableUserAccount } from "../../../flux/actions/settingsActions";
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
      {renderError(meta, "disable-account")}
    </React.Fragment>
  );
};

const DisableAccount = (props) => {
  useEffect(() => {
    props.actionShowLoader("disableAccountForm", false);
  }, []);

  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    console.log(errorMessage);
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };

  const renderLoader = () => {
    return <LoadingSpinner className="white" showLoader={props.showLoader} />;
  };

  // submit handler
  const onSubmit = async (formValues) => {
    console.log(formValues);
    props.actionShowLoader("disableAccountForm", true);
    await props.disableUserAccount(formValues);
  };

  const content = (
    <React.Fragment>
      <Modal
        componentClass="disable-account"
        onModalClose={() => {
          console.log("closing disable-account modal");
          props.hideSection();
        }}
        headerClassName="settings-page-sidebar-header"
        headingText="Disable Account"
        actionButtons={
          <button
            id="disable-account-submit"
            className={"form-button submit mt-20 warning"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            {renderLoader()} Disable Account
          </button>
        }
      >
        <form id="disable-account-form" autoComplete="off">
          <div className="disable-account form-content-container modal-form-content">
            <p className="modal-paragraph disable-account">
              Would you like to disable your account?
            </p>
            <p
              id="disable-account-description-paragraph"
              className="modal-paragraph small-text disable-account"
            >
              Others will be unable to interact with your account until it is
              activated again on the next login.
            </p>

            {renderErrorNotifications()}

            <div
              className="textfield-container"
              id="disable-account-password-container"
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
                    id: "disable-account-password-field",
                    autoFocus: true,
                  },
                  labelProps: {
                    class: "textfield-label",
                    text: "Password *",
                    id: "disable-account-password-label",
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
    </React.Fragment>
  );
  // render
  return ReactDOM.createPortal(content, document.getElementById("modal"));
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

  showLoader: state.loader.showDisableAccountFormLoader,
});

const disableAccount = connect(mapStateToProps, {
  disableUserAccount,
  modalStatusReset,
  actionShowLoader,
})(DisableAccount);

export default reduxForm({
  form: "disableAccount",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(disableAccount);
