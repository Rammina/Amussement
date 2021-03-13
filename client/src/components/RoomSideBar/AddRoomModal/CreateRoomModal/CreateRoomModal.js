import "./CreateRoomModal.scss";

import React, { useState } from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { createRoom } from "../../../../flux/actions/roomsActions";
import { actionShowLoader } from "../../../../flux/actions/loaderActions";
import {
  renderError,
  getErrorClass,
  arrayHasObjectWithPropAndValue,
} from "../../../../helpers";

import ErrorNotifications from "../../../ErrorNotifications/ErrorNotifications";
import Modal from "../../../Modal/Modal";
import CancelButton from "../../../buttons/CancelButton";
import LoadingSpinner from "../../../loaders/LoadingSpinner";

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
      {renderError(meta, "create-room")}
    </React.Fragment>
  );
};

const CreateRoomModal = (props) => {
  // submit handler
  const onSubmit = async (formValues) => {
    const createRoomSuccessCb = () => {
      props.onModalClose();
    };
    console.log(formValues);
    // run an action
    props.actionShowLoader("createRoomModalForm", true);
    await props.createRoom(formValues, createRoomSuccessCb);
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

  const renderContent = () => {
    return (
      <Modal
        componentClass="create-room"
        headerClassName="user-settings-sidebar-header"
        headingText="Create a Room"
        onModalClose={() => {
          props.onModalClose();
        }}
        actionButtons={
          <button
            id="remove-friend-submit"
            className={"form-button submit mt-20"}
            type="submit"
            onClick={props.handleSubmit(onSubmit)}
          >
            {renderLoader()} Create Room
          </button>
        }
      >
        <form id="create-room-form" autoComplete="off">
          <div className="create-room form-content-container modal-form-content">
            {renderErrorNotifications()}
            <Field
              name="name"
              component={renderInput}
              type="text"
              props={{
                inputProps: {
                  placeholder: "Room Name",
                  className: "textfield",
                  maxLength: "30",
                  autoComplete: "off",
                  id: "create-room-username-field",
                  type: "text",
                  autoFocus: true,
                },
                labelProps: {
                  class: "textfield-label",
                  text: "Room Name",
                  id: "create-room-username-label",
                },
              }}
            />
          </div>
        </form>
      </Modal>
    );
  };

  // render
  return ReactDOM.createPortal(
    renderContent(),
    document.getElementById("modal")
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
  // friends: state.friends,
  user: state.user.info,
  error: state.error,
  showLoader: state.loader.showCreateRoomModalFormLoader,
});

const createRoomModalComponent = connect(mapStateToProps, {
  actionShowLoader,
  createRoom,
})(CreateRoomModal);

export default reduxForm({
  form: "createRoomModal",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(createRoomModalComponent);
