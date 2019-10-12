import React from 'react';
import { DescriptionStyled, HeaderStyled, TitleStyled } from './Header.styled';

const Header = () => (
  <HeaderStyled>
    <TitleStyled>Steam Auth Codes</TitleStyled>
    <DescriptionStyled>All your Steam Auth Codes in one place.</DescriptionStyled>
  </HeaderStyled>
);

export default Header;
