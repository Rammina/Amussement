import FriendsImg from "../../icons/friends.png";

import "./LeftSideBar.scss";

import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";

import onlineIcon from "../../icons/onlineIcon.png";

import RoomSideBar from "../RoomSideBar/RoomSideBar";
import UserStatus from "../UserStatus/UserStatus";
import DmRoomList from "../DmRoomList/DmRoomList";

import { NavContext, FooterContext, WindowContext } from "../AppContext";

const LeftSideBarContainer = (props) => {
  const [showFriendsButton, setShowFriendsButton] = useState(false);
  const [alwaysShow, setAlwaysShow] = useState(false);
  const [showDmRoomList, setShowDmRoomList] = useState(false);
  const [sidebarHeading, setSidebarHeading] = useState("");
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
    const { roomType } = queryString.parse(location.search);

    if (
      // should be only at home page
      (location.pathname.includes("/home") &&
        !location.pathname.includes("public") &&
        !location.pathname.includes("/chat")) ||
      // or in DMs
      roomType === "DM"
    ) {
      setShowFriendsButton(true);
      setShowDmRoomList(true);
    } else {
      setShowFriendsButton(false);
      setShowDmRoomList(false);
    }
    // always show left sidebar on home
    if (
      location.pathname.includes("/home") &&
      !location.pathname.includes("public") &&
      !location.pathname.includes("/chat")
    ) {
      setAlwaysShow(true);
    } else {
      setAlwaysShow(false);
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    const { room, roomType } = queryString.parse(location.search);
    if (location.pathname.includes("/chat") && roomType !== "DM") {
      setSidebarHeading(room);
    } else {
      setSidebarHeading("Direct Messages");
    }

    /*return () => {}*/
  }, [location.pathname, location.search]);

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
    if (alwaysShow) {
      return "show";
    }
    return leftSideBarShow ? "show" : "hide";
  };

  const getFriendsButtonClass = () => {
    if (!isDesktopWidth || !isDesktopHeight) return "";
    if (
      // should be only at home page
      location.pathname.includes("/home") &&
      !location.pathname.includes("public") &&
      !location.pathname.includes("/chat")
    ) {
      return "active";
    }
    return "";
  };

  const renderFriendsButton = () => {
    if (!isDesktopWidth || !isDesktopHeight) return null;
    if (!showFriendsButton) return null;

    return (
      <Link
        className={`left-sidebar-friends-button ${getFriendsButtonClass()}`}
        to={`/users/${props.user && props.user._id}/home`}
      >
        <img id="left-sidebar-button-image" src={FriendsImg} alt="Group Icon" />
        <span id="left-sidebar-button-text">Friends</span>
      </Link>
    );
  };

  const renderUserStatus = () => {
    if (!isDesktopWidth || !isDesktopHeight) return null;
    return <UserStatus />;
  };

  const renderDmRoomList = () => {
    if (!showDmRoomList) return null;
    return <DmRoomList />;
  };

  return (
    <React.Fragment>
      <div
        className={`left-sidebar backdrop ${getContainerClass()}`}
        onClick={() => {
          console.log("clicking backdrop");
          setLeftSideBarShow(false);
          setMessagesContainerMoveRight(false);
          setShowFooter(false);
        }}
      ></div>
      <div className={`left-sidebar-container ${getContainerClass()}`}>
        <RoomSideBar />
        <div className={`left-sidebar-room-information-outer-container`}>
          {renderFriendsButton()}
          <h1 className="left-sidebar-heading">{sidebarHeading}</h1>
          {renderDmRoomList()}
          {renderUserStatus()}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps, {})(LeftSideBarContainer);
