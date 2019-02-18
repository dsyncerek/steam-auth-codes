import React, { Component } from 'react';
import socketApi from './api/socket';
import Layout from './components/Layout/Layout';
import Row from './components/Accounts/Accounts';
import LoginWrapper from './components/LoginWrapper/LoginWrapper';

class App extends Component {
  state = {
    socketState: 'loading',
  };

  componentDidMount() {
    this.handleSocket();
  }

  handleSocket() {
    socketApi.onAccountsChanged(({ accounts }) =>
      this.setState({ accounts }));

    socketApi.onSocketStateChanged(socketState =>
      this.setState({ socketState, statusCode: undefined }));

    socketApi.onInit(({ statusCode, username, accounts }) =>
      this.setState({ statusCode, username, accounts }));
  }

  render() {
    const { socketState, statusCode, accounts, username } = this.state;

    return (
      <Layout username={username}>
        <LoginWrapper socketState={socketState} statusCode={statusCode}>
          <Row accounts={accounts}/>
        </LoginWrapper>
      </Layout>
    );
  }
}

export default App;
