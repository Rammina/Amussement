import LogoutImg from "../../icons/logout.png";

import "./Home.scss";

import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RoomSideBar from "../RoomSideBar/RoomSideBar";
import DmRoomList from "../DmRoomList/DmRoomList";

import { FooterContext } from "../AppContext";
// import { getAllDmRooms } from "../../flux/actions/dmRoomsActions";

// import { renderError, getErrorClass } from "../../helpers";

const Home = (props) => {
  const { id } = useParams();
  const userId = props.user ? props.user._id || props.user.id : null;
  const { setShowFooter } = useContext(FooterContext);

  useEffect(() => {
    console.log(props.match.params.id);
    setShowFooter(true);
    // props.getAllDmRooms(id);
  }, []);

  return (
    <React.Fragment>
      <div className="user-home-page-container">
        <div className="home sidebar-outer-container">
          {/*note: this should show all of the direct messages that are opened*/}
          <LeftSideBar heading="Direct Messages" alwaysShow={true}>
            <DmRoomList />
          </LeftSideBar>
        </div>
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
