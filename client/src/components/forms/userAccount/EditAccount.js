import "./EditAccount.scss";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { editUserAccount } from "../../../flux/actions/settingsActions";
import { modalStatusReset } from "../../../flux/actions/modalActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";
import { renderError, getErrorClass, validateEmail } from "../../../helpers";

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
  // if (e.keyCode === 13) {
  //   e.preventDefault();
  //   e.stopPropagation();
  // }
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
  useEffect(() => {
    console.log("this runs upon render");
    if (props.editAccountSubmitSuccess) {
      props.hideSection();
      // reset success status through MODAL_STATUS_RESET
      props.modalStatusReset();
    }
  }, [props.editAccountSubmitSuccess]);

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
    // check if it succeeded or it produced an error
    props.actionShowLoader("editAccountForm", true);
    await props.editUserAccount(formValues);
  };

  const content = (
    <React.Fragment>
      <Modal
        componentClass="edit-account"
        onModalClose={() => {
          console.log("closing edit-account modal");
          props.hideSection();
        }}
        headerClassName="settings-page-sidebar-header"
        headingText="Edit Account"
        actionButtons={
          <button
            className={"form-button submit mt-20"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            {renderLoader()} Save
          </button>
        }
      >
        <form id="edit-account-form" autoComplete="off">
          <div className="edit-account form-content-container modal-form-content">
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
                    autoFocus: true,
                  },
                  labelProps: {
                    class: "textfield-label",
                    text: "Username *",
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
                  },
                  labelProps: {
                    class: "textfield-label",
                    text: "Email *",
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
                  },
                  labelProps: {
                    class: "textfield-label",
                    text: "Password *",
                    id: "edit-account-password-label",
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

  return ReactDOM.createPortal(content, document.getElementById("modal"));
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
  editAccountSubmitSuccess: state.modalSubmit.editAccountSubmitSuccess,
  showLoader: state.loader.showEditAccountFormLoader,
});

const editAccount = connect(mapStateToProps, {
  editUserAccount,
  modalStatusReset,
  actionShowLoader,
})(EditAccount);

export default reduxForm({
  form: "editAccount",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(editAccount);
