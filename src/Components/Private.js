import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Private = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      return (
        rest.authedUser ? <Component {...props} /> : <Redirect to={{pathname: '/', state: { from: props.location }}} />
      )
    }
    } />
  );
}

export default withRouter(connect(({ authedUser }) => ({authedUser}))(Private));