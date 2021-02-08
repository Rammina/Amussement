import "./ContextMenu.scss";

import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";

const ContextMenu = (props) => {
  // const [modalOpen, setContextMenuOpen] = useState(true);

  let contextMenuDiv = useRef(null);

  const handleClick = function (e) {
    console.log(e.target);
    if (contextMenuDiv && !contextMenuDiv.current.contains(e.target)) {
      console.log("clicking outside ContextMenu");
      props.onClose();
    }
  };

  useEffect(() => {
    contextMenuDiv.current.focus();
    document.body.addEventListener("click", handleClick);
    document.body.addEventListener("contextmenu", handleClick);

    // clean up function
    return () => {
      document.body.removeEventListener("click", handleClick);
      document.body.removeEventListener("contextmenu", handleClick);
    };
  }, []);

  const content = (
    <div
      className={`context-menu-outer-container ${props.componentClass}`}
      style={{
        left: `${props.clientX || 0}px`,
        top: `${props.clientY || 0}px`,
      }}
      tabIndex="0"
      ref={contextMenuDiv}
      autoFocus={true}
    >
      <div className={`context-menu-inner-container ${props.componentClass}`}>
        {props.children}
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("context-menu")
  );
};
export default ContextMenu;
