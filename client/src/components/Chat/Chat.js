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
import DmRoomList from "../DmRoomList/DmRoomList";

import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import {
  addActiveDmRoom,
  moveDmRoomToFront,
} from "../../flux/actions/dmRoomsActions";
import { actionShowLoader } from "../../flux/actions/loaderActions";
import {
  NavContext,
  FooterContext,
  ChatContext,
  WindowContext,
} from "../AppContext";

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
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);

  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("public");
  const [roomNameforDB, setRoomNameforDB] = useState("");
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
    if (!props.user) return "";
    return props.user.username;
  };

  const handleUserJoin = () => {
    const { receiver } = queryString.parse(props.location.search);
    const currentRoom = props.currentRoom;
    const { type, name } = currentRoom;
    // note: Replace all the URL based information with redux store information (props.currentRoom)
    if (Object.keys(currentRoom).length === 0) return null;

    let roomNameforDB = null;
    // wait for props to initialize first before joining
    setName(getUserFromProps());
    if (type === "DM") {
      setRoomType("DM");

      let roomName = name;
      setRoomName(`@${receiver}`);
      roomNameforDB = roomName;
      setRoomNameforDB(roomName);

      let alreadyAddedToActive = false;
    } else {
      setRoomName(name);
      roomNameforDB = name;
      setRoomNameforDB(name);
      setRoomType("public");
    }

    if (props.user) {
      socket.emit(
        "join",
        { user: props.user, room: roomNameforDB || name },
        (error) => {
          if (error) {
            // send a browser alert
            // note:this should be replaced with redux action for error handling
            alert(error);
          } else {
          }
        }
      );
    }

    userJoinCount++;
  };

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

  const handleResize = () => {
    if (isDesktopWidth || isDesktopHeight) setShowFooter(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    // cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("endpoint and location useEffect");
    // const { userType } = queryString.parse(props.location.search);
    // console.log(props.location.search);
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
      console.log("disconnected");

      socket.close();
    };
  }, [ENDPOINT, location.search]);

  // re-update the user and users list
  useEffect(() => {
    if (!props.isLoading && props.user) {
      handleUserJoin();
    }
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [props.isLoading, location.search]);

  // remove footer when its desktop mode
  const handleFooterOnResize = () => {
    if (isDesktopWidth && isDesktopHeight) {
      setShowFooter(false);
    }
  };
  useEffect(() => {
    setShowFooter(false);

    window.addEventListener("resize", handleFooterOnResize);
    return () => {
      window.removeEventListener("resize", handleFooterOnResize);
    };
  }, []);

  // attach another listener every time the address/room changes
  useEffect(() => {
    console.log(props.location.search);
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
    // use the name for the database if it exists (needed for DM rooms)
    let targetRoom = roomNameforDB || roomName;
    let roomId = props.currentRoom._id;
    // prevent page refresh
    event.preventDefault();
    console.log(message);
    console.log(targetRoom);
    // if message exists, send the event
    if (message) {
      socket.emit(
        "sendMessage",
        { message, user: props.user, room: { name: targetRoom, _id: roomId } },
        () => {
          if (roomType === "DM") props.moveDmRoomToFront(targetRoom);
          setMessage("");
        }
      );
    }
  };

  // handles the deletion of messages
  const deleteMessage = (id) => {
    let room = roomNameforDB || roomName;
    console.log(id);
    // if message exists, send the event
    if (id) {
      socket.emit("deleteMessage", id, room, () => {
        console.log("deleting message");
      });
    }
  };

  const editMessage = (id, text) => {
    let room = roomNameforDB || room;
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

  const getChatContextValue = () => ({
    deleteMessage,
    editMessage,
    loadMoreMessages,
    getMessageRetrievalCount,
    roomType,
    // messageRetrievalCount,
    noMoreMessagesToLoad,
    chatInputRef,
  });

  const renderLeftSidebarContent = () => {
    if (roomType === "DM") {
      return (
        <LeftSideBar heading="Direct Messages">
          <DmRoomList />
        </LeftSideBar>
      );
    } else {
      return <LeftSideBar heading={room}></LeftSideBar>;
    }
  };

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
            {/*{renderLeftSidebarContent()}*/}
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

  return renderChatContent();
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  currentRoom: state.currentRoom,
  dmRooms: state.dmRooms,
  error: state.error,
  isLoading: state.auth.isLoading,
  showMessagesInitialLoader: state.loader.showMessagesInitialLoader,
});

export default connect(mapStateToProps, {
  actionShowLoader,
  addActiveDmRoom,
  moveDmRoomToFront,
})(Chat);
