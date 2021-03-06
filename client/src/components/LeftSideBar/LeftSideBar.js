import "./LeftSideBar.scss";

import React, { useContext, useEffect } from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import RoomSideBar from "../RoomSideBar/RoomSideBar";

import { NavContext, FooterContext } from "../AppContext";

const LeftSideBarContainer = (props) => {
  const {
    getNavMenuButtonTouched,
    leftSideBarShow,
    setLeftSideBarShow,
    setMessagesContainerMoveRight,
  } = useContext(NavContext);
  const { setShowFooter } = useContext(FooterContext);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // do not forget the cleanup function or else there will be errors/inconsistencies
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LeftSideBarContainer;
