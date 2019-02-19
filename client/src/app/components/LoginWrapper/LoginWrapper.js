import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { responseStatus, socketStatus } from '../../api/enums';
import StatusContext from '../../context/StatusContext';
import LoginButton from '../LoginButton/LoginButton';
import Message from '../Message/Message';

const LoginWrapper = ({ children }) => {
  const { socketState, statusCode } = useContext(StatusContext);
  const loading = socketState === socketStatus.loading || (socketState === socketStatus.connected && !statusCode);
  const error = socketState === socketStatus.error;
  const loginRequired = statusCode === responseStatus.unauthorized;
  const permissionRequired = statusCode === responseStatus.forbidden;

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
