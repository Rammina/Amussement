import React from "react";
import ContextMenu from "../../../UIComponents/ContextMenu/ContextMenu";

const MessageContextMenu = (props) => {
  let actionButtons = null;

  if (props.isSentByCurrentUser) {
    actionButtons = (
      <>
        <button
          className="context-menu-button message"
          onClick={props.editMessageOnClick}
        >
          <span>Edit Message</span>
        </button>
        <button
          className="context-menu-button message danger"
          onClick={props.deleteMessageOnClick}
        >
          <span>Delete Message</span>
        </button>
      </>
    );
  }
  return (
    <ContextMenu
      componentClass="message"
      clientX={props.clientX}
      clientY={props.clientY}
      onClose={props.onClose}
    >
      <div className="context-menu-buttons-container message">
        {actionButtons}
        <button
          className="context-menu-button message"
          onClick={props.copyIdOnClick}
        >
          <span>Copy Message ID</span>
        </button>
      </div>
    </ContextMenu>
  );
};

export default MessageContextMenu;
