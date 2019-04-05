import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api/socket';

const defaultValue = {
  socketStatus: 'loading',
  responseStatus: '',
};

const StatusContext = createContext(defaultValue);

const StatusContextProvider = ({ children }) => {
  const [status, setStatus] = useState(defaultValue);

  useEffect(() => {
    api.addListener('status', ({ socketStatus, responseStatus }) => {
      setStatus(status => ({
        socketStatus: socketStatus || status.socketStatus,
        responseStatus: responseStatus || status.responseStatus,
      }));
    });
  }, []);

  return (
    <StatusContext.Provider value={status}>
      {children}
    </StatusContext.Provider>
  );
};

StatusContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StatusContext;
export { StatusContextProvider };
