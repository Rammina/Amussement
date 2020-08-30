import React from "react";
import { connect } from "react-redux";

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
        console.log(message.user.name);
        console.log(prevMessageSender);
        let sameSenderAsPrevMsg = false;
        if (prevMessageSender === message.user.name) {
          sameSenderAsPrevMsg = true;
        }
        prevMessageSender = message.user.name;
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error
  // propsInitialized: true
});

export default connect(
  mapStateToProps,
  {}
)(Messages);
