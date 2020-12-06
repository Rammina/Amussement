import "./Modal.scss";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import BackButton from "../buttons/BackButton";
import CloseButton from "../buttons/CloseButton";
import ModalHeader from "./ModalHeader/ModalHeader";

const Modal = props => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {}, []);

  const getModalOpenClass = () => {
    return modalOpen ? "show" : "hide";
  };

  const getClassName = () => (props.componentClass ? props.componentClass : "");
  const getButtonId = () => (props.buttonId ? props.buttonId : "");
  const getImageId = () => (props.imageId ? props.imageId : "");
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
        onModalClose={() => {
          props.onModalClose();
        }}
        headingText={props.headingText || null}
      />
    );
  };
  const renderModalContent = () => {
    if (!props.modalContent) return null;
    return props.modalContent;
  };

  return (
    <React.Fragment>
      <div
        className={`backdrop ${getModalOpenClass()} ${getClassName()}`}
        onClick={() => {
          setModalOpen(false);
        }}
      ></div>
      <div className={`modal ${getModalOpenClass()} ${getClassName()}`}>
        /*should make headers and headings be recyclable*/
        {renderModalHeader()}
        {renderModalContent()}
      </div>{" "}
    </React.Fragment>
  );
};
export default Modal;
