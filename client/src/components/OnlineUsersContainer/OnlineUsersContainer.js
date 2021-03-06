import "./OnlineUsersContainer.scss";

import React, { useState, useContext, useEffect } from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import { NavContext } from "../AppContext";

const OnlineUsersContainer = ({ users }) => {
  const {
    onlineUsersShow,
    setOnlineUsersShow,
    getOnlineUsersButtonTouched,
    setMessagesContainerMoveLeft,
  } = useContext(NavContext);

  const handleResize = () => {
    if (!getOnlineUsersButtonTouched()) {
      if (window.innerWidth >= 1000) {
        setOnlineUsersShow(true);
        setMessagesContainerMoveLeft(true);
      } else {
        setOnlineUsersShow(false);
        setMessagesContainerMoveLeft(false);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // do not forget the cleanup function or else there will be errors/inconsistencies
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getContainerClass = () => {
    return onlineUsersShow ? "show" : "hide";
  };

  return (
    <React.Fragment>
      <div
        className={`online-users backdrop ${getContainerClass()}`}
        onClick={() => {
          setOnlineUsersShow(false);
          setMessagesContainerMoveLeft(false);
        }}
      ></div>
      <div className={`online-users-container ${getContainerClass()}`}>
        {users ? (
          <div>
            <h1 className="online-users-status">Online -- {users.length}</h1>
            <div className="activeContainer">
              {users.map(({ name }) => (
                <div key={name} className="activeItem">
                  <img alt="Online Icon" src={onlineIcon} />
                  <h2 className={`online-users-username`}>{name}</h2>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default OnlineUsersContainer;

/*
  const [containerTouched, setContainerTouched] = useState(false);
  const [disableTabletResizeEffects, setDisableTabletResizeEffects] = useState(
    false
  );
  const [disableMobileResizeEffects, setDisableMobileResizeEffects] = useState(
    false
  );
  */

/*
useEffect(() => {
  // const refreshContainerTouchedOnResize = () => {
  //   setDisableTabletResizeEffects(true);
  //   if (window.innerWidth >= 650 && !disableTabletResizeEffects) {
  //     console.log(disableTabletResizeEffects);
  //     setDisableTabletResizeEffects(true);
  //     setDisableMobileResizeEffects(false);
  //     setOnlineUsersShow(true);
  //
  //     console.log(disableTabletResizeEffects);
  //   } else if (window.innerWidth < 650 && !disableMobileResizeEffects) {
  //     setDisableTabletResizeEffects(false);
  //     setDisableMobileResizeEffects(true);
  //     setOnlineUsersShow(false);
  //   }
  // };
  refreshContainerTouchedOnResize();
  window.addEventListener("resize", refreshContainerTouchedOnResize);
}, []);

*/
