import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./OnlineUsersContainer.css";

const OnlineUsersContainer = ({ users }) => (
  <div className="online-users-container">
    {users ? (
      <div>
        <h1 className="online-users-status">Online -- {users.length}</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default OnlineUsersContainer;
