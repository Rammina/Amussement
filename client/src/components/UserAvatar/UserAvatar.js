import DefaultAvatarImg from "../../images/default-avatar.png";

import "./UserAvatar.scss";

import React, { useState, useRef, useContext } from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import Modal from "../Modal/Modal";

import { actionShowLoader } from "../../flux/actions/loaderActions";
import {
  editUserAvatar,
  removeUserAvatar,
} from "../../flux/actions/settingsActions";

import { WindowContext } from "../AppContext";

import ProfilePicture from "../ProfilePicture/ProfilePicture";
import LoadingSpinner from "../loaders/LoadingSpinner";

const UserAvatar = (props) => {
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");

  const [previewSource, setPreviewSource] = useState("");
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);

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

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    setImageUploadName(file.name);
    previewFile(file);
  };

  const uploadImage = async (base64EncodedImage) => {
    await props.editUserAvatar(base64EncodedImage, props.user._id);
    setImageUploadModalOpen(false);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();

    if (!previewSource) {
      return;
    }
    props.actionShowLoader("uploadUserAvatarForm", true);
    uploadImage(previewSource);
  };

  const renderLoader = () => <LoadingSpinner showLoader={props.showLoader} />;

  const renderImageUploadModal = () => {
    // do not render until image is chosen
    if (!imageUploadModalOpen) return null;
    // render a mobile version until desktop dimensions
    if (!isDesktopWidth || !isDesktopHeight) {
      return ReactDOM.createPortal(
        <React.Fragment>
          <Modal
            componentClass="user-avatar"
            onModalClose={() => {
              setImageUploadModalOpen(false);
            }}
            headerClassName="settings-page-sidebar-header"
            headingText="Upload Avatar"
          >
            <form encType="multipart/form-data" onSubmit={handleSubmitFile}>
              <div className={`user-avatar modal-content-container`}>
                {previewSource && (
                  <img
                    id="user-avatar-preview-image"
                    src={previewSource}
                    alt="Chosen Image"
                  />
                )}
                <p className="user-avatar modal-paragraph">{imageUploadName}</p>

                <div
                  className="two-buttons-container"
                  id="user-avatar-buttons-container"
                >
                  <button
                    id="user-avatar-image-cancel"
                    className="user-avatar modal-button cancel-button hide-on-mobile"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setImageUploadModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    id="user-avatar-image-submit"
                    className="user-avatar modal-button form-button submit"
                    type="submit"
                  >
                    {renderLoader()} Submit Image
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        </React.Fragment>,
        document.getElementById("modal")
      );
    }
    // otherwise, render the desktop version
    return ReactDOM.createPortal(
      <Modal
        componentClass="user-avatar"
        onModalClose={() => {
          setImageUploadModalOpen(false);
        }}
        headerClassName="settings-page-sidebar-header"
        headingText="Upload Avatar"
        actionButtons={
          <button
            id="user-avatar-image-submit"
            className="user-avatar modal-button form-button submit"
            type="submit"
            onClick={handleSubmitFile}
          >
            {renderLoader()} Submit Image
          </button>
        }
      >
        <form encType="multipart/form-data" onSubmit={handleSubmitFile}>
          <div className={`user-avatar modal-content-container`}>
            {previewSource && (
              <img
                id="user-avatar-preview-image"
                src={previewSource}
                alt="Chosen Image"
              />
            )}
            <p className="user-avatar modal-paragraph">{imageUploadName}</p>
          </div>
        </form>
      </Modal>,
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
          onChange={(e) => {
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
      <button
        className="profile-information user-avatar-remove below-avatar show-750w"
        onClick={() => {
          props.removeUserAvatar();
        }}
      >
        Remove
      </button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.info,
  error: state.error,
  showLoader: state.loader.showUploadUserAvatarFormLoader,
});

const userAvatar = connect(mapStateToProps, {
  editUserAvatar,
  actionShowLoader,
  removeUserAvatar,
})(UserAvatar);

export default userAvatar;
