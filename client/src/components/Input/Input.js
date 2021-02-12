import SendImg from "../../icons/send.png";

import React, { useState } from "react";

import "./Input.scss";

const Input = ({ setMessage, sendMessage, message }) => {
  const [sendButtonClass, setSendButtonClass] = useState("hide");
  const [sendButtonDisabled, setSendButtonDisabled] = useState(true);

  const renderSendButton = () => {
    return (
      <button
        className={`sendButton ${sendButtonClass}`}
        onClick={(e) => {
          sendMessage(e);
          setSendButtonClass("hide");
        }}
        disabled={sendButtonDisabled}
      >
        <img
          className={`send-button-image ${sendButtonClass} `}
          src={SendImg}
          alt="Right Arrow"
        ></img>
      </button>
    );
  };
  return (
    <form className="input-chat-form">
      <textarea
        className="input-chat-textfield"
        type="text"
        maxLength="2000"
        placeholder="Type a message..."
        autoFocus={true}
        value={message}
        onChange={({ target: { value } }) => {
          console.log(value);
          setMessage(value);
          setSendButtonClass(value === "" ? "hide" : "show");
          setSendButtonDisabled(value === "" ? true : false);
        }}
        onKeyPress={(event) => {
          // console.log("keypressed on the input field");
          if (event.key === "Enter") {
            console.log("pressed enter on the input field");
            sendMessage(event);
            setSendButtonClass("hide");
          }
          // event.key === "Enter" ? sendMessage(event) : null;
        }}
      />
      {renderSendButton()}
    </form>
  );
};

export default Input;
