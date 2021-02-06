import React from "react";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";

import "./Message.scss";

import ReactEmoji from "react-emoji";

const Message = ({ message, name, sameSenderAsPrevMsg }) => {
  const onContextMenuHandler = () => {
    // render as a right-click menu it should have edit and delete message functions/buttons
  };

  let isSentByCurrentUser = false;
  const trimmedName = name.trim();
  if (
    // message.username === name ||
    message.user.name === name
  ) {
    isSentByCurrentUser = true;
  }

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
      if (isSentByCurrentUser) {
        senderText = <p className={`sender-text`}>{trimmedName}</p>;
      } else {
        senderText = (
          <p className={`sender-text `}>
            {
              // message.username ||
              message.user.username || message.user.name
            }
          </p>
        );
      }
      isTextOnly = false;
    } else {
      messageContainerClass = "text-only";
    }

    return (
      <div
        className={`messageContainer justifyStart ${messageContainerClass}`}
        onContextMenu={(e) => {
          // e.preventDefault();
        }}
      >
        {senderImage}
        <div className={`message-text-container `}>
          {senderText}
          {renderMessageText(isTextOnly)}
        </div>
      </div>
    );
  };

  return renderMessage();
};

export default Message;
