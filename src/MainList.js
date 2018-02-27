import React from 'react';
import Box from './Box';

export default class MainList extends React.Component {
    render() {
        let boxes = this.props.authData.map((item, i) => <Box time={this.props.time} key={i} item={item}/>);
        return <main className="container main main--codes">{boxes}</main>;
    }
}