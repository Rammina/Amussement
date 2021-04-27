import "../SettingsPage.scss";

import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import history from "../../history";

import RoomOverview from "./RoomOverview/RoomOverview";
import BackButton from "../buttons/BackButton";
import DeleteRoom from "../forms/room/DeleteRoom";
import SettingsCloseButton from "../buttons/SettingsCloseButton";

import { WindowContext, RoomContext } from "../AppContext";

export const RoomSettings = (props) => {
  const [isSelectedRoom, setIsSelectedRoom] = useState(false);
  const [roomOverviewOpened, setRoomOverviewOpened] = useState(false);
  const [deleteRoomOpened, setDeleteRoomOpened] = useState(false);
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);
  const { room, roomSettingsOnCloseHandler } = useContext(RoomContext);

  useEffect(() => {
    if (isDesktopWidth && isDesktopHeight) setRoomOverviewOpened(true);
  }, []);

  // URL redirect functions
  const redirectToHomeUponRemovalCb = () => {
    // only redirect if user is in the room in the first place
    if (!isSelectedRoom) return null;
    history.push(`/users/${props.user._id}/home`);
  };

  // function handlers
  const roomOverviewOnCloseHandler = () => {
    setRoomOverviewOpened(false);
  };

  const deleteRoomOnClickHandler = () => {
    setDeleteRoomOpened(true);
  };

  const deleteRoomOnCloseHandler = () => {
    setDeleteRoomOpened(false);
  };

  // render functions
  const renderSection = () => {
    if (!isDesktopWidth || !isDesktopHeight) {
      if (roomOverviewOpened) {
        return <RoomOverview closeRoomOverview={roomOverviewOnCloseHandler} />;
      }
    } else {
      // this is for desktop versions of the components
      if (roomOverviewOpened) {
        console.log("Opening my account on desktop with");
        return <RoomOverview closeRoomOverview={roomOverviewOnCloseHandler} />;
      }
    }
    return null;
  };

  const renderRoomDeleteModal = () => {
    if (!deleteRoomOpened) return null;
    return (
      <DeleteRoom
        room={room}
        redirectToHomeUponRemovalCb={redirectToHomeUponRemovalCb}
        onClose={deleteRoomOnCloseHandler}
      />
    );
  };

  const renderRoomDeleteButton = () => {
    return (
      <button
        className="settings-page-sidebar-button"
        id="settings-page-delete-room-button"
        onClick={deleteRoomOnClickHandler}
      >
        <li
          className={`settings-page-sidebar-item`}
          id="settings-page-delete-room"
        >
          Delete Room
        </li>
      </button>
    );
  };

  // content
  const renderContent = () => (
    <>
      {renderRoomDeleteModal()}
      <div
        className="settings-page-window-container"
        data-test="component-room-settings"
      >
        <div className="settings-page-outer-flex-container">
          <div className="settings-page-sidebar-outer-container">
            <div className="settings-page-sidebar-middle-container">
              <header
                className="settings-page-sidebar-header"
                id="room-settings-header"
              >
                <BackButton
                  componentClass="room-settings"
                  buttonId="room-settings-back-button"
                  hideOnDesktop={true}
                  onClickHandler={roomSettingsOnCloseHandler}
                />
                <h1
                  className="settings-page-header-heading"
                  id="room-settings-header-heading"
                >
                  Room Settings
                </h1>
              </header>
              <div className="settings-page-sidebar-inner-container">
                <ul className="settings-page-sidebar-items">
                  <button
                    className="settings-page-sidebar-button"
                    onClick={() => {
                      setRoomOverviewOpened(true);
                    }}
                  >
                    <li
                      className={`settings-page-sidebar-item ${
                        roomOverviewOpened ? "selected" : ""
                      }`}
                    >
                      Overview
                    </li>
                  </button>

                  {renderRoomDeleteButton()}
                </ul>
              </div>
            </div>
          </div>
          <div className="settings-page-sidebar-outer-container fake"></div>

          {renderSection()}

          <SettingsCloseButton onClose={props.onClose} />
        </div>
      </div>
    </>
  );

  // render
  return ReactDOM.createPortal(
    renderContent(),
    document.getElementById("settings-page")
  );
};

const roomSettings = connect(null, {})(RoomSettings);

RoomSettings.propTypes = {
  roomId: PropTypes.string,
};

export default roomSettings;
