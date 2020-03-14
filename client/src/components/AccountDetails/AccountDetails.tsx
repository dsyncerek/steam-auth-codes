import React, { FC } from 'react';
import { useAuthCodeValidity } from '../../hooks/useAuthCodeValidity';
import { SteamAccount } from '../../models/SteamAccount';
import { AccountDetailsStyled, BarStyled, CodeStyled, UsernameStyled } from './AccountDetails.styled';

const codeDecreaseInterval = 1000;
const codeEndingTime = 5000;
const codeValidityTime = 30000;

type AccountDetailsProps = {
  account: SteamAccount;
};

export const AccountDetails: FC<AccountDetailsProps> = ({ account: { username, authCode } }) => {
  const currentValidity = useAuthCodeValidity(authCode, codeDecreaseInterval);

  const barWidth = (currentValidity * 100) / codeValidityTime;
  const isEnding = currentValidity <= codeEndingTime;

  return (
    <AccountDetailsStyled isEnding={isEnding}>
      <CodeStyled>{authCode.code}</CodeStyled>
      <BarStyled style={{ width: `${barWidth}%` }} />
      <UsernameStyled>{username}</UsernameStyled>
    </AccountDetailsStyled>
  );
};
