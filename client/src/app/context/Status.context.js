import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useSocket from '../hooks/useSocket';

const StatusContext = createContext({});

const StatusContextProvider = ({ children }) => {
  const { accounts } = useSocket('accounts');
  const { socketStatus } = useSocket('socket status');
  const { responseStatus, steamid } = useSocket('response status');

  return (
    <StatusContext.Provider
      value={{
        accounts,
        socketStatus,
        responseStatus,
        steamid,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

StatusContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StatusContext;
export { StatusContextProvider };
