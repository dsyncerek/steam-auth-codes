import React, { useEffect, useState } from 'react';
import Accounts from './components/Accounts/Accounts';
import Layout from './components/Layout/Layout';
import Message from './components/Message/Message';
import useSocket from './hooks/useSocket';

const App = () => {
  const [socket, socketState] = useSocket('/');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    socket.emit('accounts');
    socket.on('accounts', accounts => setAccounts(accounts));
  }, [socket]);

  return (
    <Layout>
      {socketState === 'loading' && <Message>Loading...</Message>}
      {socketState === 'error' && <Message>Can't connect to the server!</Message>}
      {socketState === 'connected' && <Accounts accounts={accounts} />}
    </Layout>
  );
};

export default App;
