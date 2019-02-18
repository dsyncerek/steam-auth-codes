import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CODE_DECREASE_INTERVAL, CODE_ENDING_TIME, CODE_VALIDITY_TIME } from '../../../config';
import { AccountStyled, BarStyled, CodeStyled, UsernameStyled } from './Account.styled';

class Account extends Component {
  state = {};

  componentDidMount() {
    this.startTimeInterval();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.code !== this.props.code) {
      this.startTimeInterval();
    }
  }

  componentWillUnmount() {
    this.stopTimeInterval();
  }

  static getDerivedStateFromProps(props, state) {
    return props.code !== state.code ? { ...props } : null;
  }

  startTimeInterval() {
    this.stopTimeInterval();

    this.intervalHandle = setInterval(() => {
      const validity = this.state.validity - CODE_DECREASE_INTERVAL;
      this.setState({ validity });
    }, CODE_DECREASE_INTERVAL);
  }

  stopTimeInterval() {
    clearInterval(this.intervalHandle);
  }

  render() {
    const { code, username, validity } = this.state;
    const barWidth = validity * 100 / CODE_VALIDITY_TIME;
    const isEnding = validity <= CODE_ENDING_TIME;

    return (
      <AccountStyled isEnding={isEnding}>
        <CodeStyled>
          {code}
        </CodeStyled>
        <BarStyled style={{ width: `${barWidth}%` }}/>
        <UsernameStyled>
          {username}
        </UsernameStyled>
      </AccountStyled>
    );
  }
}

Account.propTypes = {
  code: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  validity: PropTypes.number.isRequired,
};

export default Account;
