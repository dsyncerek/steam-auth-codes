import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import socketApi from './api/socket';
import Layout from './components/Layout/Layout';
import Accounts from './components/Accounts/Accounts';
import LoginWrapper from './components/LoginWrapper/LoginWrapper';
import StatusContext from './context/StatusContext';
import { theme } from './styles/variables';
import GlobalStyles from './styles/global';

class App extends Component {
  state = {
    accounts: [],
    status: {
      socketState: 'loading',
      statusCode: '',
      username: '',
    },
  };

  componentDidMount() {
    this.handleSocket();
  }

  handleSocket() {
    socketApi.onAccountsChanged(({ accounts }) => {
      this.setState({
        accounts,
      });
    });

    socketApi.onSocketStateChanged(socketState => {
      this.setState({
        status: {
          ...this.state.status,
          socketState,
          statusCode: undefined,
        },
      });
    });

    socketApi.onInit(({ statusCode, username, accounts }) => {
      this.setState({
        accounts,
        status: {
          ...this.state.status,
          statusCode,
          username,
        },
      });
    });
  }

  render() {
    return (
      <StatusContext.Provider value={this.state.status}>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyles/>
            <Layout>
              <LoginWrapper>
                <Accounts accounts={this.state.accounts}/>
              </LoginWrapper>
            </Layout>
          </>
        </ThemeProvider>
      </StatusContext.Provider>
    );
  }
}

export default App;
