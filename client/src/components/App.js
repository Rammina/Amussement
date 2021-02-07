import "../shared.scss";
import "./App.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import history from "../history";

import Chat from "./Chat/Chat";
import Join from "./Join/Join";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Friends from "./Friends/Friends";
import UserSettings from "./UserSettings/UserSettings";
import Footer from "./Footer/Footer";

import { NavContext, FooterContext } from "./AppContext";
import { loadUser } from "../flux/actions/authActions";

let navMenuButtonTouched = false;
let onlineUsersButtonTouched = false;

const App = (props) => {
  useEffect(() => {
    console.log(window.location.href);
    props.loadUser(window.location.href);
  }, []);

  const [navMenuButtonRef, setNavMenuButtonRef] = useState(null);
  const [navMenuButtonClass, setNavMenuButtonClass] = useState(null);
  const [showFooter, setShowFooter] = useState(true);
  const [onlineUsersButtonRef, setOnlineUsersButtonRef] = useState(null);
  const [onlineUsersButtonClass, setOnlineUsersButtonClass] = useState(null);

  const [leftSideBarShow, setLeftSideBarShow] = useState(
    window.innerWidth >= 1200 ? true : false
  );

  const [onlineUsersShow, setOnlineUsersShow] = useState(
    window.innerWidth >= 1000 ? true : false
  );
  const [messagesContainerMoveLeft, setMessagesContainerMoveLeft] = useState(
    onlineUsersShow ? true : false
  );
  const [messagesContainerMoveRight, setMessagesContainerMoveRight] = useState(
    leftSideBarShow ? true : false
  );

  const setNavMenuButtonTouched = (bool) => {
    navMenuButtonTouched = bool;
  };
  const getNavMenuButtonTouched = () => navMenuButtonTouched;

  const setOnlineUsersButtonTouched = (bool) => {
    onlineUsersButtonTouched = bool;
  };
  const getOnlineUsersButtonTouched = () => onlineUsersButtonTouched;

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

  const getFooterContextValue = () => {
    return {
      showFooter,
      setShowFooter,
    };
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
      setNavMenuButtonTouched,
      getNavMenuButtonTouched,
      leftSideBarShow,
      setLeftSideBarShow,
      toggleRoomSideBarShow,
      onlineUsersButtonRef,
      setOnlineUsersButtonRef,
      onlineUsersButtonClass,
      setOnlineUsersButtonClass,
      getOnlineUsersButtonTouched,
      setOnlineUsersButtonTouched,
      onlineUsersShow,
      setOnlineUsersShow,
      toggleOnlineUsersShow,
    };
  };

  //note: add chat for logged in users
  return (
    <Router history={history}>
      <Route path="/" exact component={Join} />
      <Route path="/auth/register" exact component={Register} />
      <Route path="/auth/login" exact component={Login} />

      <Route path="/users/:id/settings" component={UserSettings} />
      {/*note: try to figure out a way to make this one work when selecting/clicking a friend*/}
      <Route path="/users/:id/friends" component={Friends} />
      <FooterContext.Provider value={getFooterContextValue()}>
        <NavContext.Provider value={getNavContextValue()}>
          <Route path="/users/:id/home" exact component={Home} />
          <Route path="/chat" component={Chat} />
        </NavContext.Provider>
        <Footer />
      </FooterContext.Provider>
    </Router>
  );
};

export default connect(null, { loadUser })(App);
