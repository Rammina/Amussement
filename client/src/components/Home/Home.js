import LogoutImg from "../../icons/logout.png";

import "./Home.scss";

import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

import LeftSideBar from "../LeftSideBar/LeftSideBar";
import DmRoomList from "../DmRoomList/DmRoomList";
import Friends from "../Friends/Friends";

import { FooterContext, WindowContext } from "../AppContext";

const Home = (props) => {
  const { id } = useParams();
  const userId = props.user ? props.user._id || props.user.id : null;
  const { setShowFooter } = useContext(FooterContext);
  const { isDesktopWidth, isDesktopHeight } = useContext(WindowContext);

  useEffect(() => {
    if (!isDesktopWidth || !isDesktopHeight) setShowFooter(true);
  }, [isDesktopWidth, isDesktopHeight]);

  const renderFriendsComponent = () => {
    if (!isDesktopWidth || !isDesktopHeight) return null;
    return <Friends />;
  };

  return (
    <React.Fragment>
      <div className="user-home-page-container">
        <div className="home sidebar-outer-container"></div>
        {renderFriendsComponent()}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.info,
  dmRooms: state.dmRooms,
  error: state.error,
});

export default connect(mapStateToProps, {})(Home);
