import React from 'react';

export default class Bot extends React.Component {
    render() {
        let {bot} = this.props;
        return (
            <div className="bot">
                <span className="bot__code">{bot.code}</span>
                <div className="bot__bar" key="bot.code"/>
                <span className="bot__name">{bot.username}</span>
            </div>
        )
    }
}