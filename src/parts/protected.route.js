import React from "react";
import { Route, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token") !== null) {
          return <Component {...props} />;
        } else {
          return (
            // <Navigate
            //   to={{
            //     pathname: "/admin",
            //     state: {
            //       from: props.location,
            //     },
            //   }}
            // />
            <></>
          );
        }
      }}
    />
  );
};
