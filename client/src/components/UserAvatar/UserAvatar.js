import "./UserAvatar.scss";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";
import cloudinaryRest from "../../apis/cloudinaryRest";

import { editUserAvatar } from "../../flux/actions/settingsActions";

const UserAvatar = props => {
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  useEffect(() => {
    // UserAvatar needs to get the ID from the parent component
    console.log(props.userId);
  }, []);

  //refs
  let inputImageRef = useRef(null);
  const getAvatarUrl = () => (props.user ? props.user.image_url : null);

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
        <div className={`user-avatar modal ${getImageUploadModalClass()}`}>
          <h3 className="user-avatar modal-heading">Upload Avatar</h3>
          {previewSource && (
            <img
              id="user-avatar-preview-image"
              src={previewSource}
              alt="Chosen Image"
            />
          )}
          <p className="user-avatar modal-paragraph">{imageUploadName}</p>
          <p className="user-avatar modal-paragraph">
            Would you like to select this image as your avatar?
          </p>
          <button type="submit">Submit Image</button>
        </div>
      </form>
      <div className="" id="profile-large-image-container">
        <img id="user-large-image" src={`${getAvatarUrl() || ""}`} />
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.error
});

const userAvatar = connect(
  mapStateToProps,
  { editUserAvatar }
)(UserAvatar);

export default userAvatar;
