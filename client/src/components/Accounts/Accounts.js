import PropTypes from 'prop-types';
import React from 'react';
import Account from '../Account/Account';
import { AccountsStyled } from './Accounts.styled';

const Accounts = ({ accounts }) => (
  <AccountsStyled>
    {accounts && accounts.map(account => <Account key={account.username} account={account} />)}
  </AccountsStyled>
);

Accounts.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      authCode: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      validity: PropTypes.number.isRequired,
      generatedAt: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Accounts;
