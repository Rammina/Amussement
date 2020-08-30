import "./LeftSideBar.scss";

import React, { useContext, useEffect } from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import { NavContext } from "../AppContext";

const LeftSideBarContainer = props => {
  const {
    navMenuButtonTouched,
    leftSideBarShow,
    setLeftSideBarShow,
    setMessagesContainerMoveRight
  } = useContext(NavContext);

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
  }, [handleResize]);

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
        }}
      ></div>
      <div className={`left-sidebar-container ${getContainerClass()}`}>
        <h1 className="left-sidebar-status">{props.heading || null}</h1>
        {renderContent()}
      </div>
    </React.Fragment>
  );
};

export default LeftSideBarContainer;
