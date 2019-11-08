import React, { FC } from 'react';
import useDecrease from '../../hooks/useDecrease';
import useTimeDifference from '../../hooks/useTimeDifference';
import SteamAccount from '../../models/steam-account';
import { AccountStyled, BarStyled, CodeStyled, UsernameStyled } from './Account.styled';

const codeDecreaseInterval = 1000;
const codeEndingTime = 5000;
const codeValidityTime = 30000;

type AccountDetailsProps = {
  account: SteamAccount;
}

const AccountDetails: FC<AccountDetailsProps> = ({ account }) => {
  const difference = useTimeDifference(account.generatedAt);
  const currentValidity = useDecrease(account.validity - difference, codeDecreaseInterval);

  const barWidth = (currentValidity * 100) / codeValidityTime;
  const isEnding = currentValidity <= codeEndingTime;

  return (
    <AccountStyled isEnding={isEnding}>
      <CodeStyled>
        {account.authCode}
      </CodeStyled>
      <BarStyled style={{ width: `${barWidth}%` }} />
      <UsernameStyled>
        {account.username}
      </UsernameStyled>
    </AccountStyled>
  );
};

export default AccountDetails;
