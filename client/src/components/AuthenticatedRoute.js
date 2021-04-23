import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";

function AuthenticatedRoute(props) {
  const { children, ...rest } = props;
  const { pathname, search } = useLocation();
  return (
    <Route {...rest}>
      {props.isAuthenticated ? (
        children
      ) : (
        <Redirect to={`/auth/login?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, {})(AuthenticatedRoute);
