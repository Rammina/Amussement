// 	https://api.cloudinary.com/v1_1/totooria
// import DoorImg from "../../icons/door.png";

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
  const getAvatarUrl = () => (props.user ? props.user.image_url : null);

  const renderSection = () => {
    if (editAccountOpened) {
      console.log("Opening edit account");
      return (
        <EditAccount
          initialValues={props.user}
          closeEditAccount={() => {
            if (props.error.msg) {
              setEditAccountOpened(false);
            }
          }}
        />
      );
    } else if (changePasswordOpened) {
      console.log("Opening change password");
      return (
        <ChangeUserPassword
          closeChangePassword={() => {
            if (props.error.msg) {
              setChangePasswordOpened(false);
            }
          }}
        />
      );
    }
    return null;
  };

  const getImageUploadModalClass = () => {
    return imageUploadModalOpen ? "show" : "hide";
  };

  const previewFile = file => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setPreviewSource(reader.result);
    };
  };

  const handleImageInputChange = e => {
    const file = e.target.files[0];
    console.log(file);
    previewFile(file);
    /*
    if (inputImageRef.current) {
      setImageUploadName(getFilenameFromDir(inputImageRef.current.value, "\\"));
    }
    */
  };
  const uploadImage = async base64EncodedImage => {
    console.log("uploading image");
    console.log(base64EncodedImage);
    console.log(props.user);
    await props.editUserAvatar(base64EncodedImage, props.user._id);
    setImageUploadModalOpen(false);
  };

  const handleSubmitFile = e => {
    e.preventDefault();
    console.log(previewSource);
    console.log("hello");
    // e.preventDefault();
    // e.stopPropagation();
    if (!previewSource) {
      console.log("no submitted file");
      return;
    }
    console.log("we are here");
    uploadImage(previewSource);
  };

  return (
    <div className="user-settings-content-container">
      {renderSection()}
      <div className="user-settings-section-container">
        <div className="user-settings-content-header">
          <h1 className="user-settings-section-heading">My Account</h1>
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
      <div className="user-settings-section-container"></div>
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
