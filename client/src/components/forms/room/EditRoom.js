import "./EditRoom.scss";

import React, { useContext } from "react";
import ReactDOM from "react-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { editRoom } from "../../../flux/actions/roomsActions";

import { modalStatusReset } from "../../../flux/actions/modalActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";
import { renderError, getErrorClass } from "../../../helpers";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
import Modal from "../../Modal/Modal";

import LoadingSpinner from "../../loaders/LoadingSpinner";

import { RoomContext } from "../../AppContext";

import history from "../../../history";
const onInput = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
const handleEnterKeyOnField = (e) => {};

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
      {renderError(meta, "edit-room")}
    </React.Fragment>
  );
};

const EditRoom = (props) => {
  const { isSelectedRoom } = useContext(RoomContext);
  const room = props.initialValues;
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
    formValues.roomId = room._id;
    const successCb = () => {
      props.actionShowLoader("editRoomModalForm", false);
      props.onClose();
      if (isSelectedRoom)
        history.push(
          `chat?room=${formValues.roomId}&userType=user&roomType=public`
        );
    };
    console.log(formValues);
    // check if it succeeded or it produced an error

    props.actionShowLoader("editRoomModalForm", true);
    await props.editRoom(formValues, successCb);
  };

  const content = (
    <React.Fragment>
      <Modal
        componentClass="edit-room"
        onModalClose={() => {
          console.log("closing edit-room modal");
          props.onClose();
        }}
        headerClassName="settings-page-sidebar-header"
        headingText="Edit Room"
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
        <form id="edit-room-form" autoComplete="off">
          <div className="edit-room form-content-container modal-form-content">
            {renderErrorNotifications()}
            <div className="textfield-container">
              <Field
                name="name"
                component={renderInput}
                type="text"
                props={{
                  inputProps: {
                    placeholder: "Name",
                    className: "textfield",
                    maxLength: "30",
                    autoComplete: "off",
                    id: "edit-room-name-field",
                    autoFocus: true,
                  },
                  labelProps: {
                    class: "textfield-label",
                    text: "Name *",
                    id: "edit-room-name-label",
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
                    placeholder: "Room Password",
                    className: "textfield",
                    maxLength: "30",
                    autoComplete: "off",
                    type: "password",
                    id: "edit-room-password-field",
                  },
                  labelProps: {
                    class: "textfield-label",
                    text: "Password",
                    id: "edit-room-password-label",
                  },
                }}
              />
            </div>
          </div>
          {/*this is only here so that Enter submit works*/}
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
  if (!formValues.name) {
    errors.name = "Please input a room name.";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  editRoomSubmitSuccess: state.modalSubmit.editRoomSubmitSuccess,
  showLoader: state.loader.showEditRoomModalFormLoader,
});

const editRoomComponent = connect(mapStateToProps, {
  editRoom,
  modalStatusReset,
  actionShowLoader,
})(EditRoom);

export default reduxForm({
  form: "editRoom",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(editRoomComponent);
