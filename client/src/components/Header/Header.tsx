import React, { FC } from 'react';
import { DescriptionStyled, HeaderStyled, TitleStyled } from './Header.styled';

type HeaderProps = {};

const Header: FC<HeaderProps> = () => (
  <HeaderStyled>
    <TitleStyled>Steam Auth Codes</TitleStyled>
    <DescriptionStyled>All your Steam Auth Codes in one place.</DescriptionStyled>
  </HeaderStyled>
);

export default Header;
