import React from 'react';
import io from 'socket.io-client';
import MainList from "./MainList";
import MainLogin from "./MainLogin";
import MainLogged from "./MainLogged";
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const socketUrl = 'http://localhost:3005';

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleSocket();
    }

    startTimeInterval() {
        clearInterval(this.intervalHandle);
        this.intervalHandle = setInterval(() => {
            this.setState({time: this.state.time - 1});
        }, 1000);
    }

    handleSocket() {
        let socket = io(socketUrl);
        socket.on('logged', data => {
            this.setState({state: 'logged', authData: data.authData, user: data.user, time: 30});
            this.startTimeInterval();
        });
        socket.on('not logged', () => {
            this.setState({state: 'not logged'});
        });
        socket.on('auth codes', authData => {
            this.setState({authData, time: 30});
            this.startTimeInterval();
        });
    }

    render() {
        if (!this.state.state) return <Header/>;

        let main = <MainLogged user={this.state.user}/>;
        if (this.state.state === 'not logged') main = <MainLogin/>;
        else if (this.state.authData) main = <MainList time={this.state.time} authData={this.state.authData}/>;

        return (
            <div>
                <Header/> {main} <Footer user={this.state.user}/>
            </div>
        )
    }
}