import DownArrowImg from "../../icons/down-arrow-2.png";

import "./Messages.scss";

import React, { useContext } from "react";
import { connect } from "react-redux";

import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "@emotion/css";

import Message from "./Message/Message";

import { ChatContext } from "../AppContext";

// const scrollToBottomCss = css({
//   backgroundColor: #07050f,
//   width: 2.25rem,
//   height: 2.25rem,
//   bottom: 1rem,
//   border-radius: 50%
// });

const Messages = ({ messages, name }) => {
  const { loadMoreMessages, noMoreMessagesToLoad } = useContext(ChatContext);
  let prevMessageSender = null;
  console.log("the name is " + name);
  // guards against empty messages array
  console.log(messages);

  const renderLoadMoreMessagesButton = () => {
    if (noMoreMessagesToLoad) return <div>all messages have been loaded</div>;

    return (
      <button onClick={loadMoreMessages} id="load-more-messages-button">
        Load More Messages
      </button>
    );
  };

  if (!messages || messages.length < 1) return null;
  return (
    <ScrollToBottom
      className="messages messages-container"
      followButtonClassName={css({
        backgroundColor: "#07050f",
        width: "2.25rem",
        height: "2.25rem",
        bottom: "1rem",
        right: "2rem",
        borderRadius: "50%",
        backgroundImage: `url(${DownArrowImg})`,
        backgroundSize: "1.5rem",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        "&:hover": {
          backgroundColor: "#14121c",
        },
      })}
    >
      {renderLoadMoreMessagesButton()}
      {messages.map((message, i) => {
        console.log(message);
        console.log(prevMessageSender);
        let sameSenderAsPrevMsg = false;
        if (
          // prevMessageSender === message.username ||
          prevMessageSender === message.user.username ||
          prevMessageSender === message.user.name
        ) {
          sameSenderAsPrevMsg = true;
        }
        prevMessageSender =
          // message.username ||
          message.user.username || message.user.name;
        return (
          <div key={i} className="messages messages-inner-container">
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  error: state.error,
  // propsInitialized: true
});

export default connect(mapStateToProps, {})(Messages);

/* For implimenting listening to scroll at the top of a page
https://codepen.io/teimurjan/pen/NzMgKz?#

class App extends React.Component {
  componentDidMount() {
    window.onscroll = function() {
      if(window.pageYOffset === 0) {
        alert('I AM AT THE TOP');
      }
    };
  }
  
  componentWillUnmount() {
    window.onscroll = null;
  }

  render() {
    return (
      <div className="container">
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
        <div className="item" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
*/
