import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { fakeAuth } from '../components/Login';
// import ContainerComponent from './ContainerComponent';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (fakeAuth.isAuthenticated) {
        return <Component {...props} component={Component} />;
      }

      return (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location },
        }}
        />);
    }}
  />
);

export default PrivateRoute;
