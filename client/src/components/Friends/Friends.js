import AddUserImg from "../../icons/add-user.png";

import "./Friends.scss";

import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import history from "../../history";

import Friend from "./Friend/Friend";
import AddFriend from "../forms/friend/AddFriend";

import { getAllFriends } from "../../flux/actions/friendsActions";

import { WindowContext } from "../AppContext";

import { sortAlphabeticallyByNestedProp } from "../../helpers";

const Friends = (props) => {
  const [addFriendOpened, setAddFriendOpened] = useState(false);
  const [category, setCategory] = useState("");
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);

  const location = useLocation();
  useEffect(() => {
    // redirect to home when going to friends page in desktop mode
    if (!isDesktopWidth || !isDesktopHeight) return;
    if (!props.user) return;
    if (
      location.pathname.includes("/friends") &&
      !location.pathname.includes("public") &&
      !location.pathname.includes("/chat")
    ) {
      history.push(`/users/${props.user._id}/home`);
    }
    return;
  }, [location.pathname, isDesktopWidth, isDesktopHeight, props.user]);

  const getAllFriendsButtonClass = () => (!category ? "active" : "");
  const getPendingButtonClass = () => (category === "pending" ? "active" : "");

  const allFriendsButtonOnClickHandler = () => {
    setCategory("");
  };

  const pendingButtonOnClickHandler = () => {
    setCategory("pending");
  };

  const addFriendOnClickHandler = () => {
    setAddFriendOpened(true);
  };

  const closeAddFriendModalHandler = () => {
    setAddFriendOpened(false);
  };

  const renderAddFriendModal = () => {
    if (!addFriendOpened) return null;
    return <AddFriend onModalClose={closeAddFriendModalHandler} />;
  };

  const renderAcceptedFriends = () => {
    const filteredFriends = props.friends.filter((friend) => {
      return friend.status === "accepted";
    });
    if (filteredFriends.length < 1) return null;
    return (
      <>
        <p className="friend-category-description">
          Friends - {filteredFriends.length}
        </p>
        {filteredFriends.map((friend, i) => (
          <Friend key={i + "-accepted"} friend={friend} />
        ))}
      </>
    );
  };

  const renderOutgoingFriendRequests = () => {
    if (isDesktopWidth && isDesktopHeight && category !== "pending")
      return null;
    const filteredFriends = props.friends.filter((friend) => {
      return friend.status === "requested";
    });
    if (filteredFriends.length < 1) return null;
    return (
      <>
        <p className="friend-category-description">
          Outgoing Friend Requests - {filteredFriends.length}
        </p>
        {filteredFriends.map((friend, i) => (
          <Friend key={i + "-requested"} friend={friend} />
        ))}
      </>
    );
  };

  const renderPendingFriendRequests = () => {
    if (isDesktopWidth && isDesktopHeight && category !== "pending")
      return null;
    const filteredFriends = props.friends.filter((friend) => {
      return friend.status === "pending";
    });
    if (filteredFriends.length < 1) return null;
    return (
      <>
        <p className="friend-category-description">
          Incoming Friend Requests - {filteredFriends.length}
        </p>
        {filteredFriends.map((friend, i) => (
          <Friend key={i + "-pending"} friend={friend} />
        ))}
      </>
    );
  };

  const renderFriends = () => {
    // category - string
    // check if there are no friends or if the array is undefined
    if (!props.friends) return null;
    if (props.friends.length < 1) return null;
    const friends = props.friends.sort(
      sortAlphabeticallyByNestedProp("friend", "username")
    );

    // render everything (especially in the case of All Friends)
    if (!category || category === "")
      return (
        <>
          {renderPendingFriendRequests()}
          {renderOutgoingFriendRequests()}
          {renderAcceptedFriends()}
        </>
      );
    else if (category === "pending") {
      return (
        <>
          {renderPendingFriendRequests()}
          {renderOutgoingFriendRequests()}
        </>
      );
    }
  };

  const renderContent = () => {
    if (!isDesktopWidth || !isDesktopHeight) {
      return (
        <React.Fragment>
          <div className="friends-page-container">
            <div className="friends-outer-flex-container">
              <div className="friends-sidebar-outer-container"> </div>
              <section className="friends-section-outer-container">
                <header className="friends-section-header">
                  <h1 className="friends-header-heading">Friends</h1>

                  <button
                    className="friends-header-button"
                    id="add-friend-button"
                    onClick={addFriendOnClickHandler}
                  >
                    <img
                      className={`friends-button-image`}
                      src={AddUserImg}
                      alt="Add User Icon"
                    />
                  </button>
                </header>

                <div className="friends-section-inner-container">
                  <ul className="friends-section-items">{renderFriends()}</ul>
                </div>
              </section>
              <div className="friends-sidebar-outer-container"> </div>
            </div>
          </div>
          {renderAddFriendModal()}
        </React.Fragment>
      );
    }
    return (
      <>
        <section className="friends-section-outer-container">
          <header className="friends-section-header">
            <h1 className="friends-header-heading">Friends</h1>
            <button
              className={`friends-header-button ${getAllFriendsButtonClass()}`}
              onClick={allFriendsButtonOnClickHandler}
            >
              All
            </button>

            <button
              className={`friends-header-button ${getPendingButtonClass()}`}
              onClick={pendingButtonOnClickHandler}
            >
              Pending
            </button>

            <button
              className="friends-header-button"
              id="add-friend-button"
              onClick={addFriendOnClickHandler}
            >
              Add Friend
            </button>
          </header>

          <div className="friends-section-inner-container">
            <ul className="friends-section-items">{renderFriends()}</ul>
            <div id="friends-activity-section"></div>
          </div>
        </section>

        {renderAddFriendModal()}
      </>
    );
  };

  return !props.user ? null : renderContent();
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  friends: state.friends,
  error: state.error,
});

const friendsComponent = connect(mapStateToProps, { getAllFriends })(Friends);

export default friendsComponent;
