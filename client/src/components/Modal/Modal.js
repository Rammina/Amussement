import "./Modal.scss";

import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import BackButton from "../buttons/BackButton";
import CloseButton from "../buttons/CloseButton";
import ModalHeader from "./ModalHeader/ModalHeader";
import ModalFooter from "./ModalFooter/ModalFooter";

// import { ModalContext } from "../AppContext";

const Modal = (props) => {
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {}, []);

  const getModalOpenClass = () => {
    return modalOpen ? "show" : "hide";
  };

  const getClassName = () => (props.componentClass ? props.componentClass : "");
  const getButtonId = () => (props.buttonId ? props.buttonId : "");
  const getImageId = () => (props.imageId ? props.imageId : "");
  const getIsSlideUpClass = () => (props.isSlideUp ? "slide-up" : "");
  const getHideOnDesktopClass = () =>
    props.hideOnDesktop ? "hide-on-desktop" : "";

  // render functions
  const renderButtonLabel = () =>
    props.buttonLabel ? props.buttonLabel : null;
  const renderModalHeader = () => {
    if (props.noHeader) return null;
    return (
      <ModalHeader
        componentClass={`${getClassName()}`}
        headerClassName={props.headerClassName}
        onModalClose={props.onModalClose}
        headingText={props.headingText || null}
      />
    );
  };
  const renderModalFooter = () => {
    if (props.noFooter) return null;
    return (
      <ModalFooter
        componentClass={`${getClassName()}`}
        footerClassName={props.footerClassName}
        onModalClose={props.onModalClose}
      />
    );
  };

  return (
    <React.Fragment>
      <div
        className={`backdrop ${getModalOpenClass()} ${getClassName()}`}
        onClick={() => {
          props.onModalClose();
        }}
      ></div>
      <div
        className={`modal ${getModalOpenClass()} ${getClassName()} ${getIsSlideUpClass()}`}
        style={props.modalStyle || {}}
      >
        {renderModalHeader()}
        {props.children}
        {renderModalFooter()}
      </div>{" "}
    </React.Fragment>
  );
};
export default Modal;
