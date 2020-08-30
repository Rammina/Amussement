import "./RoomItem.scss";

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// import onlineIcon from "../../icons/onlineIcon.png";

// import { NavContext } from "../../AppContext";

const RoomItem = props => {
  const renderItemContent = () => {
    // if there is an image, use the URL in the image tag
    // otherwise, use the first character of the room name
    if (props.room) {
      if (props.room.image_url) {
        // render an image
        return (
          <img
            className="room-item-content"
            src={`https://res.cloudinary.com/rammina/image/upload/v1598598880/amussement-avatars/5f423937dd4b511da81e2af1-user-avatar.png`}
          />
        );
      } else {
        return (
          <span className="room-item-content">{props.room.name.charAt(0)}</span>
        );
      }
    }
  };

  return (
    <React.Fragment>
      <div className="room-item-container">
        <Link className="room-item-link">H</Link>
      </div>
    </React.Fragment>
  );
};

export default RoomItem;
