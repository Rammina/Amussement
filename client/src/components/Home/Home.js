import LogoutImg from "../../icons/logout.png";

import "./Home.scss";

import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import serverRest from "../../apis/serverRest";

import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RoomSideBar from "../RoomSideBar/RoomSideBar";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

import { FooterContext } from "../AppContext";
import { getAllDmRooms } from "../../flux/actions/dmRoomsActions";

// import { renderError, getErrorClass } from "../../helpers";

const Home = (props) => {
  const { id } = useParams();
  const userId = props.user ? props.user._id || props.user.id : null;
  const { setShowFooter } = useContext(FooterContext);

  useEffect(() => {
    console.log(props.match.params.id);
    setShowFooter(true);
    props.getAllDmRooms(id);
  }, []);

  const renderOpenedDmRooms = () => {
    if (!props.user || !props.dmRooms) return null;
    const rooms = props.dmRooms;

    const getReceiverInDmRoom = (room) => {
      for (let member of room.members) {
        if (member.user._id !== props.user._id) {
          return (
            <>
              <Link
                to={`/chat?room=DMto${member.user._id}&userType=user&roomType=DM&receiver=${member.user.username}`}
                className="left-sidebar-item-outer-container"
              >
                <ProfilePicture
                  imageSrc={member.user.image_url || ""}
                  componentClass={`sidebar`}
                  // onClick={userOnClickHandler}
                  // onContextMenu={userOnContextMenuHandler}
                />
                <span className="left-sidebar-item-text">
                  {member.user.username}
                </span>
              </Link>
            </>
          );
        }
      }
    };
    return rooms.map((room) => {
      console.log(room.name);
      console.log(room);
      console.log(room.members);
      // get the user that is not the current logged in one

      console.log(room);
      return getReceiverInDmRoom(room);
    });
  };

  return (
    <React.Fragment>
      <div className="user-home-page-container">
        <div className="home sidebar-outer-container">
          {/*note: this should show all of the direct messages that are opened*/}
          <LeftSideBar heading="Direct Messages" alwaysShow={true}>
            {renderOpenedDmRooms()}
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

const home = connect(mapStateToProps, { getAllDmRooms })(Home);

export default home;
