import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import socketStates from '../../api/socketStates';
import statusCodes from '../../api/statusCodes';
import StatusContext from '../../context/StatusContext';
import LoginButton from '../LoginButton/LoginButton';
import Message from '../Message/Message';

const LoginWrapper = ({ children }) => {
  const { socketState, statusCode } = useContext(StatusContext);
  const loading = socketState === socketStates.loading || (socketState === socketStates.connected && !statusCode);
  const error = socketState === socketStates.error;
  const loginRequired = statusCode === statusCodes.unauthorized;
  const permissionRequired = statusCode === statusCodes.forbidden;

  if (loading) {
    return (
      <Message>
        Loading...
      </Message>
    );
  }

  if (error) {
    return (
      <Message>
        Can't connect to the server!
      </Message>
    );
  }

  if (permissionRequired) {
    return (
      <Message>
        You don't have permission!
      </Message>
    );
  }

  if (loginRequired) {
    return (
      <LoginButton/>
    );
  }

  return children;
};

LoginWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginWrapper;
