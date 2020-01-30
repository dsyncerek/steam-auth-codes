import React, { FC, useEffect, useState } from 'react';
import AccountList from './components/AccountList/AccountList';
import Layout from './components/Layout/Layout';
import Message from './components/Message/Message';
import useSocket from './hooks/useSocket';
import { SocketStateEnum } from './models/SocketStateEnum';
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
      {socketState === SocketStateEnum.Loading && <Message>Loading...</Message>}
      {socketState === SocketStateEnum.Error && <Message>Can't connect to the server!</Message>}
      {socketState === SocketStateEnum.Connected && accounts.length && <AccountList accounts={accounts} />}
      {socketState === SocketStateEnum.Connected && !accounts.length && <Message>No accounts found!</Message>}
    </Layout>
  );
};

export default App;
