import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import List from "./containers/List";
import Login from "./containers/Login";
import Forbidden from "./containers/Forbidden";
import Header from './components/Header';
import Footer from './components/Footer';
import './styles.css';

const socketUrl = 'http://localhost:3005';

class App extends React.Component {
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
        socket.on('authorized', authData => {
            this.setState({state: 'authorized', authData, time: 30});
            this.startTimeInterval();
        });
        socket.on('forbidden', user => {
            this.setState({state: 'forbidden', user});
        });
        socket.on('unauthorized', () => {
            this.setState({state: 'unauthorized'});
        });
        socket.on('auth codes', authData => {
            this.setState({authData, time: 30});
            this.startTimeInterval();
        });
    }

    render() {
        if (!this.state.state) return <Header/>;

        let main = <Login/>;
        if (this.state.state === 'forbidden') main = <Forbidden user={this.state.user}/>;
        else if (this.state.state === 'authorized') main = <List time={this.state.time} authData={this.state.authData}/>;

        return (
            <React.Fragment>
                <Header/>
                <React.Fragment>{main}</React.Fragment>
                <Footer user={this.state.user}/>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));