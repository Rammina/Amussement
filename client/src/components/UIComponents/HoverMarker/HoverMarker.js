import "./HoverMarker.scss";

import React, { useState } from "react";

const HoverMarker = (props) => {
  return (
    <div
      className={`hover-marker-container ${!props.isShown ? "show" : "hide"}`}
      style={props.customStyle || null}
    >
      {props.textContent}
    </div>
  );
};

export default HoverMarker;
