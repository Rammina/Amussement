import "./EditMessage.scss";

import React, { useState, useEffect, useContext, useRef } from "react";

import { connect } from "react-redux";
import { ChatContext } from "../../../AppContext";

const EditMessage = (props) => {
  const [messageText, setMessageText] = useState("");
  const { editMessage } = useContext(ChatContext);

  const textareaRef = useRef(null);

  useEffect(() => {
    setMessageText(props.message.text);
    /*return () => {}*/
    // only do this if the textarea exists
    if (textareaRef && textareaRef.current) {
      // Moving cursor to the end
      textareaRef.current.selectionStart = textareaRef.current.value.length;
      textareaRef.current.selectionEnd = textareaRef.current.value.length;
    }
  }, []);

  const editSubmitHandler = (e) => {
    if (e.target.value && e.target.value !== "") {
      editMessage(props.message._id, e.target.value);
    } else {
      props.openDeleteMessageModal();
    }
    props.onClose();
  };

  return (
    <div className={`messageBox`}>
      <textarea
        className={`message-text edit-mode colorDark ${props.textOnlyClass} ${props.sameSenderClass}`}
        ref={textareaRef}
        value={messageText}
        autoFocus={true}
        onChange={({ target: { value } }) => {
          setMessageText(value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            editSubmitHandler(e);
          } else if (e.key === "Escape" || e.key === "Esc") {
            console.log("escape key was pressed");
            e.preventDefault();
            props.onClose();
          }
        }}
      />
      <span
        className={`edit-message-instruction-message ${props.textOnlyClass} ${props.sameSenderClass}`}
      >
        Esc to cancel - Enter to save
      </span>
    </div>
  );
};

export default EditMessage;
