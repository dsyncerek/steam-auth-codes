import React, { FC } from 'react';
import { LoginButtonStyled } from './LoginButton.styled';

type LoginButtonProps = {};

const LoginButton: FC<LoginButtonProps> = () => (
  <LoginButtonStyled href="/login">
    <img
      src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
      alt="Login through Steam"
    />
  </LoginButtonStyled>
);

export default LoginButton;
