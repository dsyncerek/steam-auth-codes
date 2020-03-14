import React, { FC } from 'react';
import { DescriptionStyled, HeaderStyled, TitleStyled } from './Header.styled';

type HeaderProps = {};

export const Header: FC<HeaderProps> = () => (
  <HeaderStyled>
    <TitleStyled>Steam Auth Codes</TitleStyled>
    <DescriptionStyled>All your Steam Auth Codes in one place.</DescriptionStyled>
  </HeaderStyled>
);
