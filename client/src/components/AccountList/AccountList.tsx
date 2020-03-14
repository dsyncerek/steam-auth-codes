import React, { FC } from 'react';
import { SteamAccount } from '../../models/SteamAccount';
import { AccountDetails } from '../AccountDetails/AccountDetails';
import { AccountListStyled } from './AccountList.styled';

type AccountListProps = {
  accounts: SteamAccount[];
};

export const AccountList: FC<AccountListProps> = ({ accounts = [] }) => (
  <AccountListStyled>
    {accounts.map(account => (
      <AccountDetails key={account.username} account={account} />
    ))}
  </AccountListStyled>
);
