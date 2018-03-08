import React from 'react';

export default class Forbidden extends React.Component {
    render() {
        let {user} = this.props;
        return (
            <main className="container main main--logged">
                <p>Hello {user.personaname}!</p>
                <p>You do not have permission!</p>
            </main>
        )
    }
}