import "./DeleteMessage.scss";

import React, { useContext } from "react";
import ReactDOM from "react-dom";

import { ChatContext } from "../../../AppContext";

import Modal from "../../../Modal/Modal";

import { toChatCustomTimestamp } from "../../../../helpers";

const DeleteMessage = (props) => {
  const { deleteMessage } = useContext(ChatContext);
  const { message } = props;

  const deleteMessageHandler = () => {
    // note: cannot remove messages sent from thefrontend because they have no ._id
    console.log("Deleting " + message._id);
    deleteMessage(message._id);
    props.onModalClose();
  };

  const renderSelectedMessage = () => {
    if (window.innerWidth >= 1200 && window.innerHeight >= 600) {
      return (
        <div className="delete-message messageContainer justifyStart null">
          <div className="profile-picture-outer-container message">
            <div className="profile-picture-inner-container message">
              <img
                className="profile-picture-image message"
                src={message.user.image_url}
              />
            </div>
          </div>
          <div className="message-text-container">
            <p className="sender-text ">{message.username}</p>
            <span className="message-timestamp beside-sender">
              {toChatCustomTimestamp(message.createdAt || null) || null}
            </span>
            <div className="messageBox">
              <p className="message-text">{message.text}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <p
          id="message-to-be-deleted"
          className="modal-paragraph delete-message"
        >
          {message.text}
        </p>
      );
    }
  };

  const content = (
    <React.Fragment>
      <Modal
        componentClass="delete-message"
        onModalClose={() => {
          props.onModalClose();
        }}
        headerClassName="delete-message"
        headingText="Delete Message"
        actionButtons={
          <button
            className={"form-button submit mt-20 danger"}
            type="submit"
            onClick={deleteMessageHandler}
          >
            Delete Message
          </button>
        }
      >
        <>
          <p
            id="delete-message-warning"
            className="modal-paragraph delete-message"
          >
            Are you sure you want to delete this message?
          </p>
          {renderSelectedMessage()}
        </>
      </Modal>
    </React.Fragment>
  );

  // render
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

export default DeleteMessage;
