import AddImg from "../../../icons/add.png";

import "./AddRoomButton.scss";

import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import HoverMarker from "../../UIComponents/HoverMarker/HoverMarker";
import AddRoomModal from "../AddRoomModal/AddRoomModal";

import { findPosX, findPosY } from "../../../helpers";

const AddRoomButton = (props) => {
  const roomItemRef = useRef(null);
  const [roomMarkerX, setRoomMarkerX] = useState(-200);
  const [roomMarkerY, setRoomMarkerY] = useState(-200);
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [addRoomModalOpened, setAddRoomModalOpened] = useState(false);

  useEffect(() => {
    if (roomItemRef.current !== null) {
      setRoomMarkerX(findPosX(roomItemRef.current));
      setRoomMarkerY(findPosY(roomItemRef.current));
    }
  }, [roomItemRef.current, props.numberOfRooms]);

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

  const onCloseModalHandler = () => {
    setIsSelected(false);
    setAddRoomModalOpened(false);
  };

  const renderAddRoomModal = () => {
    if (!addRoomModalOpened) return null;
    return <AddRoomModal onModalClose={onCloseModalHandler} />;
  };

  return (
    props.user && (
      <React.Fragment>
        {renderAddRoomModal()}
        <div className="room-item-container" ref={roomItemRef}>
          <button
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            className="room-item-button"
            onClick={buttonOnClickHandler}
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
          <HoverMarker
            isShown={isMouseHovered}
            textContent="Add a Room"
            customStyle={{
              left: `calc(${roomMarkerX}px + 4rem)`,
              top: `calc(${roomMarkerY}px + 0.5rem)`,
            }}
          />
        </div>
      </React.Fragment>
    )
  );
};

export default AddRoomButton;
