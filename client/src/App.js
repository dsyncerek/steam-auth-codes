import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Accounts from './components/Accounts/Accounts';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Message from './components/Message/Message';
import Section from './components/Section/Section';
import useSocket from './hooks/useSocket';
import { GlobalStyled } from './styles/global.styled';
import { theme } from './styles/variables.styled';

const App = () => {
  const [socket, socketState] = useSocket('/');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    socket.emit('accounts');
    socket.on('accounts', accounts => setAccounts(accounts));
  }, [socket]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyled />
        <>
          <Section as="div">
            <Header />
          </Section>
          <Section odd={true} as="main">
            {socketState === 'loading' && <Message>Loading...</Message>}
            {socketState === 'error' && <Message>Can't connect to the server!</Message>}
            {socketState === 'connected' && <Accounts accounts={accounts} />}
          </Section>
          <Section as="div">
            <Footer />
          </Section>
        </>
      </>
    </ThemeProvider>
  );
};

export default App;
