import "./Chat.scss";

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

const Chat = (props) => {
  const {
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
  const [userRetrievalAttempts, setUserRetrievalAttempts] = useState(0);
  const [messageRetrievalCount, setMessageRetrievalCount] = useState(0);
  // const [messageCount,]=useState();
  const [noMoreMessagesToLoad, setNoMoreMessagesToLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { MESSAGES_PER_BATCH } = constants;
  const chatInputRef = useRef(null);

  const location = useLocation();

  //component variables
  let userJoinCount = 0;
  // let messageRetrievalCount = 0;
  const getMessageRetrievalCount = () => messageRetrievalCount;
  const incrementMessageRetrievalCount = () =>
    setMessageRetrievalCount(
      (messageRetrievalCount) => messageRetrievalCount + 1
    );

  // let noMoreMessagesToLoad = false;
  // const ENDPOINT = "https://chika-chat.herokuapp.com/";
  const ENDPOINT = "localhost:5000";

  const getUserFromProps = () => {
    // setUserRetrievalAttempts(userRetrievalAttempts + 1);
    if (!props.user) {
      // return setTimeout(getUserFromProps, 200);
      return "";
    } else {
      // setName(props.user)
      return props.user.username;
    }
  };

  const handleUserJoin = () => {
    const { guestName, room, userType } = queryString.parse(
      props.location.search
    );
    // handle getting the user differently based on query string (userType)
    // guest/user/admin
    if (userType === "guest") {
      if (userJoinCount > 0) {
        return;
      }
      setName(guestName || "anon");
      setRoom(room);
      const name = guestName || "anon";
      socket.emit("join", { name, room }, (error) => {
        console.log("join attempt");
        if (error) {
          // send a browser alert
          // note:this should be replaced with redux action for error handling
          alert(error);
        }
      });
    } else if (userType === "user") {
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
          } else {
            // scrollToBottom();
          }
        });
      }
    }
    userJoinCount++;
  };

  // should make these more reusable
  const scrollToBottom = function () {
    scroll.scrollToBottom({
      duration: 0,
      containerId: "chat-messages-container",
    });
    console.log("called");
  };

  const scrollTo = function () {
    scroller.scrollTo("firstMessagePreviousBatch", {
      duration: 0,
      containerId: "chat-messages-container",
    });
  };

  useEffect(() => {
    console.log("endpoint and location useEffect");
    const { userType } = queryString.parse(props.location.search);
    socket = io(ENDPOINT);
    // note: this should be changed once database for room messages is used
    /*temporary stopgap measure to clear messages every time the URL changes*/
    // messageRetrievalCount = 0;
    // noMoreMessagesToLoad = false;

    setMessages([]);
    socket.on("load messages", (retrievedMessages) => {
      console.log(retrievedMessages);
      // if the retrieve messages are not divisible by MESSAGES_PER_BATCH, then there are no more messages to load
      // if the message count after retrieval and before retrieval are the same, there are no more messages to load

      setMessages([...retrievedMessages]);
      incrementMessageRetrievalCount();
      scrollToBottom();
    });

    if (userType === "guest") {
      handleUserJoin();
    }

    return () => {
      socket.close();
      // setMessages([]);
    };
  }, [ENDPOINT, location.search]);

  // re-update the user and users list
  useEffect(() => {
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
    socket.on("message", (message) => {
      // non-\ mutational push to the messages array
      console.log(message);
      setMessages((messages) => [...messages, message]);
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
    console.log("attempting to load more messages");
    console.log(room);
    console.log(messageRetrievalCount);
    console.log(getMessageRetrievalCount());
    console.log(noMoreMessagesToLoad);
    if (noMoreMessagesToLoad) return;
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
        scrollTo();
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

  const getChatContextValue = () => ({
    deleteMessage,
    editMessage,
    loadMoreMessages,
    getMessageRetrievalCount,
    // messageRetrievalCount,
    noMoreMessagesToLoad,
    chatInputRef,
  });

  const renderChatContent = () => {
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

  return <div className="outerContainer">{renderChatContent()}</div>;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  error: state.error,
  isLoading: state.auth.isLoading,
  // propsInitialized: true
});

export default connect(mapStateToProps, {})(Chat);

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

// const onLoadPreviousMessages = (retrievedMessages) => {
//   if (
//     !retrievedMessages.length % 30 ||
//     messages.length === retrievedMessages.length
//   ) {
//     setNoMoreMessagesToLoad(true);
//     return;
//   }
//   incrementMessageRetrievalCount();
//   setMessages([...retrievedMessages]);
//   // console.log(`the length of messages is ${messages.length}`);
//   // console.log(`retrieved messages ${messageRetrievalCount} times`);
//   // console.log(messageRetrievalCount);
//   // console.log(getMessageRetrievalCount());
//   // console.log(noMoreMessagesToLoad);
// };
//
// // adding a listener for retrieving more messages
// useEffect(() => {
//   socket.on("load previous messages", (retrievedMessages) => {
//     onLoadPreviousMessages(retrievedMessages);
//   });
//   /*return () => {}*/
// }, [ENDPOINT, location.search /*messageRetrievalCount*/]);
