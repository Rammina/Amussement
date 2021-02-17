import "./Message.scss";

import React, { useState, useContext, useEffect } from "react";
import ReactEmoji from "react-emoji";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import ContextMenu from "../../UIComponents/ContextMenu/ContextMenu";
import DeleteMessage from "./DeleteMessage/DeleteMessage";

import { ChatContext } from "../../AppContext";
import { copyToClipboard } from "../../../helpers";

const Message = ({ message, name, sameSenderAsPrevMsg }) => {
  const [messageText, setMessageText] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const { deleteMessage, editMessage } = useContext(ChatContext);

  useEffect(() => {
    setMessageText(message.text);
    /*return () => {}*/
  }, []);

  const onCloseContextMenuHandler = () => {
    setShowContextMenu(false);
  };

  const onCopyIdHandler = () => {
    if (message && message._id) {
      copyToClipboard(message._id);
    }
  };

  const renderDeleteMessageModal = () => {
    if (!showDeleteMessageModal) return null;
    return (
      <DeleteMessage
        message={message}
        onModalClose={() => {
          setShowDeleteMessageModal(false);
        }}
      />
    );
  };

  const trimmedName = name.trim();
  let isSentByCurrentUser = false;
  if (message.user.username === name || message.user.name === name) {
    isSentByCurrentUser = true;
  }

  const renderContextMenu = () => {
    console.log(isSentByCurrentUser);
    if (!showContextMenu) return null;
    let actionButtons = null;

    if (isSentByCurrentUser) {
      actionButtons = (
        <>
          <button
            className="context-menu-button message"
            onClick={() => {
              setIsEditMode(true);
              onCloseContextMenuHandler();
            }}
          >
            <span>Edit Message</span>
          </button>
          <button
            className="context-menu-button message danger"
            onClick={() => {
              setShowDeleteMessageModal(true);
              onCloseContextMenuHandler();
            }}
          >
            <span>Delete Message</span>
          </button>
        </>
      );
    }
    return (
      <ContextMenu
        componentClass="message"
        clientX={clientX}
        clientY={clientY}
        onClose={onCloseContextMenuHandler}
      >
        <div className="context-menu-buttons-container message">
          {actionButtons}
          <button
            className="context-menu-button message"
            onClick={() => {
              onCopyIdHandler();
              onCloseContextMenuHandler();
            }}
          >
            <span>Copy Message ID</span>
          </button>
        </div>
      </ContextMenu>
    );
  };

  const renderMessageText = (textOnly) => {
    const textOnlyClass = textOnly ? "no-image" : "";
    let sameSenderClass = sameSenderAsPrevMsg ? "same-sender" : "";

    if (isEditMode)
      return (
        <div className={`messageBox`}>
          <textarea
            className={`message-text edit-mode colorDark ${textOnlyClass} ${sameSenderClass}`}
            value={messageText}
            autoFocus={true}
            onChange={({ target: { value } }) => {
              console.log(value);
              setMessageText(value);
            }}
            onKeyPress={(event) => {
              // console.log("keypressed on the input field");
              if (event.key === "Enter") {
                event.preventDefault();
                console.log("pressed enter on the input field");
                console.log(
                  `the updated message text is ${event.target.value}`
                );
                // note: this needs to handle empty input
                if (event.target.value && event.target.value !== "") {
                  editMessage(message._id, event.target.value);
                } else {
                  setShowDeleteMessageModal(true);
                }
                setIsEditMode(false);
              }
              // event.key === "Enter" ? sendMessage(event) : null;
            }}
          />
        </div>
      );

    return (
      <div className={`messageBox`}>
        <p
          className={`message-text colorDark ${textOnlyClass} ${sameSenderClass}`}
        >
          {ReactEmoji.emojify(message.text)}
        </p>
      </div>
    );
  };

  const renderMessage = () => {
    //note: should make this be compatible with the database retrieval
    console.log(message.user.image_url);
    console.log(message.image_url);
    let senderText = null;
    let senderImage = null;
    let messageContainerClass = null;
    let isTextOnly = true;

    if (!sameSenderAsPrevMsg) {
      senderImage = (
        <ProfilePicture
          imageSrc={
            // message.image_url ||
            message.user.image_url || ""
          }
          componentClass="message"
        />
      );
      senderText = (
        <>
          <p className={`sender-text `}>
            {isSentByCurrentUser
              ? trimmedName
              : message.user.username || message.user.name}
          </p>
          <span className="message-timestamp beside-sender">
            Today at 6:49 PM
          </span>
        </>
      );
      isTextOnly = false;
    } else {
      messageContainerClass = "text-only";
    }

    return (
      <>
        <div
          className={`messageContainer justifyStart ${messageContainerClass}`}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowContextMenu(true);
            setClientX(e.clientX);
            setClientY(e.clientY);
          }}
        >
          {senderImage}
          <div className={`message-text-container `}>
            {senderText}
            {renderMessageText(isTextOnly)}
          </div>
        </div>
        {renderContextMenu()}
        {renderDeleteMessageModal()}
      </>
    );
  };

  return renderMessage();
};

export default Message;
