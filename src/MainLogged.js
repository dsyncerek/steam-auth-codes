import React from 'react';

export default class MainLogged extends React.Component {
    render() {
        return (
            <main className="container main main--logged">
                <p>Hello {this.props.user.personaname}!</p>
                <p>You do not have permission!</p>
            </main>
        )
    }
}