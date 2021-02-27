import DownArrowImg from "../../icons/down-arrow-2.png";

import "./Messages.scss";

import React, { useContext, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import * as Scroll from "react-scroll";
import Message from "./Message/Message";
import { ChatContext } from "../AppContext";
import * as constants from "../../utils/constants.js";
// just remove anything you don't use
let Link = Scroll.Link;
let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;

const Messages = ({ messages, name }) => {
  // const [lastMessagePreviousBatch,setLastMessagePreviousBatch]=useState(null);
  // let firstMessagePreviousBatch = null;
  const messagesContainerRef = useRef(null);
  const {
    loadMoreMessages,
    noMoreMessagesToLoad,
    getMessageRetrievalCount,
  } = useContext(ChatContext);
  let prevMessageSender = null;
  const { MESSAGES_PER_BATCH } = constants;
  // just remove any function that is not used
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const scrollToBottom = function () {
    scroll.scrollToBottom({
      duration: 0,
      containerId: "chat-messages-container",
    });
    console.log("called");
  };
  const scrollTo = () => {
    scroll.scrollTo(100);
  };
  const scrollMore = () => {
    scroll.scrollMore(100);
  };
  const handleSetActive = (to) => {
    console.log(to);
  };

  useEffect(() => {
    // note: figure things out slowly about the library
    Events.scrollEvent.register("begin", function (to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function (to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();
    // note: should only scroll to bottom when the first batch of messages load
    // scrollToBottom();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  // handle loading previous messages upon scrolling to the top
  const handleScroll = () => {
    console.log(messagesContainerRef.current.scrollTop);
    // load more messages after scrolling to the top of the messages container
    // note: it only works once, because of outdated closure
    if (messagesContainerRef.current.scrollTop === 0) {
      loadMoreMessages();
    }
  };
  useEffect(() => {
    if (messagesContainerRef.current !== null) {
      messagesContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      messagesContainerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [messagesContainerRef.current, loadMoreMessages]);

  const renderContainerTop = () => {
    if (noMoreMessagesToLoad) {
      return <div>You have reached the beginning of chat history.</div>;
    }
    // if (showLoader) {
    //   // shows a loader while retrieving messages from the database
    // }
    return null;
  };

  if (!messages || messages.length < 1) return null;
  return (
    <div
      className="messages messages-container"
      id="chat-messages-container"
      ref={messagesContainerRef}
    >
      {renderContainerTop()}
      {messages.map((message, i) => {
        // console.log(message);
        // console.log(prevMessageSender);
        // let containerRef=i===messages.length-29?
        // check retrieval count first

        let sameSenderAsPrevMsg = false;
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
            key={message._id || message.id}
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  error: state.error,
  // propsInitialized: true
});

export default connect(mapStateToProps, {})(Messages);

/* scroll to bottom library stuff
import ScrollToBottom, {
  useAtTop,
  useObserveScrollPosition,
} from "react-scroll-to-bottom";
import { css } from "@emotion/css";

const [atTop] = useAtTop();

const scrollObserver = useCallback(({ scrollTop }) => {
  console.log(scrollTop);
}, []);

useObserveScrollPosition(scrollObserver);

// styling for messages container
.react-scroll-to-bottom--css-kqhhe-1n7m0yu {
    height: 100%;
    overflow-y: auto;
    width: 100%;
}

// styling for scroll to bottom button
const scrollToBottomCss = css({
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
});

<ScrollToBottom
  className="messages messages-container"
  followButtonClassName={scrollToBottomCss}
>
*/

/*
  const renderLoadMoreMessagesButton = () => {
    if (noMoreMessagesToLoad) return <div>all messages have been loaded</div>;

    return (
      <button onClick={loadMoreMessages} id="load-more-messages-button">
        Load More Messages
      </button>
    );
  };
*/
