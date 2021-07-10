import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { submitRoomPassword } from "../../../flux/actions/roomsActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";
import { renderError, getErrorClass } from "../../../helpers";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
// import Form from "../Form/Form";

import LoadingSpinner from "../../loaders/LoadingSpinner";
import ModalFooter from "../../Modal/ModalFooter/ModalFooter";

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
      {renderError(meta, "room-password-confirmation")}
    </React.Fragment>
  );
};

const RoomPasswordConfirmationForm = (props) => {
  const { name, roomId } = props;

  // submit handler
  const onSubmit = async (formValues) => {
    const submitRoomPasswordSuccessCb = () => {
      props.onModalClose();
    };
    console.log(formValues);
    // run an action
    props.actionShowLoader("roomPasswordConfirmation", true);
    const values = { ...formValues, roomId };
    await props.submitRoomPassword(values, submitRoomPasswordSuccessCb);
  };

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

  return (
    <form id="room-password-confirmation-form" autoComplete="off">
      <div className="room-password-confirmation form-content-container modal-form-content">
        {renderErrorNotifications()}
        <Field
          name="password"
          component={renderInput}
          type="text"
          props={{
            inputProps: {
              // placeholder: "Room Password",
              className: "textfield",
              maxLength: "30",
              autoComplete: "off",
              id: "room-password-confirmation-password-field",
              type: "text",
              autoFocus: true,
            },
            labelProps: {
              class: "textfield-label",
              text: "Room Password",
              id: "room-password-confirmation-password-label",
            },
          }}
        />
      </div>
      <ModalFooter
        componentClass="join-room-modal"
        onModalClose={props.onModalClose}
        actionButtons={
          <button
            id="room-password-confirmation-submit"
            className={"form-button submit mt-20"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            {renderLoader()} Submit
          </button>
        }
      />
    </form>
  );
};

const validate = (formValues) => {
  console.log(formValues);

  const errors = {};
  if (!formValues.password) {
    errors.password = "Please input the password for this room.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  error: state.error,
  showLoader: state.loader.showRoomPasswordConfirmationLoader,
});

const roomPasswordConfirmationComponent = connect(mapStateToProps, {
  actionShowLoader,
  submitRoomPassword,
})(RoomPasswordConfirmationForm);

export default reduxForm({
  form: "roomPasswordConfirmation",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(roomPasswordConfirmationComponent);
