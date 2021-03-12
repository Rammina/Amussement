import "./AddRoomModal.scss";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import serverRest from "../../../apis/serverRest";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

// import { addRoom, joinRoom } from "../../../flux/actions/roomsActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";
import {
  renderError,
  getErrorClass,
  arrayHasObjectWithPropAndValue,
} from "../../../helpers";

import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
import Modal from "../../Modal/Modal";
import CancelButton from "../../buttons/CancelButton";
import LoadingSpinner from "../../loaders/LoadingSpinner";

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
      {renderError(meta, "add-room")}
    </React.Fragment>
  );
};

const AddRoomModal = (props) => {
  const [showCreateOrJoin, setShowCreateOrJoin] = useState(true);
  const [createRoomOpened, setCreateRoomOpened] = useState(false);
  const [joinRoomOpened, setJoinRoomOpened] = useState(false);

  const renderErrorNotifications = () => {
    const errorMessage = props.error.msg;
    console.log(errorMessage);
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };

  /*
  // submit handler
  const onSubmit = async (formValues) => {
    console.log(formValues);
    // run an action
    props.actionShowLoader("addRoomModalForm", true);
    await props.addRoom(formValues);
  };
*/
  const renderLoader = () => {
    return <LoadingSpinner showLoader={props.showLoader} />;
  };

  const renderCreateOrJoin = () => {
    return (
      <Modal
        componentClass="add-room"
        isSlideUp={true}
        headerClassName="user-settings-sidebar-header"
        headingText="Add a room"
        noHeader={true}
        noFooter={true}
        onModalClose={() => {
          props.onModalClose();
        }}
      >
        <button className="create-or-join-mobile-button">Create a Room</button>
        <button className="create-or-join-mobile-button">Join a Room</button>
      </Modal>
    );
  };
  const renderCreateRoom = () => {
    return <div></div>;
  };

  const renderJoinRoom = () => {
    return <div></div>;
  };

  // note: choose whether to add mobile and desktop versions
  const renderContent = () => {
    if (showCreateOrJoin) return renderCreateOrJoin();
    if (createRoomOpened) return renderCreateRoom();
    if (joinRoomOpened) return renderJoinRoom();
    return null;
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
  if (!formValues.username) {
    errors.username = "Please input a username.";
  }
  /*
  // best to do this in thebackend
  if (props && props.friends) {
    if (
      arrayHasObjectWithPropAndValue(
        props.friends,
        "username",
        formValues.username
      )
    ) {
      errors.username = "This user is already in your friend list";
    }
  }
*/
  return errors;
};

const mapStateToProps = (state) => ({
  // friends: state.friends,
  error: state.error,
  showLoader: state.loader.showAddRoomModalFormLoader,
});

const addRoomModalComponent = connect(mapStateToProps, {
  actionShowLoader,
})(AddRoomModal);

export default reduxForm({
  form: "addRoomModal",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(addRoomModalComponent);
