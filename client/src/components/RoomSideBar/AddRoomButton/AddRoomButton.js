import AddImg from "../../../icons/add.png";

import "./AddRoomButton.scss";

import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import queryString from "query-string";
import HoverMarker from "../../UIComponents/HoverMarker/HoverMarker";

const AddRoomButton = (props) => {
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [addRoomModalOpened, setAddRoomModalOpened] = useState(false);
  const location = useLocation();
  console.log(location);

  const getSelectedClass = () => (isSelected ? "selected" : true);

  const handleOnMouseEnter = () => {
    setIsMouseHovered(true);
  };
  const handleOnMouseLeave = () => {
    setIsMouseHovered(false);
  };

  const buttonOnClickHandler = () => {
    setIsSelected(true);
    setAddRoomModalOpened(true);
  };

  const renderAddRoomModal = () => {
    if (!addRoomModalOpened) return null;
    return <AddRoomModal />;
  };

  return (
    props.user && (
      <React.Fragment>
        <div className="room-item-container">
          <button
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            className="room-item-button"
          >
            <div
              id="add-room-button-img-container"
              className={`room-item-content ${getSelectedClass()}`}
            >
              <img id="add-room-button-img" src={AddImg} alt="plus sign" />
            </div>
          </button>
          <div
            className={`room-item-indicator ${
              isMouseHovered ? "show" : "hide"
            } ${getSelectedClass()}`}
          ></div>
          <HoverMarker isShown={isMouseHovered} textContent="Add a Room" />
        </div>
      </React.Fragment>
    )
  );
};

export default AddRoomButton;

/*

useEffect(() => {
  // checkSelected();

  return () => {
    // setIsSelected(false);
  };
}, [location.search]);

console.log(props.user);

const checkSelected = () => {
  if (
    location.pathname.includes("/users") &&
    location.pathname.includes("/home")
  ) {
    setIsSelected(true);
  } else {
    setIsSelected(false);
  }
};
*/
