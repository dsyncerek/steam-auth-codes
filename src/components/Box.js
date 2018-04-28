import React from 'react';

export default class Box extends React.Component {
    render() {
        let {account, expire} = this.props;
        return (
            <div className={`box box--${expire <= 5 ? 'red' : 'normal'}`}>
                <span className="box__code">{account.authCode}</span>
                <div style={{width: `${expire * 100 / 30}%`}} className="box__bar"/>
                <span className="box__name">{account.username}</span>
            </div>
        )
    }
}