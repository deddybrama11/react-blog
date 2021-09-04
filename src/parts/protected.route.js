import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token") !== null) {
          console.log(localStorage.getItem("token"))
          return <Component {...props} />;
        } else {
          console.log("Return protected route !")
          return (
            <Redirect
              to={{
                pathname: "/admin",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
