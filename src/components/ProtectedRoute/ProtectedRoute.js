import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Preloader from '../Preloader/Preloader';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    //чтобы избавиться от белого фона во время первого запуска
    props.loggedIn !== null &&
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route> || <Preloader />
  )
}

export default ProtectedRoute;