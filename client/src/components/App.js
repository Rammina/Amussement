import "../shared.scss";
import "./App.scss";

import React, { useState, useEffect } from "react";

import Chat from "./Chat/Chat";
import Join from "./Join/Join";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Friends from "./Friends/Friends";
import UserSettings from "./UserSettings/UserSettings";

import { connect } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import history from "../history";

import { NavContext } from "./AppContext";
import { loadUser } from "../flux/actions/authActions";

const App = props => {
  useEffect(() => {
    console.log(window.location.href);
    props.loadUser(window.location.href);
  }, []);

  const [navMenuButtonRef, setNavMenuButtonRef] = useState(null);
  const [navMenuButtonClass, setNavMenuButtonClass] = useState(null);
  const [navMenuButtonTouched, setNavMenuButtonTouched] = useState(null);
  const [onlineUsersButtonRef, setOnlineUsersButtonRef] = useState(null);
  const [onlineUsersButtonClass, setOnlineUsersButtonClass] = useState(null);
  const [onlineUsersButtonTouched, setOnlineUsersButtonTouched] = useState(
    false
  );
  const [leftSideBarShow, setLeftSideBarShow] = useState(
    window.innerWidth >= 1000 ? true : false
  );

  const [onlineUsersShow, setOnlineUsersShow] = useState(
    window.innerWidth >= 650 ? true : false
  );
  const [messagesContainerMoveLeft, setMessagesContainerMoveLeft] = useState(
    onlineUsersShow ? true : false
  );
  const [messagesContainerMoveRight, setMessagesContainerMoveRight] = useState(
    leftSideBarShow ? true : false
  );

  // custom functions for the hooks
  const toggleRoomSideBarShow = () => {
    if (!leftSideBarShow) {
      setMessagesContainerMoveRight(true);
      setLeftSideBarShow(true);
    } else {
      setMessagesContainerMoveRight(false);
      setLeftSideBarShow(false);
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
      leftSideBarShow,
      setLeftSideBarShow,
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

  //note: add chat for logged in users
  return (
    <Router history={history}>
      <Route path="/" exact component={Join} />
      <Route path="/auth/register" exact component={Register} />
      <Route path="/auth/login" exact component={Login} />

      <Route path="/users/:id/settings" exact component={UserSettings} />
      {/*note: try to figure out a way to make this one work when selecting/clicking a friend*/}
      <Route path="/users/:id/friends" component={Friends} />
      <NavContext.Provider value={getNavContextValue()}>
        <Route path="/users/:id/home" exact component={Home} />
        <Route path="/chat" component={Chat} />
      </NavContext.Provider>
    </Router>
  );
};

export default connect(
  null,
  { loadUser }
)(App);
