import "./RoomOverview.scss";

import React, { useState, useEffect, useRef, useContext } from "react";

import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import EditRoom from "../../forms/room/EditRoom";
import RoomIcon from "./RoomIcon/RoomIcon";
import BackButton from "../../buttons/BackButton";
import CloseButton from "../../buttons/CloseButton";

import { clearErrors } from "../../../flux/actions/errorActions";

import { WindowContext, RoomContext } from "../../AppContext";

const RoomOverview = (props) => {
  const [editRoomOpened, setEditRoomOpened] = useState(false);

  const { isDesktopWidth } = useContext(WindowContext);
  const { room, roomSettingsOnCloseHandler } = useContext(RoomContext);

  useEffect(() => {}, []);

  //refs

  let changeIconFormRef = useRef(null);

  const uploadImageButtonOnClickHandler = () => {
    if (changeIconFormRef.current !== null) {
      changeIconFormRef.current.click();
    }
  };

  const renderEditRoom = () => {
    if (!editRoomOpened) return null;

    const editRoomOnCloseHandler = () => {
      setEditRoomOpened(false);
    };
    return (
      <EditRoom
        initialValues={{ ...room, password: "" }}
        onClose={editRoomOnCloseHandler}
      />
    );
  };

  const renderSection = () => {
    return null;
  };

  // render
  return (
    props.user && (
      <div className="settings-page-content-container">
        {renderEditRoom()}
        <div className="room-overview-section-container room-info-outer-container">
          <div className="settings-page-content-header">
            <BackButton
              componentClass="room-overview"
              buttonId="room-overview-back-button"
              hideOnDesktop={true}
              onClickHandler={props.closeRoomOverview}
            />

            <h1
              id="room-overview-section-heading"
              className="settings-page-content-header-heading"
            >
              Room Overview
            </h1>
          </div>
          <div className="room-container">
            <RoomIcon changeIconFormRef={changeIconFormRef} />

            <div className="" id="room-information-container">
              <label className="room-information label">ROOM NAME</label>
              <p className="room-information" id="room-name">
                {room.name}
              </p>

              <button
                className="room-information room-icon-remove hide-750w"
                onClick={() => {}}
              >
                Remove Image
              </button>
            </div>
          </div>

          <div className="two-buttons-container" id="room-buttons-container">
            <button
              className="room-button"
              id="room-upload-button"
              onClick={uploadImageButtonOnClickHandler}
            >
              Upload Image
            </button>
            <button
              className="room-button"
              id="room-edit-button"
              onClick={() => {
                setEditRoomOpened(true);
              }}
            >
              Edit Room
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  error: state.error,
});

const userInfo = connect(mapStateToProps, {
  clearErrors,
})(RoomOverview);

export default userInfo;
/*
reduxForm({
  form: "registerForm",
  validate
})(registerForm);
*/

/*
<div className="two-buttons-container" id="room-buttons-container">
  <button
    className="room-button"
    id="room-edit-button"
    onClick={() => {
      // setEditRoomOpened(true);
    }}
  >
    Edit Room
  </button>

  <button
    className="room-button"
    id="room-change-password-button"
    onClick={() => {
      setChangePasswordOpened(true);
    }}
  >
    Change Password
  </button>
</div>
*/
