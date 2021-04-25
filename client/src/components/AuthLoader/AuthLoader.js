import "./AuthLoader.scss";

import React from "react";
import { connect } from "react-redux";

import LoadingSpinner from "../loaders/LoadingSpinner";

const AuthLoader = (props) => {
  const renderLoader = () => {
    return <LoadingSpinner className="auth-loader" showLoader={true} />;
  };

  return (
    <div id="auth-loader-outer-container" className={``}>
      <div id={`auth-loader-inner-container`}>
        {renderLoader()}
        <span id="auth-loader-text"> Initializing</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  showLoader: state.loader.showAuthLoader,
});

export default connect(mapStateToProps, {})(AuthLoader);
