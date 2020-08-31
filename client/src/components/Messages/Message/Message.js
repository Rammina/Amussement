import React from "react";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";

import "./Message.scss";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name, sameSenderAsPrevMsg }) => {
  // console.log(message);
  console.log(user);
  let isSentByCurrentUser = false;
  // let sameSenderAsPrevMsg = false;

  const trimmedName = name.trim();

  if (user.name === name) {
    isSentByCurrentUser = true;
  }

  const renderMessageText = textOnly => {
    const textOnlyClass = textOnly ? "no-image" : "";
    let sameSenderClass = sameSenderAsPrevMsg ? "same-sender" : "";

    return (
      <div className={`messageBox`}>
        <p
          className={`messageText colorDark ${textOnlyClass} ${sameSenderClass}`}
        >
          {ReactEmoji.emojify(text)}
        </p>
      </div>
    );
  };

  const renderMessage = () => {
    console.log(user.image_url);
    let senderText = null;
    let senderImage = null;

    if (isSentByCurrentUser) {
      senderText = <p className={`sender-text`}>{trimmedName}</p>;
    } else {
      senderText = <p className={`sender-text `}>{user.name}</p>;
    }

    if (!sameSenderAsPrevMsg) {
      senderImage = (
        <ProfilePicture
          imageSrc={user.image_url || ""}
          componentClass="message"
        />
      );
    } else {
      return renderMessageText(true);
    }

    return (
      <div className="messageContainer justifyStart">
        {senderImage}
        <div className={`message-text-container `}>
          {senderText}
          {renderMessageText()}
        </div>
      </div>
    );
  };

  return renderMessage();
};

export default Message;
