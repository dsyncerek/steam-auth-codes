import React from 'react';

export default class Bot extends React.Component {
    render() {
        let {bot, time} = this.props;
        return (
            <div className={`bot bot--${time <= 5 ? 'red' : 'normal'}`}>
                <span className="bot__code">{bot.code}</span>
                <div style={{width: `${time * 100 / 30}%`}} className="bot__bar" key="bot.code"/>
                <span className="bot__name">{bot.username}</span>
            </div>
        )
    }
}