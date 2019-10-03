import React from 'react';
import { LoginButtonStyled } from './LoginButton.styled';

const LoginButton = () => (
  <LoginButtonStyled href="/login">
    <img
      src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
      alt="Login through Steam"
    />
  </LoginButtonStyled>
);

export default LoginButton;
