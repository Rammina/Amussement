import LeftArrowImg from "../../icons/left-arrow.png";

import "./UserInfo.scss";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";
import cloudinaryRest from "../../apis/cloudinaryRest";

import EditAccount from "../forms/EditAccount";
import ChangeUserPassword from "../forms/ChangeUserPassword";
import UserAvatar from "../UserAvatar/UserAvatar";

import { removeUserAvatar } from "../../flux/actions/settingsActions";

const UserInfo = props => {
  const [editAccountOpened, setEditAccountOpened] = useState(false);
  const [changePasswordOpened, setChangePasswordOpened] = useState(false);
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  useEffect(() => {
    // userinfo needs to get the ID from the parent component
    console.log(props.userId);
  }, []);

  //refs
  let inputImageRef = useRef(null);

  const getUsername = () => (props.user ? props.user.username : null);
  const getEmail = () => (props.user ? props.user.email : null);

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

  const hideSection = sectionName => {
    console.log("hiding section");
    console.log(props.error.msg);
    console.log(editAccountOpened);
    if (!props.error.msg) {
      if (sectionName === "EditAccount" || sectionName === "edit-account") {
        console.log("hiding edit account section");
        setEditAccountOpened(false);
        console.log(editAccountOpened);
      } else if (
        sectionName === "ChangeUserPassword" ||
        sectionName === "change-user-password"
      ) {
        setChangePasswordOpened(false);
      }
    }
  };

  // render
  return (
    <div className="user-settings-content-container">
      {renderSection()}
      <div className="my-account-section-container">
        <div className="my-account-content-header">
          <button id="my-account-back-button" onClick={props.closeMyAccount}>
            <img
              className="logout-icon-img"
              src={LeftArrowImg}
              alt="Left Arrow Icon"
            />
          </button>
          <h1 className="my-account-section-heading">My Account</h1>
        </div>
        <div className="profile-container">
          <UserAvatar />
          <div className="" id="profile-information-container">
            <p className="profile-information" id="profile-username">
              {getUsername()}
            </p>
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
            id="profile-edit-button"
            onClick={() => {
              setChangePasswordOpened(true);
            }}
          >
            Change Password
          </button>
        </div>
      </div>
      <div className="my-account-section-container"></div>
    </div>
  );
};
{
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error
});

const userInfo = connect(
  mapStateToProps,
  { removeUserAvatar }
)(UserInfo);

export default userInfo;
/*
reduxForm({
  form: "registerForm",
  validate
})(registerForm);
*/
