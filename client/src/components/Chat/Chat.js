import "./Chat.scss";

import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import OnlineUsersContainer from "../OnlineUsersContainer/OnlineUsersContainer";
import RoomSideBar from "../RoomSideBar/RoomSideBar";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import { NavContext } from "../AppContext";

let socket;

const Chat = ({ location }) => {
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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
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

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // do not forget the cleanup function or else there will be errors/inconsistencies
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();

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

  return (
    <div className="outerContainer">
      <RoomSideBar />
      <div className={`container ${getContainerClass()}`}>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <OnlineUsersContainer users={users} />
    </div>
  );
};

export default Chat;
