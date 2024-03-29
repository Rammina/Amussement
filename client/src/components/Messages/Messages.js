import DownArrowImg from "../../icons/down-arrow-2.png";

import "./Messages.scss";

import React, { useState, useContext, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as Scroll from "react-scroll";

import Message from "./Message/Message";
import LoadingSpinner from "../loaders/LoadingSpinner";

import { ChatContext } from "../AppContext";
import * as constants from "../../utils/constants.js";
import { actionShowLoader } from "../../flux/actions/loaderActions";

// just remove anything you don't use
let Link = Scroll.Link;
let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;

const Messages = (props) => {
  const { messages, name } = props;
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesContainerRef = useRef(null);
  const { loadMoreMessages, noMoreMessagesToLoad } = useContext(ChatContext);
  let prevMessageSender = null;
  const { MESSAGES_PER_BATCH } = constants;

  useEffect(() => {
    // note: figure things out slowly about the library
    Events.scrollEvent.register("begin", function (to, element) {});

    Events.scrollEvent.register("end", function (to, element) {});

    scrollSpy.update();
    // note: should only scroll to bottom when the first batch of messages load

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  // handle loading previous messages upon scrolling to the top
  const handleScroll = () => {
    // load more messages after scrolling to the top of the messages container
    // note: it only works once, because of outdated closure
    if (messagesContainerRef.current.scrollTop === 0) {
      loadMoreMessages();
    }
    // check if it is scrolled down to the bottom
    if (
      messagesContainerRef.current.scrollHeight -
        messagesContainerRef.current.scrollTop -
        messagesContainerRef.current.clientHeight <
      1
    ) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current !== null) {
      messagesContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (messagesContainerRef.current)
        messagesContainerRef.current.removeEventListener(
          "scroll",
          handleScroll
        );
    };
  }, [messagesContainerRef.current, loadMoreMessages]);

  const scrollDownButtonClickHandler = () => {
    scroll.scrollToBottom({
      duration: 500,
      smooth: "easeOutQuint",
      containerId: "chat-messages-container",
    });
  };

  // render functions
  const renderPreviousLoader = () => {
    return <LoadingSpinner showLoader={props.showPreviousLoader} />;
  };

  const renderContainerTop = () => {
    let content = null;

    if (props.showPreviousLoader)
      content = <>{renderPreviousLoader()} Loading previous messages...</>;
    if (messages.length < MESSAGES_PER_BATCH || noMoreMessagesToLoad)
      content = <>You have reached the beginning of chat history.</>;

    return <div id="messages-container-top-notification">{content}</div>;
  };

  const renderInitialLoader = () => {
    return (
      <div id="messages-container-loader">
        <span>
          <LoadingSpinner
            className="messages"
            showLoader={props.showInitialLoader}
          />
          Loading Messages...
        </span>
      </div>
    );
  };

  const renderScrollDownButton = () => {
    // do not render if still loading
    if (props.showInitialLoader) return null;

    return (
      <button
        className={isAtBottom ? "hide" : ""}
        id="messages-container-scroll-down-button"
        onClick={scrollDownButtonClickHandler}
      >
        <img
          id="messages-container-scroll-down-img"
          src={DownArrowImg}
          alt="down arrow button icon"
        />
      </button>
    );
  };

  const renderMessages = () => {
    let noMessagesNotification = null;

    return (
      <div
        className="messages messages-container"
        id="chat-messages-container"
        ref={messagesContainerRef}
      >
        {props.showInitialLoader ? renderInitialLoader() : null}
        {renderContainerTop()}
        {renderScrollDownButton()}
        {props.showInitialLoader
          ? null
          : noMessagesNotification ||
            messages.map((message, i) => {
              let sameSenderAsPrevMsg = false;
              // guard against deleted references (deleted user)
              if (!message.user) {
                message.user = {
                  username: "Deleted User",
                  image_url: "",
                  deleted: true,
                };
              }
              // check if the same sender
              if (
                prevMessageSender === message.user.username ||
                prevMessageSender === message.user.name
              ) {
                sameSenderAsPrevMsg = true;
              }
              prevMessageSender =
                // message.username ||
                message.user.username || message.user.name;

              let content = (
                <div
                  key={message._id || message.id || i}
                  className="messages messages-inner-container"
                >
                  <Message
                    message={message}
                    name={name}
                    sameSenderAsPrevMsg={sameSenderAsPrevMsg}
                  />
                </div>
              );

              if (messages.length > MESSAGES_PER_BATCH) {
                // if it's divisible by thirty, the thirty first element was the first one of the previous batch
                if (messages.length % MESSAGES_PER_BATCH === 0) {
                  if (i === MESSAGES_PER_BATCH)
                    return (
                      <Element
                        name="firstMessagePreviousBatch"
                        key={message._id || message.id}
                      >
                        {content}
                      </Element>
                    );
                  // if it's not divisible by MESSAGES_PER_BATCH (there is no more to load)
                } else {
                  if (i === messages.length % MESSAGES_PER_BATCH)
                    return (
                      <Element
                        name="firstMessagePreviousBatch"
                        key={message._id || message.id}
                      >
                        {content}
                      </Element>
                    );
                }
              }
              // just render normally without a wrapper
              return content;
            })}
      </div>
    );
  };

  return renderMessages();
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  error: state.error,
  showInitialLoader: state.loader.showMessagesInitialLoader,
  showPreviousLoader: state.loader.showMessagesPreviousLoader,
});

export default connect(mapStateToProps, { actionShowLoader })(Messages);
