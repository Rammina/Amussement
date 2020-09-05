import "./Chat.scss";

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import io from "socket.io-client";

import OnlineUsersContainer from "../OnlineUsersContainer/OnlineUsersContainer";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RoomSideBar from "../RoomSideBar/RoomSideBar";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import { NavContext } from "../AppContext";

let socket;

const Chat = props => {
  const {
    messagesContainerMoveLeft,
    setMessagesContainerMoveLeft,
    messagesContainerMoveRight,
    setMessagesContainerMoveRight,
    onlineUsersButtonTouched,
    navMenuButtonTouched
  } = useContext(NavContext);

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  // const [userJoinCount, setUserJoinCount] = useState(0);
  const [userRetrievalAttempts, setUserRetrievalAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();

  //component variables
  let userJoinCount = 0;
  // const ENDPOINT = "https://chika-chat.herokuapp.com/";
  const ENDPOINT = "localhost:5000";

  const handleResize = () => {
    if (!onlineUsersButtonTouched) {
      if (window.innerWidth >= 650) {
        setMessagesContainerMoveLeft(true);
      } else {
        setMessagesContainerMoveLeft(false);
      }
    }
    if (!navMenuButtonTouched) {
      if (window.innerWidth >= 1000) {
        // setMessagesContainerMoveLeft(true);
      } else {
        // setMessagesContainerMoveLeft(false);
      }
    }
  };

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
      socket.emit("join", { name, room }, error => {
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
        const image_url = props.user.image_url || "";
        console.log(image_url);
        socket.emit("join", { name, room, image_url }, error => {
          if (error) {
            // send a browser alert
            // note:this should be replaced with redux action for error handling
            alert(error);
          }
        });
      }
    }
    userJoinCount++;
  };

  useEffect(() => {
    const { userType } = queryString.parse(props.location.search);
    socket = io(ENDPOINT);
    /*temporary stopgap measure to clear messages every time the URL changes*/
    setMessages([]);

    if (userType === "guest") {
      handleUserJoin();
    }
    // send join to the server
    return () => {
      socket.close();
    };
  }, [ENDPOINT, location.search]);

  // re-update the user
  useEffect(() => {
    console.log(props.user);
    console.log("I happened twice");
    if (!props.isloading && props.user) {
      handleUserJoin();
    }
  }, [props.user, location.search]);

  // re-update the user
  useEffect(() => {
    console.log(props.user);
    console.log("I happened twice");
    if (!props.isloading && props.user) {
      // handleUserJoin();
    }
  }, []);

  // useEffect(() => {}, [name, room]);

  useEffect(() => {
    socket.on("message", message => {
      // non-\ mutational push to the messages array
      console.log(message);
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [props.user, location.search]);

  // handles the sending of messages
  const sendMessage = event => {
    // prevent page refresh
    event.preventDefault();
    console.log(message);
    // if message exists, send the event
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
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

  const renderChatContent = () => {
    // console.log(props.propsInitialized);
    console.log(messages);
    if (name && room) {
      console.log(name);
      console.log(room);
      return (
        <React.Fragment>
          <div className="chat sidebar-outer-container">
            <RoomSideBar />
            <LeftSideBar heading={room} />
          </div>
          <div className={`chat-area-container ${getContainerClass()}`}>
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
          <OnlineUsersContainer users={users} />
        </React.Fragment>
      );
    }
    return null;
  };

  return <div className="outerContainer">{renderChatContent()}</div>;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  error: state.error,
  isLoading: state.auth.isLoading
  // propsInitialized: true
});

export default connect(
  mapStateToProps,
  {}
)(Chat);
