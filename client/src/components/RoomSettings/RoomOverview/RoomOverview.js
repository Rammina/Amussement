import LeftArrowImg from "../../../icons/left-arrow.png";

import "./RoomOverview.scss";

import React, { useState, useEffect, useRef, useContext } from "react";
import { render } from "react-dom";
import { Route, Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

// import serverRest from "../../apis/serverRest";
// import cloudinaryRest from "../../apis/cloudinaryRest";

import history from "../../../history";

import EditRoom from "../../forms/room/EditRoom";
import RoomIcon from "./RoomIcon/RoomIcon";
import BackButton from "../../buttons/BackButton";
import CloseButton from "../../buttons/CloseButton";

import { clearErrors } from "../../../flux/actions/errorActions";

import { WindowContext, RoomContext } from "../../AppContext";

const RoomOverview = (props) => {
  const [editRoomOpened, setEditRoomOpened] = useState(false);
  // const [changePasswordOpened, setChangePasswordOpened] = useState(false);
  // const [disableRoomOpened, setDisableRoomOpened] = useState(false);
  // const [deleteRoomOpened, setDeleteRoomOpened] = useState(false);
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const { isDesktopWidth } = useContext(WindowContext);
  const { room, roomSettingsOnCloseHandler } = useContext(RoomContext);
  const { id } = useParams();

  useEffect(() => {}, []);

  //refs
  let inputImageRef = useRef(null);
  let changeIconFormRef = useRef(null);

  const uploadImageButtonOnClickHandler = () => {
    if (changeIconFormRef.current !== null) {
      changeIconFormRef.current.click();
    }
  };

  const renderDesktopHeading = () => {
    if (!isDesktopWidth) return null;
    return (
      <div className="room-overview-section-heading-container desktop">
        <h1 className="room-overview-section-heading desktop">Room Overview</h1>
        <CloseButton
          componentClass="settings-page"
          buttonId="settings-page-close-button"
          imageId="settings-page-close-image"
          buttonLabel={
            <span className="close-button-label" id="settings-page-close-label">
              esc
            </span>
          }
          onClickHandler={() => {
            //note: re-\ implement this because it's buggy right now
            // history.goBack();
            // history.push(`/users/${id}/home`);
            roomSettingsOnCloseHandler();
          }}
        />
      </div>
    );
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
        {/*
          {renderDesktopHeading()}
          {renderSection()}
          */}
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
                onClick={() => {
                  // props.removeUserAvatar();
                }}
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
  // removeRoomIcon
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
