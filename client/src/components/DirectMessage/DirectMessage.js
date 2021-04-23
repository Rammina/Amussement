import "./DirectMessage.scss";

import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import io from "socket.io-client";
import * as Scroll from "react-scroll";
import * as constants from "../../utils/constants.js";

import OnlineUsersContainer from "../OnlineUsersContainer/OnlineUsersContainer";
import LeftSideBar from "../LeftSideBar/LeftSideBar";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import { NavContext, FooterContext, ChatContext } from "../AppContext";

let socket;

// just remove anything you don't use
let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scroller = Scroll.scroller;
let scrollSpy = Scroll.scrollSpy;

const DirectMessage = (props) => {
  const {
    // check if there are any unnecessary variables/objects
    messagesContainerMoveLeft,
    setMessagesContainerMoveLeft,
    messagesContainerMoveRight,
    setMessagesContainerMoveRight,
    onlineUsersButtonTouched,
    navMenuButtonTouched,
  } = useContext(NavContext);
  const { setShowFooter } = useContext(FooterContext);

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  // not sure what this property is for
  const [userRetrievalAttempts, setUserRetrievalAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userRetrievalAttempts, setUserRetrievalAttempts] = useState(0);
  const [messageRetrievalCount, setMessageRetrievalCount] = useState(0);
  // const [messageCount,]=useState();
  const [noMoreMessagesToLoad, setNoMoreMessagesToLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { MESSAGES_PER_BATCH } = constants;
  const chatInputRef = useRef(null);

  const location = useLocation();

  // let messageRetrievalCount = 0;
  const getMessageRetrievalCount = () => messageRetrievalCount;
  const incrementMessageRetrievalCount = () =>
    setMessageRetrievalCount(
      (messageRetrievalCount) => messageRetrievalCount + 1
    );

  //component variables
  // note: find a different way to implement this (it only shows 2 people so there is no need to count)
  let userJoinCount = 0;
  // const ENDPOINT = "https://chika-chat.herokuapp.com/";
  const ENDPOINT = "localhost:5000";

  const getUserFromProps = () => {
    if (!props.user) return "";
    return props.user.username;
  };

  const handleUserJoin = () => {
    // note: wondering if userType even matters in direct message
    const { room, userType } = queryString.parse(location.search);
    // if (userType === "user") {

    // wait for props to initialize first before joining
    setName(getUserFromProps());
    setRoom(room);
    // if(props.propsInitialized) {
    if (props.user) {
      const name = props.user.username || "anon";
      console.log(name);
      // const id = props.user._id || "";
      const image_url = props.user.image_url || "";
      console.log(image_url);
      socket.emit("join", { name, room, image_url }, (error) => {
        if (error) {
          // send a browser alert
          // note:this should be replaced with redux action for error handling
          alert(error);
        }
      });
    }
  };
  userJoinCount++;

  // should make these more reusable
  const scrollToBottom = function (containerId) {
    scroll.scrollToBottom({
      duration: 0,
      containerId: containerId,
    });
  };

  const scrollTo = function (targetElement, containerId) {
    scroller.scrollTo(targetElement, {
      duration: 0,
      containerId: containerId,
    });
  };

  useEffect(() => {
    console.log("endpoint and location useEffect");
    socket = io(ENDPOINT);
    // note: this should be changed once database for room messages is used
    /*temporary stopgap measure to clear messages every time the URL changes*/

    setMessageRetrievalCount(0);
    setNoMoreMessagesToLoad(false);
    props.actionShowLoader("messagesInitial", true);
    socket.on("load messages", (retrievedMessages) => {
      setMessages([...retrievedMessages]);
      incrementMessageRetrievalCount();
      props.actionShowLoader("messagesInitial", false);
      scrollToBottom("chat-messages-container");
    });

    return () => {
      // setMessageRetrievalCount(0);
      // setNoMoreMessagesToLoad(false);
      console.log("disconnected");

      socket.close();
      // setMessages((messages) => []);
    };
  }, [ENDPOINT, location.search]);
  // re-update the user and users list
  useEffect(() => {
    console.log(location.search);
    console.log(props.user);
    console.log("I happened twice");
    if (!props.isloading && props.user) {
      handleUserJoin();
    }
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [props.user, location.search]);

  // re-update the user
  useEffect(() => {
    setShowFooter(false);
    console.log(props.user);
    console.log("I happened twice");
    if (!props.isloading && props.user) {
      // handleUserJoin();
    }
  }, []);

  // attach another listener every time the address/room changes
  useEffect(() => {
    console.log(location.search);
    socket.on("message", (message) => {
      // non-\ mutational push to the messages array
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });

    socket.on("scrollToBottomAfterSending", () => {
      scrollToBottom("chat-messages-container");
    });

    socket.on("deletedMessage", (id) => {
      setMessages((messages) =>
        messages.filter((message) => message._id !== id)
      );
    });

    socket.on("editedMessage", (id, text) => {
      setMessages((messages) => {
        const foundIndex = messages.findIndex((message) => message._id === id);
        messages[foundIndex].text = text;
        messages[foundIndex].updatedAt = new Date();
        // console.log(new Date());
        // should also update updatedAt property for use in comparisons
        return [...messages];
      });
    });
  }, [location.search]);

  // handles the sending of messages
  const sendMessage = (event) => {
    // prevent page refresh
    event.preventDefault();
    console.log(message);
    // if message exists, send the event
    if (message) {
      socket.emit("sendMessage", { message, user: props.user, room }, () =>
        setMessage("")
      );
    }
  };

  // handles the deletion of messages
  const deleteMessage = (id) => {
    console.log(id);
    // if message exists, send the event
    if (id) {
      socket.emit("deleteMessage", id, room, () => {
        console.log("deleting message");
      });
    }
  };

  const editMessage = (id, text) => {
    console.log(id);
    console.log(text);
    // if message exists, send the event
    if (id && text) {
      socket.emit("editMessage", id, text, room, () => {
        console.log("editing message");
      });
    }
  };

  const loadMoreMessages = () => {
    if (noMoreMessagesToLoad) return;

    props.actionShowLoader("messagesPrevious", true);
    socket.emit(
      "load more messages",
      room,
      getMessageRetrievalCount(),
      (retrievedMessages) => {
        // if (error) console.log(error);
        incrementMessageRetrievalCount();
        // setMessageRetrievalCount(
        //   (messageRetrievalCount) => messageRetrievalCount + 1
        // );
        console.log("message retrieval count is now:");
        console.log(getMessageRetrievalCount());
        console.log(retrievedMessages.length);
        console.log(retrievedMessages.length % MESSAGES_PER_BATCH);
        console.log(messages.length === retrievedMessages.length);
        if (
          !(retrievedMessages.length % MESSAGES_PER_BATCH === 0) ||
          messages.length === retrievedMessages.length
        ) {
          setNoMoreMessagesToLoad(true);
          // return;
        }
        setMessages([...retrievedMessages]);
        scrollTo("firstMessagePreviousBatch", "chat-messages-container");
        props.actionShowLoader("messagesPrevious", false);
      }
    );
  };

  const getContainerClass = () => {
    if (messagesContainerMoveLeft && messagesContainerMoveRight) {
      return "users-shown rooms-shown";
    } else if (messagesContainerMoveLeft) {
      return "users-shown";
    } else if (messagesContainerMoveRight) {
      return "rooms-shown";
    }
    return null;
  };

  const getDirectMessageContextValue = () => ({
    deleteMessage,
    editMessage,
    chatInputRef,
    loadMoreMessages,
    getMessageRetrievalCount,
    // messageRetrievalCount,
    noMoreMessagesToLoad,
  });

  const renderDirectMessageContent = () => {
    // console.log(props.propsInitialized);
    console.log(messages);
    console.log(name);
    // console.log(props.user.username);
    if (name && room) {
      console.log(name);
      console.log(room);
      return (
        <React.Fragment>
          <div className="chat sidebar-outer-container">
            <LeftSideBar heading={room} />
          </div>
          <div className={`chat-area-container ${getContainerClass()}`}>
            <InfoBar room={room} />
            <ChatContext.Provider value={getChatContextValue()}>
              <Messages messages={messages} name={name} />
              <Input
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
              />
            </ChatContext.Provider>
          </div>
          <OnlineUsersContainer users={users} />
        </React.Fragment>
      );
    }
    return null;
  };

  return <div className="outerContainer">{renderDirectMessageContent()}</div>;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  error: state.error,
  isLoading: state.auth.isLoading,
  // propsInitialized: true
});

export default connect(mapStateToProps, {})(DirectMessage);

// const handleResize = () => {
//   if (!onlineUsersButtonTouched) {
//     if (window.innerWidth >= 1200) {
//       // setOnlineUsersShow(true);
//       setMessagesContainerMoveLeft(true);
//     } else {
//       // setOnlineUsersShow(false);
//       setMessagesContainerMoveLeft(false);
//     }
//   }
//   if (!navMenuButtonTouched) {
//     if (window.innerWidth >= 1000) {
//       // setMessagesContainerMoveLeft(true);
//     } else {
//       // setMessagesContainerMoveLeft(false);
//     }
//   }
// };
