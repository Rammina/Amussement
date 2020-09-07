import "./Friends.scss";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

import Footer from "../Footer/Footer";
import Friend from "./Friend/Friend";

import { getAllFriends } from "../../flux/actions/friendsActions";

// import { renderError, getErrorClass } from "../../helpers";

const Friends = props => {
  const [friendsList, setFriendsList] = useState(null);

  useEffect(() => {
    console.log(props.match.params.id);
    props.getAllFriends(props.match.params.id);
  }, []);

  const renderFriends = category => {
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

    const filteredFriends = props.friends.filter(friend => {
      return friend.status === category;
    });
    return filteredFriends.map((friend, i) => (
      <Friend key={i} friend={friend} />
    ));
  };
  /*
  const renderRequested = () => {
    const requestedFriends = props.friends.filter(friend => {
      return friend.status === "pending";
    });
    return requestedFriends.map((friend, i) => <Friend key={i} friend={friend} status="Sent Friend Request"/>);
  };

  const renderPending = () => {
    const pendingFriends = props.friends.filter(friend => {
      return friend.status === "pending";
    });
    return pendingFriends.map((friend, i) => <Friend key={i} friend={friend} status="Incoming Friend Request"/>);
  };
*/

  return (
    <div className="friends-page-container">
      <div className="friends-outer-flex-container">
        <div className="friends-sidebar-outer-container">
          <header className="friends-sidebar-header">
            <h1 className="friends-header-heading">Friends</h1>
          </header>
          <div className="friends-sidebar-inner-container">
            <ul className="friends-sidebar-items">{renderFriends()}</ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.info,
  friends: state.friends,
  error: state.error
});

const friendsComponent = connect(
  mapStateToProps,
  { getAllFriends }
)(Friends);

export default friendsComponent;
