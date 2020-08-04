import "../shared.css";

import React, { useState } from "react";

import Chat from "./Chat/Chat";
import Join from "./Join/Join";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { NavContext } from "./AppContext";

const App = () => {
  const [navMenuButtonRef, setNavMenuButtonRef] = useState(null);
  const [navMenuButtonClass, setNavMenuButtonClass] = useState(null);
  const [navMenuButtonTouched, setNavMenuButtonTouched] = useState(null);
  const [onlineUsersButtonRef, setOnlineUsersButtonRef] = useState(null);
  const [onlineUsersButtonClass, setOnlineUsersButtonClass] = useState(null);
  const [onlineUsersButtonTouched, setOnlineUsersButtonTouched] = useState(
    false
  );
  const [roomSideBarShow, setRoomSideBarShow] = useState(
    window.innerWidth >= 1000 ? true : false
  );

  const [onlineUsersShow, setOnlineUsersShow] = useState(
    window.innerWidth >= 650 ? true : false
  );
  const [messagesContainerMoveLeft, setMessagesContainerMoveLeft] = useState(
    onlineUsersShow ? true : false
  );
  const [messagesContainerMoveRight, setMessagesContainerMoveRight] = useState(
    roomSideBarShow ? true : false
  );

  // custom functions for the hooks
  const toggleRoomSideBarShow = () => {
    roomSideBarShow ? setRoomSideBarShow(false) : setRoomSideBarShow(true);
    if (roomSideBarShow) {
      setMessagesContainerMoveRight(true);
    } else {
      setMessagesContainerMoveRight(false);
    }
  };

  const toggleOnlineUsersShow = () => {
    console.log(onlineUsersShow);
    if (onlineUsersShow) {
      console.log(messagesContainerMoveLeft);
      setMessagesContainerMoveLeft(false);
      setOnlineUsersShow(false);
      console.log(messagesContainerMoveLeft);
    } else {
      console.log(messagesContainerMoveLeft);
      setMessagesContainerMoveLeft(true);
      setOnlineUsersShow(true);
      console.log(messagesContainerMoveLeft);
    }
  };

  const getNavContextValue = () => {
    return {
      messagesContainerMoveLeft,
      setMessagesContainerMoveLeft,
      messagesContainerMoveRight,
      setMessagesContainerMoveRight,
      navMenuButtonRef,
      setNavMenuButtonRef,
      navMenuButtonClass,
      setNavMenuButtonClass,
      navMenuButtonTouched,
      setNavMenuButtonTouched,
      roomSideBarShow,
      setRoomSideBarShow,
      toggleRoomSideBarShow,
      onlineUsersButtonRef,
      setOnlineUsersButtonRef,
      onlineUsersButtonClass,
      setOnlineUsersButtonClass,
      onlineUsersButtonTouched,
      setOnlineUsersButtonTouched,
      onlineUsersShow,
      setOnlineUsersShow,
      toggleOnlineUsersShow
    };
  };

  return (
    <Router>
      <Route path="/" exact component={Join} />
      <NavContext.Provider value={getNavContextValue()}>
        <Route path="/chat" component={Chat} />
      </NavContext.Provider>
    </Router>
  );
};

export default App;
