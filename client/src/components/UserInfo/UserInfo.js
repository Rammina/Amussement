import LeftArrowImg from "../../icons/left-arrow.png";

import "./UserInfo.scss";

import React, { useState, useEffect, useRef } from "react";
import { Route, Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";
import cloudinaryRest from "../../apis/cloudinaryRest";

import history from "../../history";

import EditAccount from "../forms/EditAccount";
import ChangeUserPassword from "../forms/ChangeUserPassword";
import UserAvatar from "../UserAvatar/UserAvatar";
import BackButton from "../buttons/BackButton";
import CloseButton from "../buttons/CloseButton";

import { removeUserAvatar } from "../../flux/actions/settingsActions";
import { clearErrors } from "../../flux/actions/errorActions";

const UserInfo = (props) => {
  const [editAccountOpened, setEditAccountOpened] = useState(false);
  const [changePasswordOpened, setChangePasswordOpened] = useState(false);
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // userinfo needs to get the ID from the parent component
    console.log(props.userId);
  }, []);

  //refs
  let inputImageRef = useRef(null);

  const getUsername = () => (props.user ? props.user.username : null);
  const getEmail = () => (props.user ? props.user.email : null);

  const renderDesktopHeading = () => {
    if (!props.isDesktopWidth) return null;
    return (
      <div className="my-account-section-heading-container desktop">
        <h1 className="my-account-section-heading desktop">My Account</h1>
        <CloseButton
          componentClass="user-settings"
          buttonId="user-settings-close-button"
          imageId="user-setting-close-image"
          buttonLabel={
            <span className="close-button-label" id="user-settings-close-label">
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
    if (editAccountOpened) {
      console.log("Opening edit account");
      return (
        <EditAccount
          initialValues={props.user}
          hideSection={() => {
            hideSection("EditAccount");
          }}
        />
      );
    } else if (changePasswordOpened) {
      console.log("Opening change password");
      return (
        <ChangeUserPassword
          hideSection={() => {
            hideSection("ChangeUserPassword");
          }}
        />
      );
    }
    return null;
  };

  const hideSection = (sectionName) => {
    console.log("hiding section");
    console.log(props.error.msg);
    console.log(editAccountOpened);

    if (sectionName === "EditAccount" || sectionName === "edit-account") {
      console.log("hiding edit account section");
      setEditAccountOpened(false);
      console.log(editAccountOpened);
    } else if (
      sectionName === "ChangeUserPassword" ||
      sectionName === "change-user-password"
    ) {
      setChangePasswordOpened(false);
      /*
        hideSection={() => {
          hideSection("ChangeUserPassword");
        }}
        */
    }
    // clear errors when closing a modal
    props.clearErrors();
  };

  // render
  return (
    props.user && (
      <div className="user-settings-content-container">
        {renderDesktopHeading()}
        {renderSection()}

        <div className="my-account-section-container">
          <div className="user-settings-content-header">
            <BackButton
              componentClass="my-account"
              buttonId="my-account-back-button"
              hideOnDesktop={true}
              onClickHandler={props.closeMyAccount}
            />

            <h1
              id="my-account-section-heading"
              className="user-settings-content-header-heading"
            >
              My Account
            </h1>
          </div>
          <div className="profile-container">
            <UserAvatar />
            <div className="" id="profile-information-container">
              <label className="profile-information label">USERNAME</label>
              <p className="profile-information" id="profile-username">
                {getUsername()}
              </p>
              <label className="profile-information label">EMAIL</label>

              <p className="profile-information" id="profile-email">
                {getEmail()}
              </p>
              <button
                className="profile-information"
                id="user-avatar-remove"
                onClick={() => {
                  props.removeUserAvatar();
                }}
              >
                Remove Image
              </button>
            </div>
          </div>

          <div className="two-buttons-container" id="profile-buttons-container">
            <button
              className="profile-button"
              id="profile-edit-button"
              onClick={() => {
                setEditAccountOpened(true);
              }}
            >
              Edit Account
            </button>

            <button
              className="profile-button"
              id="profile-change-password-button"
              onClick={() => {
                setChangePasswordOpened(true);
              }}
            >
              Change Password
            </button>
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

const userInfo = connect(mapStateToProps, { removeUserAvatar, clearErrors })(
  UserInfo
);

export default userInfo;
/*
reduxForm({
  form: "registerForm",
  validate
})(registerForm);
*/
