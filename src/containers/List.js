import React from 'react';
import Box from '../components/Box';

export default class MainList extends React.Component {
    render() {
        let {authData, time} = this.props;
        return (
            <main className="container main main--codes">
                {authData.map((item, i) => <Box time={time} key={i} item={item}/>)}
            </main>
        );
    }
}