import React from "react";

import "./Message.scss";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyStart">
      <p className="sender-text">{trimmedName}</p>
      <div className="messageBox">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <p className="sender-text">{user}</p>
      <div className="messageBox">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  );
};

export default Message;
