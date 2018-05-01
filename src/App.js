import React from 'react';
import io from 'socket.io-client';
import {Header} from './components/Header';
import {Forbidden} from './containers/Forbidden';
import {List} from './containers/List';
import {Login} from './containers/Login';
import {Footer} from './components/Footer';

const socketUrl = 'http://codes.loscsgo.com:3005/';

export class App extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.handleSocket();
    }

    startTimeInterval() {
        clearInterval(this.intervalHandle);

        this.intervalHandle = setInterval(() => {
            this.setState({expire: this.state.expire - 1});
        }, 1000);
    }

    handleSocket() {
        let socket = io(socketUrl);

        socket.on('authorized', data => {
            this.setState({state: 'authorized', accounts: data.accounts, expire: data.expire});
            this.startTimeInterval();
        });

        socket.on('forbidden', user => {
            this.setState({state: 'forbidden', user});
        });

        socket.on('unauthorized', () => {
            this.setState({state: 'unauthorized'});
        });

        socket.on('auth codes', data => {
            this.setState({accounts: data.accounts, expire: data.expire});
            this.startTimeInterval();
        });
    }

    render() {
        if (!this.state.state) return <Header/>;

        return (
            <React.Fragment>
                <Header/>
                <React.Fragment>
                    {this.state.state === 'forbidden' && <Forbidden user={this.state.user}/>}
                    {this.state.state === 'authorized' && <List expire={this.state.expire} accounts={this.state.accounts}/>}
                    {this.state.state === 'unauthorized' && <Login/>}
                </React.Fragment>
                <Footer logged={['forbidden', 'authorized'].includes(this.state.state)}/>
            </React.Fragment>
        );
    }

}