import "../shared.scss";
import "./App.scss";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Router, Route, Redirect } from "react-router-dom";
import history from "../history";

import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AuthLoader from "./AuthLoader/AuthLoader";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import Chat from "./Chat/Chat";

import Register from "./Register/Register";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Friends from "./Friends/Friends";
import UserSettings from "./UserSettings/UserSettings";

import Footer from "./Footer/Footer";

import {
  NavContext,
  FooterContext,
  WindowContext,
  UserSettingsContext,
} from "./AppContext";
import { loadUser } from "../flux/actions/authActions";
import * as constants from "../utils/constants.js";

export const App = (props) => {
  const { DESKTOP_WIDTH, DESKTOP_HEIGHT } = constants;
  const [isDesktopWidth, setIsDesktopWidth] = useState(
    window.innerWidth >= DESKTOP_WIDTH
  );
  const [isDesktopHeight, setIsDesktopHeight] = useState(
    window.innerHeight >= DESKTOP_HEIGHT
  );

  const [navMenuButtonRef, setNavMenuButtonRef] = useState(null);
  const [navMenuButtonClass, setNavMenuButtonClass] = useState(null);
  const [showFooter, setShowFooter] = useState(true);
  const [showUserSettings, setShowUserSettings] = useState(false);
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

  const handleResize = () => {
    if (window.innerWidth >= DESKTOP_WIDTH) {
      setIsDesktopWidth(true);
    } else {
      setIsDesktopWidth(false);
    }
    if (window.innerHeight >= DESKTOP_HEIGHT) {
      setIsDesktopHeight(true);
    } else {
      setIsDesktopHeight(false);
    }
  };

  useEffect(() => {
    props.loadUser();
    window.addEventListener("resize", handleResize);
    handleResize();
    // cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let navMenuButtonTouched = false;
  const setNavMenuButtonTouched = (bool) => {
    navMenuButtonTouched = bool;
  };
  const getNavMenuButtonTouched = () => navMenuButtonTouched;

  let onlineUsersButtonTouched = false;
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
    if (onlineUsersShow) {
      setMessagesContainerMoveLeft(false);
      setOnlineUsersShow(false);
    } else {
      setMessagesContainerMoveLeft(true);
      setOnlineUsersShow(true);
    }
  };

  const getWindowContextValue = () => {
    return { isDesktopWidth, isDesktopHeight };
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

  const settingsOnOpenHandler = () => {
    setLeftSideBarShow(false);
    setShowUserSettings(true);
  };

  const settingsOnCloseHandler = () => {
    setShowUserSettings(false);
  };

  const getUserSettingsContextValue = () => ({
    showUserSettings,
    settingsOnOpenHandler,
    settingsOnCloseHandler,
  });

  const renderAuthLoader = () => {
    return <AuthLoader isLoadingUser={props.isLoadingUser} />;
  };

  const renderLeftSidebar = () => {
    if (!props.isAuthenticated) return null;
    return (
      <Route path={["/users/:id/home", "/chat"]}>
        <LeftSideBar heading="Direct Messages"></LeftSideBar>
      </Route>
    );
  };

  const renderUserSettings = () => {
    // on mobile view
    if (!isDesktopWidth || !isDesktopHeight) {
      return (
        <AuthenticatedRoute path="/users/:id/settings">
          <UserSettings />
        </AuthenticatedRoute>
      );
    }
    // on desktop view, it is a modal whose rendering is controlled by showUserSettings
    if (!showUserSettings) {
      // redirect from /settings and open on the home page only if authenticated
      if (
        props.isAuthenticated &&
        window.location.pathname.includes("/settings") &&
        !window.location.pathname.includes("public") &&
        !window.location.pathname.includes("/chat")
      ) {
        history.push(`/users/${props.user._id}/home`);
        settingsOnOpenHandler();
      }
      return null;
    }
    if (!props.isAuthenticated) return null;
    // render when showUserSettings is true
    return (
      <>
        <UserSettings
          settingsOnCloseHandler={settingsOnCloseHandler}
          settingsOnOpenHandler={settingsOnOpenHandler}
          setShowUserSettings={setShowUserSettings}
        />
      </>
    );
  };

  return (
    <div id="app-outer-container" data-test="component-app">
      <Router history={history}>
        {renderAuthLoader()}
        <WindowContext.Provider value={getWindowContextValue()}>
          {/*home page if authenticated, if not, redirect to login*/}
          <Route path="/" exact>
            <Redirect
              to={
                props.isAuthenticated
                  ? `/users/${props.user._id}/home`
                  : "/auth/login"
              }
            />
          </Route>
          <UnauthenticatedRoute path="/auth/register" exact>
            <Register />
          </UnauthenticatedRoute>
          <UnauthenticatedRoute path="/auth/login" exact>
            <Login />
          </UnauthenticatedRoute>
          {renderUserSettings()}

          <AuthenticatedRoute path="/users/:id/friends" exact>
            <Friends />
          </AuthenticatedRoute>

          <UserSettingsContext.Provider value={getUserSettingsContextValue()}>
            <FooterContext.Provider value={getFooterContextValue()}>
              <NavContext.Provider value={getNavContextValue()}>
                {renderLeftSidebar()}
                <AuthenticatedRoute path="/users/:id/home" exact>
                  <Home />
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/chat" exact>
                  <Chat />
                </AuthenticatedRoute>
              </NavContext.Provider>
              <Footer />
            </FooterContext.Provider>
          </UserSettingsContext.Provider>
        </WindowContext.Provider>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoadingUser: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
});

export default connect(mapStateToProps, { loadUser })(App);
