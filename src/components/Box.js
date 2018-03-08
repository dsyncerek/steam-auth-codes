import React from 'react';

export default class Box extends React.Component {
    render() {
        let {item, time} = this.props;
        return (
            <div className={`box box--${time <= 5 ? 'red' : 'normal'}`}>
                <span className="box__code">{item.authCode}</span>
                <div style={{width: `${time * 100 / 30}%`}} className="box__bar"/>
                <span className="box__name">{item.username}</span>
            </div>
        )
    }
}