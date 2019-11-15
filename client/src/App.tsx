import React, { FC, useEffect, useState } from 'react';
import AccountList from './components/AccountList/AccountList';
import Layout from './components/Layout/Layout';
import Message from './components/Message/Message';
import useSocket from './hooks/useSocket';
import SteamAccount from './models/SteamAccount';

const App: FC = () => {
  const [socket, socketState] = useSocket('/');
  const [accounts, setAccounts] = useState<SteamAccount[]>([]);

  useEffect(() => {
    socket.emit('accounts');
    socket.on('accounts', (accounts: SteamAccount[]) => setAccounts(accounts));
  }, [socket]);

  return (
    <Layout>
      {socketState === 'loading' && <Message>Loading...</Message>}
      {socketState === 'error' && <Message>Can't connect to the server!</Message>}
      {socketState === 'connected' && <AccountList accounts={accounts} />}
    </Layout>
  );
};

export default App;
