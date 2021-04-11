// import DefaultAvatarImg from "../../../../images/default-room-avatar.jpg";

import "./RoomAvatar.scss";

import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import BackButton from "../../../buttons/BackButton";
import CloseButton from "../../../buttons/CloseButton";
import Modal from "../../../Modal/Modal";

// import serverRest from "../../../../apis/serverRest";
// import cloudinaryRest from "../../../../apis/cloudinaryRest";

import { actionShowLoader } from "../../../../flux/actions/loaderActions";
import { editRoomAvatar } from "../../../../flux/actions/roomsActions";

import { WindowContext, RoomContext } from "../../../AppContext";

import ProfilePicture from "../../../ProfilePicture/ProfilePicture";
import LoadingSpinner from "../../../loaders/LoadingSpinner";

const RoomAvatar = (props) => {
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);
  const { room } = useContext(RoomContext);

  //refs
  let inputImageRef = useRef(null);
  const getAvatarUrl = () => {
    if (room) {
      if (room.image_url) {
        return room.image_url;
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
    await props.editRoomAvatar(base64EncodedImage, room._id);
    setImageUploadModalOpen(false);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();

    if (!previewSource) {
      return;
    }
    props.actionShowLoader("uploadRoomAvatarForm", true);
    uploadImage(previewSource);
  };

  const renderLoader = () => <LoadingSpinner showLoader={props.showLoader} />;

  const renderRoomImage = () => {
    if (!room || !room.image_url || !room.image_url === "")
      return (
        <div class="profile-picture-outer-container room-avatar">
          <div className="room-avatar profile-picture-inner-container no-image">
            {room.name.charAt(0)}
          </div>
        </div>
      );
    return (
      <ProfilePicture
        imageSrc={`${getAvatarUrl()}`}
        componentClass="room-avatar"
      />
    );
  };

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
            componentClass="room-avatar"
            onModalClose={() => {
              console.log("this is automatically closing");
              setImageUploadModalOpen(false);
            }}
            headerClassName="settings-page-sidebar-header"
            headingText="Upload Room Icon"
          >
            <form encType="multipart/form-data" onSubmit={handleSubmitFile}>
              <div className={`room-avatar modal-content-container`}>
                {previewSource && (
                  <img
                    id="room-avatar-preview-image"
                    src={previewSource}
                    alt="Chosen Image"
                  />
                )}
                <p className="room-avatar modal-paragraph">{imageUploadName}</p>

                <div
                  className="two-buttons-container"
                  id="room-avatar-buttons-container"
                >
                  <button
                    id="room-avatar-image-cancel"
                    className="room-avatar modal-button cancel-button hide-on-mobile"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setImageUploadModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    id="room-avatar-image-submit"
                    className="room-avatar modal-button form-button submit"
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
        componentClass="room-avatar"
        onModalClose={() => {
          console.log("this is automatically closing");
          setImageUploadModalOpen(false);
        }}
        headerClassName="settings-page-sidebar-header"
        headingText="Upload Room Icon"
        actionButtons={
          <button
            id="room-avatar-image-submit"
            className="room-avatar modal-button form-button submit"
            type="submit"
            onClick={handleSubmitFile}
          >
            {renderLoader()} Submit Image
          </button>
        }
      >
        <form encType="multipart/form-data" onSubmit={handleSubmitFile}>
          <div className={`room-avatar modal-content-container`}>
            {previewSource && (
              <img
                id="room-avatar-preview-image"
                src={previewSource}
                alt="Chosen Image"
              />
            )}
            <p className="room-avatar modal-paragraph">{imageUploadName}</p>
          </div>
        </form>
      </Modal>,
      document.getElementById("modal")
    );
  };

  return (
    <div className="" id="room-avatar-change-container">
      <form
        id="room-avatar-form"
        encType="multipart/form-data"
        onSubmit={handleSubmitFile}
      >
        <label
          htmlFor="room-avatar-upload"
          className=""
          id="room-avatar-upload-label"
        >
          Change Room Avatar
        </label>
        <input
          ref={inputImageRef}
          type="file"
          id="room-avatar-upload"
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

      {renderRoomImage()}
      <button
        className="room-information room-avatar-remove below-avatar show-750w"
        onClick={() => {
          // props.removeUserAvatar();
        }}
      >
        Remove
      </button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  error: state.error,
  showLoader: state.loader.showUploadRoomAvatarFormLoader,
});

const roomAvatar = connect(mapStateToProps, {
  editRoomAvatar,
  actionShowLoader,
})(RoomAvatar);

export default roomAvatar;
