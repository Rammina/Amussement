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
import { getRoom, getDmRoom } from "../../flux/actions/currentRoomActions";
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
    leftSideBarShow,
  } = useContext(NavContext);
  const { setShowFooter } = useContext(FooterContext);
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);

  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("public");
  const [roomNameforDB, setRoomNameforDB] = useState("");
  const [roomId, setRoomId] = useState("");
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

  // helper/utility functions
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
    const { receiver } = queryString.parse(location.search);
    const currentRoom = props.currentRoom;
    const { type, name, _id } = currentRoom;
    // note: Replace all the URL based information with redux store information (props.currentRoom)
    if (Object.keys(currentRoom).length === 0) return null;

    let roomNameforDB = null;
    // wait for props to initialize first before joining
    setName(getUserFromProps());
    setRoomId(_id);
    if (type === "DM") {
      setRoomType("DM");
      // customizing DM room name
      let roomName = name;
      setRoomName(`@${receiver}`);
      roomNameforDB = roomName;
      setRoomNameforDB(roomName);

      let alreadyAddedToActive = false;
    } else {
      setRoomType("public");
      // for public chat, the names should be the same
      setRoomName(name);
      setRoomNameforDB(name);
    }

    // only use room name if it's DM because it has 2 different ids and that can get confusing
    let chatId = type === "DM" ? name : _id;

    if (props.user) {
      socket.emit(
        "join",
        { user: props.user, roomId: chatId, roomType: type },
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

  useEffect(() => {
    // retrieve room information using the room ID on the URL
    const { room, roomType } = queryString.parse(location.search);
    console.log("Connecting socket");
    // only get the room details if there is no room yet on the redux store, and if it's a different room  (after swapping)
    if (!props.user) return;
    if (
      !props.currentRoom ||
      (props.currentRoom && room != props.currentRoom._id)
    ) {
      // note: change retreival behaivor depending on room type
      console.log("Retreiving room info");
      console.log(props.user);
      if (roomType === "DM") {
        // compare the names because DM rooms use names (for now)
        if (
          !props.currentRoom ||
          (props.currentRoom && room !== props.currentRoom.name)
        )
          props.getDmRoom(room);
      } else {
        props.getRoom(room);
      }
    }
    // do not connect socket until the room information is retrieved
    // note:this may not even be necessary because only ID is used by the server side anyway
    if (!props.currentRoom) return;
    console.log("endpoint and location useEffect");
    // const { userType } = queryString.parse(location.search);
    // console.log(location.search);
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

    console.log(location.search);
    console.log("am I attaching a message listener twice?");
    socket.on("message", (message) => {
      // non-\ mutational push to the messages array
      console.log(message);
      console.log("is this happening twice?");
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

    return () => {
      console.log("disconnected");

      socket.close();
    };
  }, [ENDPOINT, location.search, props.currentRoom, props.user]);

  // re-update the user and users list
  useEffect(() => {
    if (!props.currentRoom) return;
    if (!props.isLoading && props.user) {
      handleUserJoin();
    }
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [props.isLoading, location.search, props.currentRoom]);

  useEffect(() => {
    // footer related stuff
    if (isDesktopWidth && isDesktopHeight) {
      setShowFooter(false);
    } else {
      // still hide the footer if left sidebar isn't shown
      if (!leftSideBarShow) setShowFooter(false);
    }
  }, [isDesktopWidth, isDesktopHeight, leftSideBarShow]);

  // handles the sending of messages
  const sendMessage = (event) => {
    const { room, roomType } = queryString.parse(location.search);

    // prevent page refresh
    event.preventDefault();
    // if message exists, send the event
    if (message) {
      console.log("is this also happening twice?");
      socket.emit(
        "sendMessage",
        {
          message,
          user: props.user,
          roomId: room,
          roomType,
        },
        () => {
          // this actually uses room name for DM
          if (roomType === "DM") props.moveDmRoomToFront(room);
          setMessage("");
        }
      );
    }
  };

  // handles the deletion of messages
  const deleteMessage = (id) => {
    // if message exists, send the event
    if (id) {
      let cb = () => {
        console.log("deleting message");
      };
      socket.emit("deleteMessage", { id, roomId, cb });
    }
  };

  const editMessage = (id, text) => {
    // if message exists, send the event
    if (id && text) {
      let cb = () => {
        console.log("editing message");
      };
      socket.emit("editMessage", { id, text, roomId, cb });
    }
  };

  const loadMoreMessages = () => {
    if (noMoreMessagesToLoad) return;

    props.actionShowLoader("messagesPrevious", true);

    const loadMoreMessagesCb = (retrievedMessages) => {
      // increase the number of messages to be retrieved next retrieval
      incrementMessageRetrievalCount();
      // check if there are no more messages to load (all the messages in a room already retrieved)
      if (
        !(retrievedMessages.length % MESSAGES_PER_BATCH === 0) ||
        messages.length === retrievedMessages.length
      ) {
        setNoMoreMessagesToLoad(true);
      }
      // add the messages to be rendered on the frontend
      setMessages([...retrievedMessages]);
      // scroll down to the last message the user was able to view before retrieval
      scrollTo("firstMessagePreviousBatch", "chat-messages-container");
      props.actionShowLoader("messagesPrevious", false);
    };

    socket.emit("load more messages", {
      roomId,
      messageRetrievalCount: getMessageRetrievalCount(),
      cb: loadMoreMessagesCb,
    });
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
      return <LeftSideBar heading={roomName}></LeftSideBar>;
    }
  };

  const renderChatContent = () => {
    // console.log(props.propsInitialized);
    console.log(messages);
    console.log(name);
    // console.log(props.user.username);
    if (name && roomName) {
      return (
        <React.Fragment>
          <div className="chat sidebar-outer-container">
            {/*{renderLeftSidebarContent()}*/}
          </div>
          <div className={`chat-area-container ${getContainerClass()}`}>
            <InfoBar roomName={roomName} />
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
  getRoom,
  getDmRoom,
})(Chat);

/*
const handleResize = () => {
  if (isDesktopWidth && isDesktopHeight) setShowFooter(false);
};

useEffect(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
  // cleanup function
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
*/

/*
// attach another listener every time the address/room changes
useEffect(() => {
  console.log(location.search);
console.log("am I attaching a message listener twice?");
socket.on("message", (message) => {
  // non-\ mutational push to the messages array
  console.log(message);
  console.log("is this happening twice?");
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
*/
