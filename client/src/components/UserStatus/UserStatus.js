import "./UserStatus.scss";

import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ProfilePicture from "../ProfilePicture/ProfilePicture";

const UserStatus = (props) => {
  return (
    <div className="user-status-outer-container">
      <div className="user-status-user-container">
        <ProfilePicture
          imageSrc={props.user.image_url || ""}
          componentClass={`sidebar`}
          // onClick={userOnClickHandler}
          // onContextMenu={userOnContextMenuHandler}
        />
        <span className="user-status-item-text">{props.user.username}</span>
      </div>
      <div className="user-status-buttons-container"></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.info,
});

export default connect(mapStateToProps, {})(UserStatus);
