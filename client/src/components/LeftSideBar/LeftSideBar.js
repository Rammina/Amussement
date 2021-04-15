import FriendsImg from "../../icons/friends.png";

import "./LeftSideBar.scss";

import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import onlineIcon from "../../icons/onlineIcon.png";

import RoomSideBar from "../RoomSideBar/RoomSideBar";
import UserStatus from "../UserStatus/UserStatus";

import { NavContext, FooterContext, WindowContext } from "../AppContext";

const LeftSideBarContainer = (props) => {
  const [showFriendsButton, setShowFriendsButton] = useState(false);
  const {
    getNavMenuButtonTouched,
    leftSideBarShow,
    setLeftSideBarShow,
    setMessagesContainerMoveRight,
  } = useContext(NavContext);
  const { setShowFooter } = useContext(FooterContext);
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // do not forget the cleanup function or else there will be errors/inconsistencies
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      location.pathname.includes("home") &&
      !location.pathname.includes("chat")
    ) {
      setShowFriendsButton(true);
    }
  }, [location.pathname]);

  const handleResize = () => {
    console.log("This triggers");
    console.log(getNavMenuButtonTouched());

    if (!getNavMenuButtonTouched()) {
      if (window.innerWidth >= 1200) {
        setLeftSideBarShow(true);
        setMessagesContainerMoveRight(true);
        setShowFooter(false);
      } else {
        console.log("This triggers");
        setLeftSideBarShow(false);
        setMessagesContainerMoveRight(false);
        setShowFooter(false);
      }
    }
  };

  const getContainerClass = () => {
    if (props.alwaysShow) {
      return "show";
    }
    return leftSideBarShow ? "show" : "hide";
  };

  const renderFriendsButton = () => {
    if (!isDesktopWidth || !isDesktopHeight) return null;
    if (!showFriendsButton) return null;
    return (
      <button id="left-sidebar-friends-button">
        <img id="left-sidebar-button-image" src={FriendsImg} alt="Group Icon" />
        <span id="left-sidebar-button-text">Friends</span>
      </button>
    );
  };

  const renderUserStatus = () => {
    if (!isDesktopWidth || !isDesktopHeight) return null;
    return <UserStatus />;
  };

  return (
    <React.Fragment>
      <div
        className={`left-sidebar backdrop ${getContainerClass()}`}
        onClick={() => {
          setLeftSideBarShow(false);
          setMessagesContainerMoveRight(false);
          setShowFooter(false);
        }}
      ></div>
      <div className={`left-sidebar-container ${getContainerClass()}`}>
        <RoomSideBar />
        <div className={`left-sidebar-room-information-outer-container`}>
          {renderFriendsButton()}
          <h1 className="left-sidebar-heading">{props.heading || null}</h1>
          {props.children}
          {renderUserStatus()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LeftSideBarContainer;
