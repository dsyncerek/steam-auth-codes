import React from 'react';
import {Box} from '../components/Box';

export class List extends React.Component {
    render() {
        let {accounts, expire} = this.props;
        return (
            <main className="container main main--codes">
                {accounts.map((account, i) => <Box expire={expire} key={i} account={account}/>)}
            </main>
        );
    }
}