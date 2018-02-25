import React from 'react';
import Bot from './Bot';

export default class MainList extends React.Component {
    render() {
        let bots = this.props.codes.map((bot, i) => <Bot time={this.props.time} key={i} bot={bot}/>);
        return <main className="container main main--codes">{bots}</main>;
    }
}