import React, { useContext } from 'react';
import Account from '../Account/Account';
import { AccountsStyled } from './Accounts.styled';
import StatusContext from '../../context/Status.context';

const Accounts = () => {
  const { accounts } = useContext(StatusContext);

  return (
    <AccountsStyled>
      {accounts && accounts.map(account => (
        <Account
          key={account.username}
          {...account}
        />
      ))}
    </AccountsStyled>
  );
};

export default Accounts;
