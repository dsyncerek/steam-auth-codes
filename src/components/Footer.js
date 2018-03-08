import React from 'react';

export default class Footer extends React.Component {
    render() {
        let {user} = this.props;
        return (
            <footer className="container footer">
                <a className="link" href="https://github.com/dsyncerek/steam-authcodes">GitHub</a>
                {user && <a className="link" href="/logout">Logout</a>}
            </footer>
        )
    }
}