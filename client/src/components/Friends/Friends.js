import "./Friends.scss";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

import Footer from "../Footer/Footer";

import { getAllFriends } from "../../flux/actions/friendsActions";

// import { renderError, getErrorClass } from "../../helpers";

const Friends = props => {
  // const [friendsOpened, setFriendsOpened] = useState(false);

  useEffect(() => {
    console.log(props.match.params.id);
    props.getAllFriends(props.match.params.id);
  }, []);
  return (
    <div className="friends-page-container">
      <div className="friends-outer-flex-container">
        <div className="friends-sidebar-outer-container">
          <header className="friends-sidebar-header">
            <h1 className="friends-header-heading">Friends</h1>
          </header>
          <div className="friends-sidebar-inner-container">
            <ul className="friends-sidebar-items">
              <Link className="friends-sidebar-item-link">
                <li className="friends-sidebar-item">Friend A</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const friendsComponent = connect(
  null,
  { getAllFriends }
)(Friends);

export default friendsComponent;
