import LogoutImg from "../../icons/logout.png";

import "./Home.scss";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RoomSideBar from "../RoomSideBar/RoomSideBar";
import Footer from "../Footer/Footer";

// import { renderError, getErrorClass } from "../../helpers";

const Home = (props) => {
  const userId = props.user ? props.user._id || props.user.id : null;

  useEffect(() => {
    console.log(props.match.params.id);
  }, []);

  return (
    <React.Fragment>
      <div className="user-home-page-container">
        <div className="home sidebar-outer-container">
          <LeftSideBar
            heading="Direct Messages"
            alwaysShow={true}
            content={null}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  error: state.error,
});

const home = connect(mapStateToProps, {})(Home);

export default home;
