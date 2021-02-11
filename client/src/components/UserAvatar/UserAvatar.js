import DefaultAvatarImg from "../../images/default-avatar.jpg";

import "./UserAvatar.scss";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import BackButton from "../buttons/BackButton";
import CloseButton from "../buttons/CloseButton";
import Modal from "../Modal/Modal";

import serverRest from "../../apis/serverRest";
import cloudinaryRest from "../../apis/cloudinaryRest";

import { formShowLoader } from "../../flux/actions/loaderActions";
import { editUserAvatar } from "../../flux/actions/settingsActions";
import * as constants from "../../utils/constants.js";

// import { ModalContext } from "../AppContext";

import ProfilePicture from "../ProfilePicture/ProfilePicture";
import LoadingSpinner from "../loaders/LoadingSpinner";

const UserAvatar = (props) => {
  const { DESKTOP_WIDTH, DESKTOP_HEIGHT } = constants;
  const [isDesktopWidth, setIsDesktopWidth] = useState(false);
  const [isDesktopHeight, setIsDesktopHeight] = useState(false);
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleResize = () => {
    if (window.innerWidth >= DESKTOP_WIDTH) {
      setIsDesktopWidth(true);
      console.log("desktop with");
    } else {
      setIsDesktopWidth(false);
      console.log("not desktop with");
    }
    if (window.innerHeight >= DESKTOP_HEIGHT) {
      setIsDesktopHeight(true);
      console.log("desktop height");
    } else {
      setIsDesktopHeight(false);
      console.log("no desktop height");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    // UserAvatar needs to get the ID from the parent component
    console.log(getAvatarUrl());
    console.log(props.userId);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {}, []);

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

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
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
    props.formShowLoader("uploadAvatarForm", true);
    uploadImage(previewSource);
  };

  const renderLoader = () => <LoadingSpinner showLoader={props.showLoader} />;

  const renderImageUploadModal = () => {
    console.log(imageUploadName);
    console.log(imageUploadModalOpen);
    // do not render until image is chosen
    if (!imageUploadModalOpen) return null;
    // render a mobile version until desktop dimensions
    if (!isDesktopWidth || !isDesktopHeight) {
      return ReactDOM.createPortal(
        <React.Fragment>
          <Modal
            componentClass="user-avatar"
            onModalClose={() => {
              console.log("this is automatically closing");
              setImageUploadModalOpen(false);
            }}
            headerClassName="user-settings-sidebar-header"
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
          console.log("this is automatically closing");
          setImageUploadModalOpen(false);
        }}
        headerClassName="user-settings-sidebar-header"
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
                className="user-avatar modal-button cancel-button"
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
const mapStateToProps = (state) => ({
  user: state.user.info,
  error: state.error,
  showLoader: state.loader.showUploadAvatarFormLoader,
});

const userAvatar = connect(mapStateToProps, { editUserAvatar, formShowLoader })(
  UserAvatar
);

export default userAvatar;
