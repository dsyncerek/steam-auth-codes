import React, { FC } from 'react';
import SteamAccount from '../../models/steam-account';
import AccountDetails from '../AccountDetails/AccountDetails';
import { AccountsStyled } from './Accounts.styled';

type AccountListProps = {
  accounts: SteamAccount[];
}

const AccountList: FC<AccountListProps> = ({ accounts }) => (
  <AccountsStyled>
    {accounts && accounts.map(account => {
      return <AccountDetails key={account.username} account={account} />;
    })}
  </AccountsStyled>
);

export default AccountList;
