import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import api from './api/socket';
import Accounts from './components/Accounts/Accounts';
import Layout from './components/Layout/Layout';
import { StatusContextProvider } from './context/StatusContext';
import { GlobalStyled } from './styles/global';
import { theme } from './styles/variables';

class App extends Component {
  state = { accounts: [] };

  componentDidMount() {
    api.addListener('new accounts', ({ accounts }) => {
      this.setState({ accounts });
    });
  }

  render() {
    return (
      <StatusContextProvider>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyled />
            <Layout>
              <Accounts accounts={this.state.accounts} />
            </Layout>
          </>
        </ThemeProvider>
      </StatusContextProvider>
    );
  }
}

export default App;
