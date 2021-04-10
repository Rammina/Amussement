import "./JoinRoomModal.scss";

import React, { useState } from "react";
import ReactDOM from "react-dom";
// import { Link } from "react-router-dom";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { joinRoom } from "../../../../flux/actions/roomsActions";
import { actionShowLoader } from "../../../../flux/actions/loaderActions";
import {
  renderError,
  getErrorClass,
  arrayHasObjectWithPropAndValue,
} from "../../../../helpers";
import history from "../../../../history";

import ErrorNotifications from "../../../ErrorNotifications/ErrorNotifications";
import Modal from "../../../Modal/Modal";
import JoinRoom from "../../../forms/room/JoinRoom";
import RoomPasswordConfirmation from "../../../forms/room/RoomPasswordConfirmation";

const JoinRoomModal = (props) => {
  const { roomPasswordForm } = props;
  const getPasswordIsRequired = () => {
    return roomPasswordForm.password_required;
  };

  // change the content depending on whether password is being required
  const renderForm = () => {
    // ask for the room name
    if (!getPasswordIsRequired())
      return <JoinRoom onModalClose={props.onModalClose} />;
    const { name, roomId } = roomPasswordForm;
    // if password is being asked, show the form for the room password
    return (
      <RoomPasswordConfirmation
        name={name}
        roomId={roomId}
        onModalClose={props.onModalClose}
      />
    );
  };

  const renderContent = () => {
    return (
      <Modal
        componentClass="join-room"
        headerClassName="settings-page-sidebar-header"
        headingText="Join a Room"
        onModalClose={props.onModalClose}
        noFooter={true}
      >
        {renderForm()}
      </Modal>
    );
  };

  // render
  return ReactDOM.createPortal(
    renderContent(),
    document.getElementById("modal")
  );
};

const mapStateToProps = (state) => ({
  // friends: state.friends,
  user: state.user.info,
  error: state.error,
  showLoader: state.loader.showJoinRoomModalFormLoader,
  roomPasswordForm: state.roomPasswordForm,
});

export default connect(mapStateToProps, {
  actionShowLoader,
  joinRoom,
})(JoinRoomModal);

/*actionButtons={
  <button
    id="remove-friend-submit"
    className={"form-button submit mt-20"}
    type="submit"
    onClick={props.handleSubmit(onSubmit)}
  >
    {renderLoader()} Join Room
  </button>
  }*/
