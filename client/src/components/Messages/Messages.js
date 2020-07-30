import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

import "./Messages.css";

const Messages = ({ messages, name }) => {
  let prevMessageSender = null;

  return (
    <ScrollToBottom className="messages messages-container">
      {messages.map((message, i) => {
        console.log(message);
        console.log(message.user);
        let sameSenderAsPrevMsg = false;
        if (prevMessageSender === message.user) {
          sameSenderAsPrevMsg = true;
        }
        prevMessageSender = message.user;
        return (
          <div key={i}>
            <Message
              message={message}
              name={name}
              sameSenderAsPrevMsg={sameSenderAsPrevMsg}
            />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messages;
