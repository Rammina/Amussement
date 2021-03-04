import AddUserImg from "../../icons/add-user.png";

import "./Friends.scss";

import React, { useState, useEffect } from "react";
import { Route, Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
// import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";
import history from "../../history";

import Footer from "../Footer/Footer";
import Friend from "./Friend/Friend";
import AddFriend from "../forms/friend/AddFriend";

import { getAllFriends } from "../../flux/actions/friendsActions";

// import { renderError, getErrorClass } from "../../helpers";

const Friends = (props) => {
  const [friendsList, setFriendsList] = useState(null);
  const [addFriendOpened, setAddFriendOpened] = useState(false);

  useEffect(() => {
    console.log(props.match.params.id);
    // note: could be redundant now
    // props.getAllFriends(props.match.params.id);
  }, []);

  const location = useLocation();
  console.log(location.pathname);
  /*
  const hideSection = sectionName => {
    if (!props.error.msg) {
      if (sectionName === "AddFriend" || sectionName === "add-friend") {
        setAddFriendOpened(false);
      }
    }
  };
  hideSection={() => {
    hideSection("AddFriend");
  }}

*/

  const closeAddFriendModalHandler = () => {
    history.push(`/users/${props.user._id}/friends`);
  };
  const renderAddFriendModal = () => {
    console.log("rendering add friend");
    if (!addFriendOpened) return null;
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

  return !props.user ? null : (
    <React.Fragment>
      <div className="friends-page-container">
        <div className="friends-outer-flex-container">
          <div className="friends-sidebar-outer-container"> </div>
          <section className="friends-section-outer-container">
            <header className="friends-section-header">
              <h1 className="friends-header-heading">Friends</h1>
              <Link
                to={`/users/${props.user._id}/friends/add`}
                className="friends-header-link"
              >
                <button
                  className="friends-header-button"
                  id="add-friend-button"
                  onClick={() => {
                    // add friend modal
                    // setAddFriendOpened(true);
                  }}
                >
                  <img
                    className={`friends-button-image`}
                    src={AddUserImg}
                    alt="Add User Icon"
                  />
                </button>
              </Link>
            </header>

            <div className="friends-section-inner-container">
              <ul className="friends-section-items">{renderFriends()}</ul>
            </div>
          </section>
          <div className="friends-sidebar-outer-container"> </div>
        </div>
      </div>
      <Route path={`/users/:userId/friends/add`} exact>
        <AddFriend onModalClose={closeAddFriendModalHandler} />
      </Route>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.info,
  friends: state.friends,
  error: state.error,
});

const friendsComponent = connect(mapStateToProps, { getAllFriends })(Friends);

export default friendsComponent;
