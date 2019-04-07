import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api/socket';

const defaultValue = {
  socketStatus: 'loading',
  responseStatus: null,
  steamid: null,
};

const StatusContext = createContext(defaultValue);

const StatusContextProvider = ({ children }) => {
  const [status, setStatus] = useState(defaultValue);

  useEffect(() => {
    const subscription = api.addListener('status', ({ socketStatus, responseStatus, steamid }) => {
      setStatus(status => ({
        socketStatus: socketStatus || status.socketStatus,
        responseStatus: responseStatus || status.responseStatus,
        steamid: steamid || status.steamid,
      }));
    });

    return () => subscription.remove();
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
