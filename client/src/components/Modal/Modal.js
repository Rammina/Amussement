import "./Modal.scss";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import BackButton from "../buttons/BackButton";
import CloseButton from "../buttons/CloseButton";
// should also import modal header component

const Modal = props => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {}, []);

  const getModalOpenClass = () => {
    return modalOpen ? "show" : "hide";
  };

  return ReactDOM.createPortal(
    <React.Fragment>
      <div
        className={`backdrop ${getModalOpenClass()} ${getComponentClass()}`}
        onClick={() => {
          setModalOpen(false);
        }}
      ></div>
      <div className={`modal ${getModalOpenClass()} ${getComponentClass()}`}>
        {
          /*should make headers and headings be recyclable*/
          <ModalHeader
            componentClass={`${getComponentClass}`}
            onCloseHandler={() => {}}
            headingText={props.headingText || null}
          />
        }

        <header className="user-settings-sidebar-header user-avatar">
          <div className="modal-heading-container modal-header-content-container">
            <BackButton
              componentClass="user-avatar"
              hideOnDesktop={true}
              onClickHandler={() => {
                setImageUploadModalOpen(false);
              }}
            />
            <h3 className="user-avatar modal-heading modal-header-heading">
              Upload Avatar
            </h3>
            <CloseButton
              componentClass="user-avatar"
              hideOnMobile={true}
              onClickHandler={() => {
                setImageUploadModalOpen(false);
              }}
            />
          </div>
        </header>
        {/*should also make modal content reusable*/}
        {renderModalContent()}
      </div>{" "}
    </React.Fragment>,
    document.getElementById("modal")
  );
};
export default Modal;
