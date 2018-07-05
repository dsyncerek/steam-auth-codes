import React       from 'react';
import io          from 'socket.io-client';
import styled      from 'styled-components';
import Header      from './components/Header';
import Footer      from './components/Footer';
import Information from './components/Information';
import LoginButton from './components/LoginButton';
import AccountList from './components/AccountList';

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

    startTimeInterval() {
        clearInterval(this.intervalHandle);
        this.intervalHandle = setInterval(() => {
            this.setState({expire: this.state.expire - 1});
        }, 1000);
    }

    handleSocket() {
        io('localhost:3005/').on('connect', () => {
            this.setState({socketState: 'connected'});
        }).on('connect_error', () => {
            this.setState({socketState: 'errored'});
        }).on('disconnect', () => {
            this.setState({socketState: 'disconnected'});
        }).on('forbidden', () => {
            this.setState({userState: 'forbidden'});
        }).on('unauthorized', () => {
            this.setState({userState: 'unauthorized'});
        }).on('authorized', data => {
            this.setState({userState: 'authorized', accounts: data.accounts, expire: data.expire});
            this.startTimeInterval();
        }).on('auth codes', data => {
            this.setState({accounts: data.accounts, expire: data.expire});
            this.startTimeInterval();
        });
    }

    render() {
        let {socketState, userState} = this.state;
        let logged = ['forbidden', 'authorized'].includes(userState);

        return (
            <React.Fragment>
                <Header/>
                <Wrapper>
                    {socketState === 'loading' &&
                    <Information><p>Trwa nawiązywanie połączenia z serwerem.</p></Information>}
                    {socketState === 'disconnected' &&
                    <Information><p>Połączenie z serwerem zostało zakończone.</p></Information>}
                    {socketState === 'errored' &&
                    <Information><p>Nie udało się nawiązać połączenia z serwerem.</p></Information>}
                    {socketState === 'connected' && userState === undefined &&
                    <Information><p>Połączenie z serwerem zostało nawiązane.</p></Information>}
                    {socketState === 'connected' && userState === 'unauthorized' &&
                    <Information><LoginButton/></Information>}
                    {socketState === 'connected' && userState === 'forbidden' &&
                    <Information><p>Nie masz wystarczających uprawnień.</p></Information>}
                    {socketState === 'connected' && userState === 'authorized' &&
                    <AccountList expire={this.state.expire} accounts={this.state.accounts}/>}
                </Wrapper>
                <Footer logged={logged}/>
            </React.Fragment>
        );
    }
}