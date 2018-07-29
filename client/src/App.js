import React       from 'react';
import styled      from 'styled-components';
import Header      from './components/Header';
import Footer      from './components/Footer';
import Information from './components/Information';
import LoginButton from './components/LoginButton';
import AccountList from './components/AccountList';
import socketApi   from './api/socket';

const Wrapper = styled.main`
    background: #eee;
    padding: 100px 0;
`;

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {socketState: 'loading'};
    }

    componentDidMount() {
        this.handleSocket();
    }

    handleSocket() {
        socketApi.socketStateChanged(state => this.setState({socketState: state}));
        socketApi.userStateChanged(state => this.setState({userState: state}));
        socketApi.authCodesChanged(data => this.setState({accounts: data.accounts, expire: data.expire}));
    }

    render() {
        let {socketState, userState, expire, accounts} = this.state;
        let logged = ['forbidden', 'authorized'].includes(userState);

        return (
            <React.Fragment>
                <Header/>
                <Wrapper>
                    {socketState === 'loading' &&
                    <Information><p>socket: loading</p></Information>}
                    {socketState === 'disconnected' &&
                    <Information><p>socket: disconnected</p></Information>}
                    {socketState === 'errored' &&
                    <Information><p>socket: errored</p></Information>}
                    {socketState === 'connected' && userState === undefined &&
                    <Information><p>socket: connected</p></Information>}
                    {socketState === 'connected' && userState === 'unauthorized' &&
                    <Information><LoginButton/></Information>}
                    {socketState === 'connected' && userState === 'forbidden' &&
                    <Information><p>user: forbidden</p></Information>}
                    {socketState === 'connected' && userState === 'authorized' && !accounts &&
                    <Information><p> user: authorized</p></Information>}
                    {socketState === 'connected' && userState === 'authorized' && accounts &&
                    <AccountList expire={expire} accounts={accounts}/>}
                </Wrapper>
                <Footer logged={logged}/>
            </React.Fragment>
        );
    }
}