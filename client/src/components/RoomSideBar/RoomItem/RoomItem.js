import "./RoomItem.scss";

import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import queryString from "query-string";
import HoverMarker from "../../UIComponents/HoverMarker/HoverMarker";
import RoomContextMenu from "./RoomContextMenu/RoomContextMenu";
import RoomSettings from "../../RoomSettings/RoomSettings";
import DeleteRoom from "../../forms/room/DeleteRoom";

import { leaveRoom } from "../../../flux/actions/roomsActions";
import { updateCurrentRoom } from "../../../flux/actions/currentRoomActions";
import { findPosX, findPosY } from "../../../helpers";
import history from "../../../history";

import { RoomContext } from "../../AppContext";

const RoomItem = (props) => {
  const roomItemRef = useRef(null);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [roomMarkerX, setRoomMarkerX] = useState(-200);
  const [roomMarkerY, setRoomMarkerY] = useState(-200);
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const [isSelectedRoom, setIsSelectedRoom] = useState(false);
  const [showRoomContextMenu, setShowRoomContextMenu] = useState(false);
  const [showRoomSettings, setShowRoomSettings] = useState(false);
  const [deleteRoomOpened, setDeleteRoomOpened] = useState(false);
  const location = useLocation();
  console.log(location);
  // console.log(props.location);

  useLayoutEffect(() => {
    checkSelectedRoom();

    return () => {
      // setIsSelectedRoom(false);
    };
  }, [location.search]);

  useEffect(() => {
    if (roomItemRef.current !== null) {
      setRoomMarkerX(findPosX(roomItemRef.current));
      setRoomMarkerY(findPosY(roomItemRef.current));
    }
    /*return () => {}*/
  }, [roomItemRef.current]);

  let isOwnedByCurrentUser = props.room.owner === props.user._id;

  const getUserType = () => (props.user ? "user" : "guest");

  const checkSelectedRoom = () => {
    if (!props.room || !props.room._id) {
      setIsSelectedRoom(false);
    }

    let search = location.search;
    let params = new URLSearchParams(search);
    let currentRoom = params.get("room");

    if (!currentRoom) {
      setIsSelectedRoom(false);
    }
    if (currentRoom === props.room._id) {
      setIsSelectedRoom(true);
    } else {
      setIsSelectedRoom(false);
    }
  };

  const getSelectedClass = () => (isSelectedRoom ? "selected" : true);

  const onMouseEnterHandler = (e) => {
    setIsMouseHovered(true);
    console.log("hovered over room");
  };
  const onMouseLeaveHandler = () => {
    setIsMouseHovered(false);
    console.log("hovered out of room");
  };

  const onCloseContextMenuHandler = () => {
    setShowRoomContextMenu(false);
  };

  const onRoomContextMenuHandler = (e) => {
    if (props.room.deleted) return null;
    e.preventDefault();
    e.stopPropagation();
    setShowRoomContextMenu(true);
    setClientX(e.clientX);
    setClientY(e.clientY);
  };

  // URL redirect functions
  const redirectToHomeUponRemovalCb = () => {
    // only redirect if user is in the room in the first place
    if (!isSelectedRoom) return null;
    history.push(`/users/${props.user._id}/home`);
  };

  // room actions function handlers

  const roomOpenOnClickHandler = () => {
    props.updateCurrentRoom(props.room);
  };

  const roomSettingsOnClickHandler = () => {
    setShowRoomSettings(true);
    onCloseContextMenuHandler();
  };

  const roomSettingsOnCloseHandler = () => {
    setShowRoomSettings(false);
    // onCloseContextMenuHandler();
  };

  const leaveRoomOnClickHandler = () => {
    // do not allow leaving of room if user is the owner
    if (!isOwnedByCurrentUser) {
      props.leaveRoom(props.room._id, redirectToHomeUponRemovalCb);
      // return null;
    }
    onCloseContextMenuHandler();
  };

  const deleteRoomOnClickHandler = () => {
    // do not allow deleting of room if user is not the owner
    if (isOwnedByCurrentUser) {
      setDeleteRoomOpened(true);
    }
    onCloseContextMenuHandler();
  };

  const deleteRoomOnCloseHandler = () => {
    setDeleteRoomOpened(false);
  };

  const renderRoomContextMenu = () => {
    if (!showRoomContextMenu) return null;

    return (
      <RoomContextMenu
        isOwnedByCurrentUser={isOwnedByCurrentUser}
        clientX={clientX}
        clientY={clientY}
        roomId={props.room._id}
        onClose={onCloseContextMenuHandler}
        leaveRoomOnClick={leaveRoomOnClickHandler}
        deleteRoomOnClick={deleteRoomOnClickHandler}
        roomSettingsOnClick={roomSettingsOnClickHandler}
      />
    );
  };

  const renderRoomSettings = () => {
    if (!showRoomSettings) return null;

    const getRoomContextValue = () => ({
      room: props.room,
      isSelectedRoom,
      roomSettingsOnCloseHandler,
    });

    return (
      <RoomContext.Provider value={getRoomContextValue()}>
        <RoomSettings onClose={roomSettingsOnCloseHandler} />
      </RoomContext.Provider>
    );
  };
  const renderRoomDeleteModal = () => {
    if (!deleteRoomOpened) return null;
    return (
      <DeleteRoom
        room={props.room}
        redirectToHomeUponRemovalCb={redirectToHomeUponRemovalCb}
        onClose={deleteRoomOnCloseHandler}
      />
    );
  };
  // const getGuestName=() => {}
  const renderItemContent = () => {
    // if there is an image, use the URL in the image tag
    // otherwise, use the first character of the room name
    if (props.room) {
      if (props.room.image_url) {
        // render an image
        return <img className="room-item-content" src={props.room.image_url} />;
      } else {
        return (
          <span className={`room-item-content no-image ${getSelectedClass()}`}>
            {props.room.name.charAt(0)}
          </span>
        );
      }
    }
  };

  return (
    <React.Fragment>
      {renderRoomSettings()}
      {renderRoomContextMenu()}
      {renderRoomDeleteModal()}
      <div className="room-item-container" ref={roomItemRef}>
        <Link
          className="room-item-link"
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          onContextMenu={onRoomContextMenuHandler}
          to={props.toUrl}
          onClick={roomOpenOnClickHandler}
        >
          {renderItemContent()}
        </Link>
        <div
          className={`room-item-indicator ${
            isMouseHovered ? "show" : "hide"
          } ${getSelectedClass()}`}
        ></div>
        <HoverMarker
          isShown={isMouseHovered}
          textContent={props.room.name}
          customStyle={{
            left: `calc(${roomMarkerX}px + 4rem)`,
            top: `calc(${roomMarkerY}px + 0.5rem)`,
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default connect(null, { leaveRoom, updateCurrentRoom })(RoomItem);
