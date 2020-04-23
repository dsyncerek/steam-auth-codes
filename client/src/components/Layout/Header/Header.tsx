import React, { FC } from 'react';
import { DescriptionStyled, HeaderStyled, TitleStyled } from './Header.styled';

export const Header: FC = () => (
  <HeaderStyled>
    <TitleStyled>Steam Auth Codes</TitleStyled>
    <DescriptionStyled>All your Steam Auth Codes in one place.</DescriptionStyled>
  </HeaderStyled>
);
