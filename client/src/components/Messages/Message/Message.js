import "./Message.scss";

import React, { useState, useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import ReactEmoji from "react-emoji";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import HoverMarker from "../../UIComponents/HoverMarker/HoverMarker";
import DeleteMessage from "./DeleteMessage/DeleteMessage";
import EditMessage from "./EditMessage/EditMessage";
import UserProfileCard from "../../UserProfileCard/UserProfileCard";
import ContextMenu from "../../UIComponents/ContextMenu/ContextMenu";
import MessageContextMenu from "./MessageContextMenu/MessageContextMenu";
import UserContextMenu from "../../UserContextMenu/UserContextMenu";

import { ChatContext, UserProfileCardContext } from "../../AppContext";

import history from "../../../history";
import {
  toChatCustomTimestamp,
  timestampToStandardTime,
  copyToClipboard,
  getFriendStatusWithUser,
  isFriendsWithUser,
} from "../../../helpers";

import { addActiveDmRoom } from "../../../flux/actions/dmRoomsActions";

const Message = ({
  message,
  name,
  sameSenderAsPrevMsg,
  friends,
  user,
  dmRooms,
  addActiveDmRoom,
}) => {
  const [showUserContextMenu, setShowUserContextMenu] = useState(false);
  const [showMessageContextMenu, setShowMessageContextMenu] = useState(false);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [
    isMouseHoveredOnMessageContainer,
    setIsMouseHoveredOnMessageContainer,
  ] = useState(false);
  const [isMouseHoveredOnEdited, setIsMouseHoveredOnEdited] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [editedMarkerX, setEditedMarkerX] = useState(-200);
  const [editedMarkerY, setEditedMarkerY] = useState(-200);
  const editedMarkerRef = useRef(null);

  const { deleteMessage, editMessage, chatInputRef } = useContext(ChatContext);

  useEffect(() => {
    /*
    if (editedMarkerRef.current) {
      setEditedMarkerX(
        editedMarkerRef.current.getBoundingClientRect().left + window.scrollX
      );
      setEditedMarkerY(
        editedMarkerRef.current.getBoundingClientRect().top + window.scrollY
      );
    }
    */
    /*return () => {}*/
  }, [editedMarkerRef]);

  const onCloseContextMenuHandler = () => {
    setShowUserContextMenu(false);
    setShowMessageContextMenu(false);
  };

  const onCopyIdHandler = () => {
    if (message && message._id) {
      copyToClipboard(message._id);
    }
  };
  const onMouseEnterMessageContainerHandler = () => {
    setIsMouseHoveredOnMessageContainer(true);
  };

  const onMouseLeaveMessageContainerHandler = () => {
    setIsMouseHoveredOnMessageContainer(false);
  };

  const onMouseEnterEditedHandler = (e) => {
    setEditedMarkerX(e.clientX);
    setEditedMarkerY(e.clientY);
    setIsMouseHoveredOnEdited(true);
  };
  const onMouseLeaveEditedHandler = () => {
    setEditedMarkerX(-200);
    setEditedMarkerY(-200);
    setIsMouseHoveredOnEdited(false);
  };

  const userOnClickHandler = () => {
    // prevent interactions if user is deleted
    if (message.user.deleted) return null;

    setUserInfoModalOpen(true);
  };

  // message context menu function handlers
  const editMessageOnClickHandler = () => {
    setIsEditMode(true);
    onCloseContextMenuHandler();
  };

  const deleteMessageOnClickHandler = () => {
    setShowDeleteMessageModal(true);
    onCloseContextMenuHandler();
  };

  const copyIdOnClickHandler = () => {
    onCopyIdHandler();
    onCloseContextMenuHandler();
  };

  // user context menu function handlers
  const profileOnClickHandler = () => {
    setUserInfoModalOpen(true);
    onCloseContextMenuHandler();
  };

  const sendMessageOnClickHandler = () => {
    let alreadyAddedToActive = false;
    let roomName = `${[user._id, message.user._id].sort().join("_")}DM`;

    for (let dmRoom of dmRooms) {
      if (dmRoom.name === roomName) {
        alreadyAddedToActive = true;
      }
    }

    if (!alreadyAddedToActive) {
      addActiveDmRoom({
        // senderId: props.user._id,
        owner: null,
        receiver: message.user,
        receiverId: message.user._id,
        messages: [],
        members: [
          { user: user, roles: ["member"] },
          { user: message.user, roles: ["member"] },
        ],
        image_url: "",
        name: roomName,
        type: "DM",
        requires_approval: "false",
      });
    }

    history.push(
      `/chat?room=${roomName}&userType=user&roomType=DM&receiver=${message.user.username}`
    );
  };

  const userOnContextMenuHandler = (e) => {
    if (message.user.deleted) return null;
    e.preventDefault();
    e.stopPropagation();
    setShowUserContextMenu(true);
    setClientX(e.clientX);
    setClientY(e.clientY);
  };

  const messageOnContextMenuHandler = (e) => {
    e.preventDefault();
    setShowMessageContextMenu(true);
    setClientX(e.clientX);
    setClientY(e.clientY);
  };

  // get value  of UserProfileCardContext using this function
  const getUserProfileCardContextValue = () => {
    return {
      selectedUser: message.user,
      // friendStatus: status
    };
  };

  const getDeletedClass = () => (message.user.deleted ? "deleted" : "");

  const renderUserInfoModal = () => {
    if (!userInfoModalOpen) return null;
    return (
      <UserProfileCardContext.Provider value={getUserProfileCardContextValue()}>
        <UserProfileCard
          componentClass="message-user-profile"
          onModalClose={() => {
            setUserInfoModalOpen(false);
          }}
        />
      </UserProfileCardContext.Provider>
    );
  };

  const renderDeleteMessageModal = () => {
    if (!showDeleteMessageModal) return null;
    return (
      <DeleteMessage
        message={message}
        onModalClose={() => {
          setShowDeleteMessageModal(false);
          chatInputRef.current.focus();
        }}
      />
    );
  };

  const trimmedName = name.trim();
  let isSentByCurrentUser = false;
  if (message.user.username === name || message.user.name === name) {
    isSentByCurrentUser = true;
  }

  const renderUserContextMenu = () => {
    if (!showUserContextMenu) return null;

    return (
      <UserContextMenu
        isCurrentUser={isSentByCurrentUser}
        clientX={clientX}
        clientY={clientY}
        userId={message.user._id}
        friends={friends}
        onClose={onCloseContextMenuHandler}
        profileOnClick={profileOnClickHandler}
        sendMessageOnClick={sendMessageOnClickHandler}
      />
    );
  };

  const renderMessageContextMenu = () => {
    // console.log(isSentByCurrentUser);
    if (!showMessageContextMenu) return null;
    return (
      <MessageContextMenu
        isSentByCurrentUser={isSentByCurrentUser}
        clientX={clientX}
        clientY={clientY}
        onClose={onCloseContextMenuHandler}
        copyIdOnClick={copyIdOnClickHandler}
        editMessageOnClick={editMessageOnClickHandler}
        deleteMessageOnClick={deleteMessageOnClickHandler}
      />
    );
  };

  const renderMessageTimestamp = () => {
    if (!sameSenderAsPrevMsg || !isMouseHoveredOnMessageContainer) return null;
    return (
      <span className="message-timestamp-same-sender">
        {timestampToStandardTime(message.createdAt)}
      </span>
    );
  };

  const renderEditedMarker = () => {
    if (message.createdAt === message.updatedAt) return null;
    // console.log(editedMarkerRef);
    // console.log(editedMarkerRef.current);

    const getEditedMarkerX = () => editedMarkerX;

    // editedMarkerRef.current.getBoundingClientRect().left;
    const getEditedMarkerY = () => editedMarkerY;
    // editedMarkerRef.current.getBoundingClientRect().top;
    return (
      <>
        <span
          className="edited-marker"
          ref={editedMarkerRef}
          onMouseEnter={onMouseEnterEditedHandler}
          onMouseLeave={onMouseLeaveEditedHandler}
        >
          {" "}
          (edited)
        </span>
        {ReactDOM.createPortal(
          <HoverMarker
            customStyle={{
              position: "fixed",
              // top: `100px`,
              // left: "0px",
              top: `calc(${getEditedMarkerY() || 0}px - 2.2rem)`,
              left: `calc(${getEditedMarkerX() || 0}px - 4rem)`,
            }}
            isShown={isMouseHoveredOnEdited}
            textContent={`${toChatCustomTimestamp(message.updatedAt)}`}
          />,
          document.getElementById("edited-hover-marker")
        )}
      </>
    );
  };

  const renderMessageText = (textOnly) => {
    const textOnlyClass = textOnly ? "no-image" : "";
    let sameSenderClass = sameSenderAsPrevMsg ? "same-sender" : "";

    if (isEditMode) {
      const closeEditMode = () => {
        setIsEditMode(false);
      };
      // render a textarea where a user can edit their message
      return (
        <EditMessage
          message={message}
          textOnlyClass={textOnlyClass}
          sameSenderClass={sameSenderClass}
          openDeleteMessageModal={() => {
            setShowDeleteMessageModal(true);
          }}
          onClose={closeEditMode}
        />
      );
    }
    // just render a normal message box
    return (
      <div className={`messageBox`}>
        <p
          className={`message-text colorDark ${textOnlyClass} ${sameSenderClass}`}
        >
          {ReactEmoji.emojify(message.text)}
          {renderEditedMarker()}
        </p>
      </div>
    );
  };

  const renderMessage = () => {
    let senderText = null;
    let senderImage = null;
    let messageContainerClass = null;
    let isTextOnly = true;

    if (!sameSenderAsPrevMsg) {
      senderImage = (
        <ProfilePicture
          imageSrc={
            // message.image_url ||
            message.user.image_url || ""
          }
          componentClass={`message ${getDeletedClass()}`}
          onClick={userOnClickHandler}
          onContextMenu={userOnContextMenuHandler}
        />
      );
      senderText = (
        <>
          <p
            className={`sender-text ${getDeletedClass()}`}
            onClick={userOnClickHandler}
            onContextMenu={userOnContextMenuHandler}
          >
            {isSentByCurrentUser
              ? trimmedName
              : message.user.username || message.user.name}
          </p>
          <span className="message-timestamp beside-sender">
            {toChatCustomTimestamp(message.createdAt || null) || null}
          </span>
        </>
      );
      isTextOnly = false;
    } else {
      messageContainerClass = "text-only";
    }

    return (
      <>
        {renderUserContextMenu()}
        {renderMessageContextMenu()}
        {renderDeleteMessageModal()}
        {renderUserInfoModal()}
        <div
          className={`messageContainer justifyStart ${messageContainerClass}`}
          onMouseEnter={onMouseEnterMessageContainerHandler}
          onMouseLeave={onMouseLeaveMessageContainerHandler}
          onContextMenu={messageOnContextMenuHandler}
        >
          {renderMessageTimestamp()}
          {senderImage}
          <div className={`message-text-container `}>
            {senderText}
            {renderMessageText(isTextOnly)}
          </div>
        </div>
      </>
    );
  };

  return renderMessage();
};
const mapStateToProps = (state) => ({
  //note: pass it down normally if it causes lag
  user: state.user.info,
  friends: state.friends,
  dmRooms: state.dmRooms,
});
export default connect(mapStateToProps, { addActiveDmRoom })(Message);
