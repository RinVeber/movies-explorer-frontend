import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Preloader from '../Preloader/Preloader';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    props.loggedIn !== null &&
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route> || <Preloader />
  )
}

export default ProtectedRoute;