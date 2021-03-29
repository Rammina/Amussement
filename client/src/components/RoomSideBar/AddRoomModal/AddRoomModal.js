import RightArrowImg from "../../../icons/right-arrow.png";

import "./AddRoomModal.scss";

import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

// import { addRoom, joinRoom } from "../../../flux/actions/roomsActions";
import { actionShowLoader } from "../../../flux/actions/loaderActions";

import Modal from "../../Modal/Modal";
import CreateRoomModal from "./CreateRoomModal/CreateRoomModal";
import JoinRoomModal from "./JoinRoomModal/JoinRoomModal";
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

  const renderButtons = () => {
    return (
      <>
        <button
          className="create-or-join-button"
          onClick={createRoomOnClickHandler}
          autoFocus={true}
        >
          <span>Create a Room</span>
          <img
            className="add-room right-arrow-button-img"
            src={RightArrowImg}
            alt="right-arrow icon"
          />
        </button>
        <button
          className="create-or-join-button"
          onClick={joinRoomOnClickHandler}
        >
          <span>Join a Room</span>
          <img
            className="add-room right-arrow-button-img"
            src={RightArrowImg}
            alt="right-arrow icon"
          />
        </button>
      </>
    );
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
          {renderButtons()}
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
            {renderButtons()}
          </div>
        </Modal>
      );
    }
  };

  const renderCreateRoom = () => {
    return <CreateRoomModal onModalClose={props.onModalClose} />;
  };

  const renderJoinRoom = () => {
    return <JoinRoomModal onModalClose={props.onModalClose} />;
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
