import React, { useState } from "react";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import ContextMenu from "../../UIComponents/ContextMenu/ContextMenu";

import "./Message.scss";

import ReactEmoji from "react-emoji";

const Message = ({ message, name, sameSenderAsPrevMsg }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);

  const onCloseContextMenuHandler = () => {
    setShowContextMenu(false);
  };

  const deleteMessageHandler = () => {
    console.log("Deleting " + message._id);
  };

  const trimmedName = name.trim();
  let isSentByCurrentUser = false;
  if (message.user.username === name || message.user.name === name) {
    isSentByCurrentUser = true;
  }

  const renderContextMenu = () => {
    console.log(isSentByCurrentUser);
    if (!showContextMenu) return null;
    let contextMenuContent = null;

    if (isSentByCurrentUser) {
      contextMenuContent = (
        <div>
          <button>edit message</button>
          <button onClick={deleteMessageHandler}>delete message</button>
        </div>
      );
    }
    return (
      <ContextMenu
        clientX={clientX}
        clientY={clientY}
        onClose={onCloseContextMenuHandler}
      >
        {contextMenuContent}
      </ContextMenu>
    );
  };

  const renderMessageText = (textOnly) => {
    const textOnlyClass = textOnly ? "no-image" : "";
    let sameSenderClass = sameSenderAsPrevMsg ? "same-sender" : "";

    return (
      <div className={`messageBox`}>
        <p
          className={`messageText colorDark ${textOnlyClass} ${sameSenderClass}`}
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
      </>
    );
  };

  return renderMessage();
};

export default Message;
