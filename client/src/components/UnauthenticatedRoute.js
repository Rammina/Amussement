import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";

function UnauthenticatedRoute(props) {
  const { children, ...rest } = props;
  const { search } = useLocation();

  const { redirect } = queryString.parse(search);
  console.log(redirect);
  return (
    <Route {...rest}>
      {!props.isAuthenticated ? (
        children
      ) : (
        <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
      )}
    </Route>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, {})(UnauthenticatedRoute);
