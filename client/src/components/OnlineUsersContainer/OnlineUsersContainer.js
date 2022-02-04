import "./OnlineUsersContainer.scss";

import React, { useContext, useEffect } from "react";

import { NavContext } from "../AppContext";

import UserItem from "../UIComponents/UserItem/UserItem";

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

  useEffect(() => {}, [users]);

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
            {users.map((user) => (
              <UserItem
                isDmLink={false}
                user={user}
                noCloseButton={true}
                key={user._id}
              />
            ))}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default OnlineUsersContainer;
