import React from "react";

const UserConnections = (props) => {
  // note: mobile and desktop versions should be different
  return (
    <section className="user-profile-card-section-sub-container">
      <h4 className="user-profile-card-section-header">Connections</h4>
      <div className="user-profile-card-mutual-button-container">
        <button className="user-profile-card-mutual-button">
          <span>Mutual Servers</span>
          {/*change this to an image with the right arrow*/}
          <span>{">"}</span>
        </button>
        <button className="user-profile-card-mutual-button">
          <span>Mutual Friends</span>
          <span>{">"}</span>
        </button>
      </div>
    </section>
  );
};

export default UserConnections;
