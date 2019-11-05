import PropTypes from 'prop-types';
import React from 'react';
import useDecrease from '../../hooks/useDecrease';
import useTimeDifference from '../../hooks/useTimeDifference';
import { AccountStyled, BarStyled, CodeStyled, UsernameStyled } from './Account.styled';

const codeDecreaseInterval = 1000;
const codeEndingTime = 5000;
const codeValidityTime = 30000;

const Account = ({ account }) => {
  const difference = useTimeDifference(account.generatedAt);
  const currentValidity = useDecrease(account.validity - difference, codeDecreaseInterval);

  const barWidth = (currentValidity * 100) / codeValidityTime;
  const isEnding = currentValidity <= codeEndingTime;

  return (
    <AccountStyled isEnding={isEnding}>
      <CodeStyled>{account.authCode}</CodeStyled>
      <BarStyled style={{ width: `${barWidth}%` }} />
      <UsernameStyled>{account.username}</UsernameStyled>
    </AccountStyled>
  );
};

Account.propTypes = {
  account: PropTypes.shape({
    authCode: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    validity: PropTypes.number.isRequired,
    generatedAt: PropTypes.number.isRequired,
  }).isRequired,
};

export default Account;
