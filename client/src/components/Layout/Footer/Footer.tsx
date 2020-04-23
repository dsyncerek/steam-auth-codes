import React, { FC } from 'react';
import { TextLink } from '../../TextLink/TextLink';
import { FooterStyled, HeartStyled } from './Footer.styled';

export const Footer: FC = () => (
  <FooterStyled>
    <p>
      Created with <HeartStyled>❤</HeartStyled> by <TextLink href="https://dsyncerek.dev/">dsyncerek</TextLink>.
    </p>
  </FooterStyled>
);
