import React, { FC, useEffect, useState } from 'react';
import { AccountList } from './components/AccountList/AccountList';
import { Layout } from './components/Layout/Layout';
import { Message } from './components/Message/Message';
import { useSocket } from './hooks/useSocket';
import { SocketStateEnum } from './models/SocketStateEnum';
import { SteamAccount } from './models/SteamAccount';

export const App: FC = () => {
  const [socket, socketState] = useSocket('/');
  const [accounts, setAccounts] = useState<SteamAccount[]>();

  useEffect(() => {
    socket.emit('accounts');
    socket.on('accounts', (accounts: SteamAccount[]) => setAccounts(accounts));
  }, [socket]);

  const renderContent = () => {
    if (socketState === SocketStateEnum.Loading || !accounts) {
      return <Message>Loading...</Message>;
    }
    if (socketState === SocketStateEnum.Error) {
      return <Message>Can't connect to the server!</Message>;
    }
    if (socketState === SocketStateEnum.Connected && accounts.length === 0) {
      return <Message>No accounts found!</Message>;
    }
    if (socketState === SocketStateEnum.Connected && accounts.length > 0) {
      return <AccountList accounts={accounts} />;
    }
  };

  return <Layout>{renderContent()}</Layout>;
};
