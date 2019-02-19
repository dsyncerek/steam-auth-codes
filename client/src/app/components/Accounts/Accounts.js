import PropTypes from 'prop-types';
import React from 'react';
import Account from '../Account/Account';
import { AccountsStyled } from './Accounts.styled';

const Accounts = ({ accounts = [] }) => (
  <AccountsStyled>
    {accounts.map(account => (
      <Account
        key={account.username}
        {...account}
      />
    ))}
  </AccountsStyled>
);

Accounts.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
};

export default Accounts;
