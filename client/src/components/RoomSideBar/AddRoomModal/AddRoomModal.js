import "./AddRoomModal.scss";

import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

// import { addRoom, joinRoom } from "../../../flux/actions/roomsActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";

import Modal from "../../Modal/Modal";
import CreateRoomModal from "./CreateRoomModal/CreateRoomModal";
import CancelButton from "../../buttons/CancelButton";
import LoadingSpinner from "../../loaders/LoadingSpinner";

import { WindowContext } from "../../AppContext";

const AddRoomModal = (props) => {
  const [showCreateOrJoin, setShowCreateOrJoin] = useState(true);
  const [createRoomOpened, setCreateRoomOpened] = useState(false);
  const [joinRoomOpened, setJoinRoomOpened] = useState(false);
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);

  const createRoomOnClickHandler = () => {
    setShowCreateOrJoin(false);
    setJoinRoomOpened(false);
    setCreateRoomOpened(true);
  };

  const joinRoomOnClickHandler = () => {
    setShowCreateOrJoin(false);
    setJoinRoomOpened(true);
    setCreateRoomOpened(false);
  };

  const renderCreateOrJoin = () => {
    // Mobile version
    if (!isDesktopWidth || !isDesktopHeight)
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
          <button
            className="create-or-join-mobile-button"
            onClick={createRoomOnClickHandler}
          >
            Create a Room
          </button>
          <button
            className="create-or-join-mobile-button"
            onClick={joinRoomOnClickHandler}
          >
            Join a Room
          </button>
        </Modal>
      );
    else {
      return (
        <Modal
          componentClass="add-room"
          headerClassName="user-settings-sidebar-header"
          headingText="Add a room"
          // noHeader={true}
          modalId="create-or-join-modal"
          noFooter={true}
          onModalClose={() => {
            props.onModalClose();
          }}
        >
          <div className="add-room form-content-container modal-form-content">
            <button
              className="create-or-join-mobile-button"
              onClick={createRoomOnClickHandler}
            >
              Create a Room
            </button>
            <button
              className="create-or-join-mobile-button"
              onClick={joinRoomOnClickHandler}
            >
              Join a Room
            </button>
          </div>
        </Modal>
      );
    }
  };

  const renderCreateRoom = () => {
    return <CreateRoomModal onModalClose={props.onModalClose} />;
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

const mapStateToProps = (state) => ({
  // friends: state.friends,
});

export default connect(mapStateToProps, {})(AddRoomModal);
