import React from "react";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";

import "./Message.scss";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name, sameSenderAsPrevMsg }) => {
  let isSentByCurrentUser = false;
  // let sameSenderAsPrevMsg = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  const renderMessageText = textOnly => {
    const textOnlyClass = textOnly ? "no-image" : "";

    return (
      <div className={`messageBox`}>
        <p className={`messageText colorDark ${textOnlyClass}`}>
          {ReactEmoji.emojify(text)}
        </p>
      </div>
    );
  };

  const renderMessage = () => {
    let senderText = null;
    let senderImage = null;

    if (isSentByCurrentUser) {
      senderText = <p className="sender-text">{trimmedName}</p>;
    } else {
      senderText = <p className="sender-text">{user}</p>;
    }

    if (!sameSenderAsPrevMsg) {
      senderImage = (
        <ProfilePicture
          imageSrc={null}
          imageAddress={user.profilepicture || null}
        />
      );
    } else {
      return renderMessageText(true);
    }

    return (
      <div className="messageContainer justifyStart">
        {senderImage}
        <div className="message-text-container">
          {senderText}
          {renderMessageText()}
        </div>
      </div>
    );
  };

  return renderMessage();
};

export default Message;
