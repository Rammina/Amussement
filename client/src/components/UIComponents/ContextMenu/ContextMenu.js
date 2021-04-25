import "./ContextMenu.scss";

import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";

const ContextMenu = (props) => {
  // const [modalOpen, setContextMenuOpen] = useState(true);
  const [menuLeft, setMenuLeft] = useState(-200);
  const [menuTop, setMenuTop] = useState(-200);
  let contextMenuDiv = useRef(null);

  let clickCoordsX;
  let clickCoordsY;

  // updated positionMenu function
  const positionMenu = () => {
    const menu = contextMenuDiv.current;
    if (menu === null) return null;
    clickCoordsX = props.clientX;
    clickCoordsY = props.clientY;

    let menuWidth = menu.offsetWidth + 10;
    let menuHeight = menu.offsetHeight + 10;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    if (windowWidth - clickCoordsX < menuWidth) {
      setMenuLeft(windowWidth - menuWidth);
    } else {
      setMenuLeft(clickCoordsX);
    }

    if (windowHeight - clickCoordsY < menuHeight) {
      setMenuTop(windowHeight - menuHeight);
    } else {
      setMenuTop(clickCoordsY);
    }
  };

  const handleClick = function (e) {
    console.log(e.target);
    if (contextMenuDiv && !contextMenuDiv.current.contains(e.target)) {
      console.log("clicking outside ContextMenu");
      props.onClose();
    }
  };

  const handleResize = () => {
    props.onClose();
  };

  useEffect(() => {
    contextMenuDiv.current.focus();
    document.body.addEventListener("click", handleClick);
    document.body.addEventListener("contextmenu", handleClick);
    window.addEventListener("resize", handleResize);
    // clean up function
    return () => {
      document.body.removeEventListener("click", handleClick);
      document.body.removeEventListener("contextmenu", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (contextMenuDiv.current === null) return null;
    positionMenu();
    /*return () => {}*/
  }, [contextMenuDiv.current]);

  const content = (
    <div className={`context-menu-window-container ${props.componentClass}`}>
      <div
        className={`context-menu-outer-container ${props.componentClass}`}
        style={{
          left: `${menuLeft || 0}px`,
          top: `${menuTop || 0}px`,
        }}
        tabIndex="0"
        ref={contextMenuDiv}
        autoFocus={true}
      >
        <div className={`context-menu-inner-container ${props.componentClass}`}>
          {props.children}
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("context-menu")
  );
};
export default ContextMenu;
