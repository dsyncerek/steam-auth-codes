import React from 'react';

export class Footer extends React.Component {
    render() {
        let {logged} = this.props;
        return (
            <footer className="container footer">
                <a className="link" href="https://github.com/dsyncerek/steam-authcodes">GitHub</a>
                {logged && <a className="link" href="/logout">Logout</a>}
            </footer>
        )
    }
}