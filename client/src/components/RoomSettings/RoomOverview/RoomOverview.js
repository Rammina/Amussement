import LeftArrowImg from "../../../icons/left-arrow.png";

import "./RoomOverview.scss";

import React, { useState, useEffect, useRef } from "react";
import { Route, Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

// import serverRest from "../../apis/serverRest";
// import cloudinaryRest from "../../apis/cloudinaryRest";

import history from "../../../history";

// import EditAccount from "../forms/userAccount/EditAccount";
// import ChangeUserPassword from "../forms/userAccount/ChangeUserPassword";
// import DisableAccount from "../forms/userAccount/DisableAccount";
// import DeleteAccount from "../forms/userAccount/DeleteAccount";
// import RoomAvatar from "./RoomAvatar/RoomAvatar";
import BackButton from "../../buttons/BackButton";
import CloseButton from "../../buttons/CloseButton";

import { clearErrors } from "../../../flux/actions/errorActions";
import { render } from "react-dom";

const RoomOverview = (props) => {
  // const [editAccountOpened, setEditAccountOpened] = useState(false);
  // const [changePasswordOpened, setChangePasswordOpened] = useState(false);
  // const [disableAccountOpened, setDisableAccountOpened] = useState(false);
  // const [deleteAccountOpened, setDeleteAccountOpened] = useState(false);

  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const { id } = useParams();

  useEffect(() => {}, []);

  //refs
  let inputImageRef = useRef(null);

  const renderDesktopHeading = () => {
    if (!props.isDesktopWidth) return null;
    return (
      <div className="room-overview-section-heading-container desktop">
        <h1 className="room-overview-section-heading desktop">Room Overview</h1>
        <CloseButton
          componentClass="settings-page"
          buttonId="settings-page-close-button"
          imageId="user-setting-close-image"
          buttonLabel={
            <span className="close-button-label" id="settings-page-close-label">
              esc
            </span>
          }
          onClickHandler={() => {
            //note: re-\ implement this because it's buggy right now
            // history.goBack();
            history.push(`/users/${id}/home`);
          }}
        />
      </div>
    );
  };

  const renderSection = () => {
    return null;
  };

  const hideSection = (sectionName) => {};

  // render

  return (
    props.user && (
      <div className="settings-page-content-container">
        {/*
          {renderDesktopHeading()}
          {renderSection()}
          */}
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
            <RoomAvatar />

            <div className="" id="room-information-container">
              <label className="room-information label">ROOM NAME</label>
              <p className="room-information" id="room-name">
                {props.name}
              </p>

              <button
                className="room-information"
                id="user-avatar-remove"
                onClick={() => {
                  // props.removeRoomAvatar();
                }}
              >
                Remove Image
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
{
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  error: state.error,
});

const userInfo = connect(mapStateToProps, {
  // removeRoomAvatar
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
      // setEditAccountOpened(true);
    }}
  >
    Edit Account
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
