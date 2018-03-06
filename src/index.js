import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import List from "./containers/List";
import Login from "./containers/Login";
import Unauthorized from "./containers/Unauthorized";
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

        let main = <Unauthorized user={this.state.user}/>;
        if (this.state.state === 'not logged') main = <Login/>;
        else if (this.state.authData) main = <List time={this.state.time} authData={this.state.authData}/>;

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