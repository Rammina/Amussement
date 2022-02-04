import "./RoomIcon.scss";

import React, { useState, useRef, useContext } from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import Modal from "../../../Modal/Modal";

import { actionShowLoader } from "../../../../flux/actions/loaderActions";
import { editRoomIcon } from "../../../../flux/actions/roomsActions";

import { WindowContext, RoomContext } from "../../../AppContext";

import ProfilePicture from "../../../ProfilePicture/ProfilePicture";
import LoadingSpinner from "../../../loaders/LoadingSpinner";

const RoomIcon = (props) => {
  const [imageUploadModalOpen, setImageUploadModalOpen] = useState(false);
  const [imageUploadName, setImageUploadName] = useState(null);
  const [fileInputState, setFileInputState] = useState("");

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
    await props.editRoomIcon(base64EncodedImage, room._id);
    setImageUploadModalOpen(false);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();

    if (!previewSource) {
      return;
    }
    props.actionShowLoader("uploadRoomIconForm", true);
    uploadImage(previewSource);
  };

  const renderLoader = () => <LoadingSpinner showLoader={props.showLoader} />;

  const renderRoomImage = () => {
    if (!room || !room.image_url || !room.image_url === "")
      return (
        <div class="profile-picture-outer-container room-icon">
          <div className="room-icon profile-picture-inner-container no-image">
            {room.name.charAt(0)}
          </div>
        </div>
      );
    return (
      <ProfilePicture
        imageSrc={`${getAvatarUrl()}`}
        componentClass="room-icon"
      />
    );
  };

  const renderImageUploadModal = () => {
    // do not render until image is chosen
    if (!imageUploadModalOpen) return null;
    // render a mobile version until desktop dimensions
    if (!isDesktopWidth || !isDesktopHeight) {
      return ReactDOM.createPortal(
        <React.Fragment>
          <Modal
            componentClass="room-icon"
            onModalClose={() => {
              setImageUploadModalOpen(false);
            }}
            headerClassName="settings-page-sidebar-header"
            headingText="Upload Room Icon"
          >
            <form encType="multipart/form-data" onSubmit={handleSubmitFile}>
              <div className={`room-icon modal-content-container`}>
                {previewSource && (
                  <img
                    id="room-icon-preview-image"
                    src={previewSource}
                    alt="Chosen Image"
                  />
                )}
                <p className="room-icon modal-paragraph">{imageUploadName}</p>

                <div
                  className="two-buttons-container"
                  id="room-icon-buttons-container"
                >
                  <button
                    id="room-icon-image-cancel"
                    className="room-icon modal-button cancel-button hide-on-mobile"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setImageUploadModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    id="room-icon-image-submit"
                    className="room-icon modal-button form-button submit"
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
        componentClass="room-icon"
        onModalClose={() => {
          setImageUploadModalOpen(false);
        }}
        headerClassName="settings-page-sidebar-header"
        headingText="Upload Room Icon"
        actionButtons={
          <button
            id="room-icon-image-submit"
            className="room-icon modal-button form-button submit"
            type="submit"
            onClick={handleSubmitFile}
          >
            {renderLoader()} Submit Image
          </button>
        }
      >
        <form encType="multipart/form-data" onSubmit={handleSubmitFile}>
          <div className={`room-icon modal-content-container`}>
            {previewSource && (
              <img
                id="room-icon-preview-image"
                src={previewSource}
                alt="Chosen Image"
              />
            )}
            <p className="room-icon modal-paragraph">{imageUploadName}</p>
          </div>
        </form>
      </Modal>,
      document.getElementById("modal")
    );
  };

  return (
    <div className="" id="room-icon-change-container">
      <form
        id="room-icon-form"
        encType="multipart/form-data"
        onSubmit={handleSubmitFile}
      >
        <label
          ref={props.changeIconFormRef || null}
          htmlFor="room-icon-upload"
          className=""
          id="room-icon-upload-label"
        >
          Change Room Avatar
        </label>
        <input
          ref={inputImageRef}
          type="file"
          id="room-icon-upload"
          name="profile-icon"
          accept="image/*"
          value={fileInputState}
          onChange={(e) => {
            setImageUploadModalOpen(true);
            handleImageInputChange(e);
          }}
        />
        {renderImageUploadModal()}
      </form>

      {renderRoomImage()}
      <button
        className="room-information room-icon-remove below-avatar show-750w"
        onClick={() => {}}
      >
        Remove
      </button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  error: state.error,
  showLoader: state.loader.showUploadRoomIconFormLoader,
});

const roomIcon = connect(mapStateToProps, {
  editRoomIcon,
  actionShowLoader,
})(RoomIcon);

export default roomIcon;
