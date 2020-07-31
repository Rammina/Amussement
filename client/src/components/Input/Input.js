import SendImg from "../../icons/send.png";

import React from "react";

import "./Input.scss";

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="input-chat-form">
    <textarea
      className="input-chat-textfield"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      <img className="send-button-image" src={SendImg} alt="Right Arrow"></img>
    </button>
  </form>
);

export default Input;
