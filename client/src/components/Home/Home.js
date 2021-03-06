import LogoutImg from "../../icons/logout.png";

import "./Home.scss";

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RoomSideBar from "../RoomSideBar/RoomSideBar";

import { FooterContext } from "../AppContext";

// import { renderError, getErrorClass } from "../../helpers";

const Home = (props) => {
  const userId = props.user ? props.user._id || props.user.id : null;
  const { setShowFooter } = useContext(FooterContext);

  useEffect(() => {
    console.log(props.match.params.id);
    setShowFooter(true);
  }, []);

  const renderOpenedDmChannels = () => {
    if (!props.user || !props.user.openedDmChannels) return null;
    const channels = props.user.openedDmChannels;
    return channels.map((channel) => {
      return <div>channel.name</div>;
    });
  };

  return (
    <React.Fragment>
      <div className="user-home-page-container">
        <div className="home sidebar-outer-container">
          {/*note: this should show all of the direct messages that are opened*/}
          <LeftSideBar
            heading="Direct Messages"
            alwaysShow={true}
          ></LeftSideBar>
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
