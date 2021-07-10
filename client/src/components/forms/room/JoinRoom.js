import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { joinRoom } from "../../../flux/actions/roomsActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";
import { renderError, getErrorClass } from "../../../helpers";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";

import CancelButton from "../../buttons/CancelButton";
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
      {renderError(meta, "join-room")}
    </React.Fragment>
  );
};

const JoinRoomForm = (props) => {
  // submit handler
  const onSubmit = async (formValues) => {
    const joinRoomSuccessCb = () => {
      props.onModalClose();
    };
    console.log(formValues);
    // run an action
    props.actionShowLoader("joinRoomForm", true);
    await props.joinRoom(formValues, joinRoomSuccessCb);
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
    <form id="join-room-form" autoComplete="off">
      <div className="join-room form-content-container modal-form-content">
        {renderErrorNotifications()}
        <Field
          name="name"
          component={renderInput}
          type="text"
          props={{
            inputProps: {
              // placeholder: "Room Name",
              className: "textfield",
              maxLength: "30",
              autoComplete: "off",
              id: "join-room-name-field",
              type: "text",
              autoFocus: true,
            },
            labelProps: {
              class: "textfield-label",
              text: "Room Name",
              id: "join-room-name-label",
            },
          }}
        />
      </div>
      <ModalFooter
        componentClass="join-room-modal"
        onModalClose={props.onModalClose}
        actionButtons={
          <button
            id="join-room-submit"
            className={"form-button submit mt-20"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            {renderLoader()} Join Room
          </button>
        }
      />
    </form>
  );
};

const validate = (formValues) => {
  console.log(formValues);

  const errors = {};
  if (!formValues.name) {
    errors.name = "Please input a room name.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  error: state.error,
  showLoader: state.loader.showJoinRoomFormLoader,
});

const joinRoomFormComponent = connect(mapStateToProps, {
  actionShowLoader,
  joinRoom,
})(JoinRoomForm);

export default reduxForm({
  form: "joinRoomForm",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(joinRoomFormComponent);
