import React from 'react';
import io from 'socket.io-client';
import MainList from "./MainList";
import MainLogin from "./MainLogin";
import MainLogged from "./MainLogged";
import Header from './Header';
import Footer from './Footer';

const socketUrl = 'http://localhost:3005';

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleSocket();
    }

    handleSocket() {
        let socket = io(socketUrl);
        socket.on('logged', data => {
            this.setState({state: 'logged', codes: data.codes, user: data.user});
        });
        socket.on('not logged', () => {
            this.setState({state: 'not logged'});
        });
        socket.on('codes', codes => {
            this.setState({codes});
        });
    }

    render() {
        if (!this.state.state) return <Header/>;

        let main = <MainLogged user={this.state.user}/>;
        if (this.state.state === 'not logged') main = <MainLogin/>;
        else if (this.state.codes) main = <MainList codes={this.state.codes}/>;

        return (
            <div>
                <Header/>
                {main}
                <Footer user={this.state.user}/>
            </div>
        )
    }
}