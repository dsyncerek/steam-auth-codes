import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { socketStatus } from './api/enums';
import api from './api/socket';
import Accounts from './components/Accounts/Accounts';
import ContentWrapper from './components/ContentWrapper/ContentWrapper';
import Layout from './components/Layout/Layout';
import StatusContext from './context/StatusContext';
import { GlobalStyled } from './styles/global';
import { theme } from './styles/variables';

class App extends Component {
  state = {
    accounts: [],
    status: {
      socketState: socketStatus.loading,
      statusCode: '',
      username: '',
    },
  };

  componentDidMount() {
    this.handleSocket();
  }

  handleSocket() {
    api.addListener('accounts', ({ accounts }) => {
      this.setState({ accounts });
    });

    api.addListener('status', ({ socketState, statusCode, username }) => {
      this.setState({ status: { socketState, statusCode, username } });
    });
  }

  render() {
    return (
      <StatusContext.Provider value={this.state.status}>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyled/>
            <Layout>
              <ContentWrapper>
                <Accounts accounts={this.state.accounts}/>
              </ContentWrapper>
            </Layout>
          </>
        </ThemeProvider>
      </StatusContext.Provider>
    );
  }
}

export default App;
