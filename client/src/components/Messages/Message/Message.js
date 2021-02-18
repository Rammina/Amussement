import "./Message.scss";

import React, { useState, useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import ReactEmoji from "react-emoji";

import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import ContextMenu from "../../UIComponents/ContextMenu/ContextMenu";
import HoverMarker from "../../UIComponents/HoverMarker/HoverMarker";
import DeleteMessage from "./DeleteMessage/DeleteMessage";
import EditMessage from "./EditMessage/EditMessage";

import { ChatContext } from "../../AppContext";
import {
  toChatCustomTimestamp,
  timestampToStandardTime,
  copyToClipboard,
} from "../../../helpers";

const Message = ({ message, name, sameSenderAsPrevMsg }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [
    isMouseHoveredOnMessageContainer,
    setIsMouseHoveredOnMessageContainer,
  ] = useState(false);
  const [isMouseHoveredOnEdited, setIsMouseHoveredOnEdited] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [editedMarkerX, setEditedMarkerX] = useState(-100);
  const [editedMarkerY, setEditedMarkerY] = useState(-100);
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
    setShowContextMenu(false);
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
    setEditedMarkerX(-100);
    setEditedMarkerY(-100);
    setIsMouseHoveredOnEdited(false);
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

  const renderContextMenu = () => {
    console.log(isSentByCurrentUser);
    if (!showContextMenu) return null;
    let actionButtons = null;

    if (isSentByCurrentUser) {
      actionButtons = (
        <>
          <button
            className="context-menu-button message"
            onClick={() => {
              setIsEditMode(true);
              onCloseContextMenuHandler();
            }}
          >
            <span>Edit Message</span>
          </button>
          <button
            className="context-menu-button message danger"
            onClick={() => {
              setShowDeleteMessageModal(true);
              onCloseContextMenuHandler();
            }}
          >
            <span>Delete Message</span>
          </button>
        </>
      );
    }
    return (
      <ContextMenu
        componentClass="message"
        clientX={clientX}
        clientY={clientY}
        onClose={onCloseContextMenuHandler}
      >
        <div className="context-menu-buttons-container message">
          {actionButtons}
          <button
            className="context-menu-button message"
            onClick={() => {
              onCopyIdHandler();
              onCloseContextMenuHandler();
            }}
          >
            <span>Copy Message ID</span>
          </button>
        </div>
      </ContextMenu>
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
    console.log(editedMarkerRef);
    console.log(editedMarkerRef.current);

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
    //note: should make this be compatible with the database retrieval
    console.log(message.user.image_url);
    console.log(message.image_url);
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
          componentClass="message"
        />
      );
      senderText = (
        <>
          <p className={`sender-text `}>
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
        <div
          className={`messageContainer justifyStart ${messageContainerClass}`}
          onMouseEnter={onMouseEnterMessageContainerHandler}
          onMouseLeave={onMouseLeaveMessageContainerHandler}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowContextMenu(true);
            setClientX(e.clientX);
            setClientY(e.clientY);
          }}
        >
          {renderMessageTimestamp()}
          {senderImage}
          <div className={`message-text-container `}>
            {senderText}
            {renderMessageText(isTextOnly)}
          </div>
        </div>
        {renderContextMenu()}
        {renderDeleteMessageModal()}
      </>
    );
  };

  return renderMessage();
};

export default Message;
