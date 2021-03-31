import "./UserItem.scss";

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import CloseButton from "../../buttons/CloseButton";

import {
  getAllDmRooms,
  removeActiveDmRoom,
} from "../../../flux/actions/dmRoomsActions";

const UserItem = (props) => {
  const location = useLocation();
  const { receiver } = queryString.parse(location.search);

  const getActiveClass = () =>
    receiver === props.user.username ? "active" : "";

  const renderCloseButton = () => {
    if (props.noCloseButton || !props.room) return null;

    const closeButtonOnClickHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      props.removeActiveDmRoom(props.room._id);
    };

    return (
      <CloseButton
        componentClass="user-item"
        onClickHandler={closeButtonOnClickHandler}
      />
    );
  };

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
        {renderCloseButton()}
      </>
    );
  };
  const renderComponent = () => {
    if (props.isLink) {
      return (
        <Link
          to={`/chat?room=DMto${props.user._id}&userType=user&roomType=DM&receiver=${props.user.username}`}
          className={`user-item-outer-container ${getActiveClass()}`}
        >
          {renderContent()}
        </Link>
      );
    } else {
      return <div className="user-item-outer-container">{renderContent()}</div>;
    }
  };
  return renderComponent();
};

export default connect(null, { removeActiveDmRoom })(UserItem);
