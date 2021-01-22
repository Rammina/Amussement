import "./LeftSideBar.scss";

import React, { useContext, useEffect } from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import RoomSideBar from "../RoomSideBar/RoomSideBar";

import { NavContext, FooterContext } from "../AppContext";

const LeftSideBarContainer = (props) => {
  const {
    navMenuButtonTouched,
    leftSideBarShow,
    setLeftSideBarShow,
    setMessagesContainerMoveRight,
  } = useContext(NavContext);
  const { setShowFooter } = useContext(FooterContext);

  const handleResize = () => {
    if (!navMenuButtonTouched) {
      if (window.innerWidth >= 1000) {
        setLeftSideBarShow(true);
      } else {
        setLeftSideBarShow(false);
      }
    }
  };
  const renderContent = () => {
    if (props.content) {
      return props.content;
    }
    return null;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // do not forget the cleanup function or else there will be errors/inconsistencies
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getContainerClass = () => {
    if (props.alwaysShow) {
      return "show";
    }
    return leftSideBarShow ? "show" : "hide";
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
          <h1 className="left-sidebar-status">{props.heading || null}</h1>
          {renderContent()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LeftSideBarContainer;
