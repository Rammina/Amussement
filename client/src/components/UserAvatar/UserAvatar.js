import DefaultAvatarImg from "../../images/default-avatar.jpg";

import "./UserAvatar.scss";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import BackButton from "../buttons/BackButton";
import CloseButton from "../buttons/CloseButton";

import serverRest from "../../apis/serverRest";
import cloudinaryRest from "../../apis/cloudinaryRest";

import { editUserAvatar } from "../../flux/actions/settingsActions";

import ProfilePicture from "../ProfilePicture/ProfilePicture";

const UserAvatar = props => {
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  useEffect(() => {
    // UserAvatar needs to get the ID from the parent component
    console.log(getAvatarUrl());
    console.log(props.userId);
  }, []);

  //refs
  let inputImageRef = useRef(null);
  const getAvatarUrl = () => {
    if (props.user) {
      if (props.user.image_url) {
        return props.user.image_url;
      }
    }
    return "";
  };

  const getImageUploadModalClass = () => {
    return imageUploadModalOpen ? "show" : "hide";
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleImageInputChange = e => {
    const file = e.target.files[0];
    console.log(file);
    setImageUploadName(file.name);
    previewFile(file);
  };

  const uploadImage = async base64EncodedImage => {
    await props.editUserAvatar(base64EncodedImage, props.user._id);
    setImageUploadModalOpen(false);
  };

  const handleSubmitFile = e => {
    e.preventDefault();
    if (!previewSource) {
      return;
    }
    uploadImage(previewSource);
  };

  const renderImageUploadModal = () => {
    console.log(imageUploadName);
    if (!imageUploadModalOpen) return null;
    return ReactDOM.createPortal(
      <React.Fragment>
        <div
          className={`backdrop ${getImageUploadModalClass()} user-avatar`}
          onClick={() => {
            setImageUploadModalOpen(false);
          }}
        ></div>
        <div className={`user-avatar modal ${getImageUploadModalClass()}`}>
          <header className="user-settings-sidebar-header user-avatar">
            <div className="modal-heading-container modal-header-content-container">
              <BackButton
                componentClass="user-avatar"
                hideOnDesktop={true}
                onClickHandler={() => {
                  setImageUploadModalOpen(false);
                }}
              />
              <h3 className="user-avatar modal-heading modal-header-heading">
                Upload Avatar
              </h3>
              <CloseButton
                componentClass="user-avatar"
                hideOnMobile={true}
                onClickHandler={() => {
                  setImageUploadModalOpen(false);
                }}
              />
            </div>
          </header>
          <div className={`user-avatar modal-content-container`}>
            {previewSource && (
              <img
                id="user-avatar-preview-image"
                src={previewSource}
                alt="Chosen Image"
              />
            )}
            <p className="user-avatar modal-paragraph">{imageUploadName}</p>
            {/*<p className="user-avatar modal-paragraph">
            Would you like to select this image as your avatar?
          </p>
          */}
            <div
              className="two-buttons-container"
              id="user-avatar-buttons-container"
            >
              <button
                id="user-avatar-image-cancel"
                className="user-avatar modal-button"
              >
                Cancel
              </button>
              <button
                id="user-avatar-image-submit"
                className="user-avatar modal-button"
                type="submit"
              >
                Submit Image
              </button>
            </div>
          </div>
        </div>{" "}
      </React.Fragment>,
      document.getElementById("modal")
    );
  };

  return (
    <div className="" id="user-avatar-change-container">
      <form
        id="user-avatar-form"
        encType="multipart/form-data"
        onSubmit={handleSubmitFile}
      >
        <label
          htmlFor="user-avatar-upload"
          className=""
          id="user-avatar-upload-label"
        >
          Change Avatar
        </label>
        <input
          ref={inputImageRef}
          type="file"
          id="user-avatar-upload"
          name="profile-avatar"
          accept="image/*"
          value={fileInputState}
          onChange={e => {
            // e.stopPropagation();
            console.log("hello");
            setImageUploadModalOpen(true);
            handleImageInputChange(e);
          }}
        />
        {renderImageUploadModal()}
      </form>

      <ProfilePicture
        imageSrc={`${getAvatarUrl()}` || DefaultAvatarImg}
        componentClass="user-avatar"
      />
    </div>
  );
};
const mapStateToProps = state => ({
  user: state.user.info,
  error: state.error
});

const userAvatar = connect(
  mapStateToProps,
  { editUserAvatar }
)(UserAvatar);

export default userAvatar;
