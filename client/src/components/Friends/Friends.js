import AddUserImg from "../../icons/add-user.png";

import "./Friends.scss";

import React, { useState, useEffect, useContext } from "react";
import { Route, Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
// import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";
import history from "../../history";

import Footer from "../Footer/Footer";
import Friend from "./Friend/Friend";
import AddFriend from "../forms/friend/AddFriend";

import { getAllFriends } from "../../flux/actions/friendsActions";

import { FooterContext, WindowContext } from "../AppContext";

// import { renderError, getErrorClass } from "../../helpers";

const Friends = (props) => {
  const [friendsList, setFriendsList] = useState(null);
  const [addFriendOpened, setAddFriendOpened] = useState(false);
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);

  const location = useLocation();
  console.log(location.pathname);

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

  const addFriendOnClickHandler = () => {
    setAddFriendOpened(true);
  };

  const closeAddFriendModalHandler = () => {
    setAddFriendOpened(false);
  };

  const renderAddFriendModal = () => {
    console.log("rendering add friend");
    if (!addFriendOpened) return null;
    return <AddFriend onModalClose={closeAddFriendModalHandler} />;
  };

  const renderFriends = (category) => {
    // category - string
    console.log(props.friends);
    console.log(props.friends.length);
    // check if there are no friends or if the array is undefined
    if (!props.friends) return null;
    if (props.friends.length < 1) return null;
    // render everything (especially in the case of All Friends)
    if (!category)
      return props.friends.map((friend, i) => (
        <Friend key={i} friend={friend} />
      ));

    const filteredFriends = props.friends.filter((friend) => {
      return friend.status === category;
    });
    return filteredFriends.map((friend, i) => (
      <Friend key={i} friend={friend} />
    ));
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
            <button className="friends-header-button">All</button>

            <button className="friends-header-button">Pending</button>

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
