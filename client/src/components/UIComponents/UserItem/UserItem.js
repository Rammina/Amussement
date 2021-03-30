import React, { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";

const UserItem = (props) => {
  const renderContent = () => {
    return (
      <>
        <ProfilePicture
          imageSrc={props.user.image_url || ""}
          componentClass={`sidebar`}
          // onClick={userOnClickHandler}
          // onContextMenu={userOnContextMenuHandler}
        />
        <span className="user-item-text">{props.user.username}</span>
      </>
    );
  };
  const renderContentWrapper = () => {
    if (props.isLink) {
      return (
        <Link
          to={`/chat?room=DMto${props.user._id}&userType=user&roomType=DM&receiver=${props.user.username}`}
          className="user-item-outer-container"
        >
          {renderContent()}
        </Link>
      );
    } else {
      return <div className="user-item-outer-container">{renderContent()}</div>;
    }
  };
  return renderContentWrapper();
};

export default UserItem;
