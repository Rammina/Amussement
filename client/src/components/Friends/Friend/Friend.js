import "./Friend.scss";

import React, { useState, useEffect } from "react";
import { Route, Link, useLocation } from "react-router-dom";
// import { Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
// import { Field, reduxForm } from "redux-form";

import serverRest from "../../../apis/serverRest";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import RemoveFriend from "./RemoveFriend/RemoveFriend";
// import { renderError, getErrorClass } from "../../helpers";

const Friend = (props) => {
  const [friendInfoModalOpen, setFriendInfoModalOpen] = useState(false);
  useEffect(() => {
    console.log(props.friend);
  }, []);

  // friend variables from props
  const { friend, status } = props.friend;
  const location = useLocation();

  const getFriendInfoModalClass = () => {
    return friendInfoModalOpen ? "show" : "hide";
  };

  const renderAvatar = () => {
    const avatarUrl = friend.image_url;
    return (
      <ProfilePicture imageSrc={avatarUrl || ""} componentClass="friend" />
    );
  };

  const renderStatus = () => {
    if (status === "pending") {
      return (
        <div className="friend-item-div status pending">
          Incoming friend request
        </div>
      );
    } else if (status === "requested") {
      return (
        <div className="friend-item-div status requested">
          Sent friend request
        </div>
      );
    }
    return <div className="friend-item-div status added"></div>;
  };

  const renderFriendActionButtons = () => {
    console.log(status);
    const renderButtons = () => {
      if (status === "requested") {
        return (
          <>
            <RemoveFriend friend={friend} text="Cancel Request" />
          </>
        );
      } else if (status === "pending") {
        return (
          <>
            <AddFriend />
            <RemoveFriend friend={friend} text="Reject" />
          </>
        );
      } else if (status === "accepted") {
        return (
          <>
            <RemoveFriend friend={friend} text="Remove Friend" />
            <button
              className="friend-item-div-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {" "}
              call
            </button>
            {/*note:this should lead to a direct message instance/component*/}
            <button
              className="friend-item-div-button"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              direct message
            </button>
          </>
        );
      }
    };

    return <div className="friend-item-div actions">{renderButtons()}</div>;
  };

  const renderFriendInfoModal = () => {
    return (
      <Route path="/users/:id/friends/:friendId" exact>
        <div className={`friend modal ${getFriendInfoModalClass()}`}>
          <h3 className="friend modal-heading">friend.username</h3>
          {renderAvatar()}

          {/*<button type="submit">Submit Image</button>*/}
        </div>
      </Route>
    );
  };

  const renderFriend = () => {
    return (
      <React.Fragment>
        <Link
          to={`${location.pathname}/${friend._id}`}
          className="friend-item-link"
          onClick={() => {
            setFriendInfoModalOpen(true);
          }}
        >
          <li className="friend-item">
            <div className="friend-item-div information">
              <div className="friend-item-avatar-container">
                {renderAvatar()}
              </div>
              <span className="friend-item-username">{friend.username}</span>
            </div>
            {renderStatus()}
            {/*friend action buttons should be here*/}
            {renderFriendActionButtons()}
          </li>
        </Link>
        {renderFriendInfoModal()}
      </React.Fragment>
    );
  };

  return <React.Fragment>{renderFriend()}</React.Fragment>;
};
/*
const mapStateToProps = state => ({
  user: state.user.info,
  friends: state.friends,
  error: state.error
});
*/
const friendComponent = connect(null, {})(Friend);

export default friendComponent;
