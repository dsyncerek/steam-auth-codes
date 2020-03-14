import React, { FC } from 'react';
import { TextLink } from '../TextLink/TextLink';
import { FooterStyled, HeartStyled } from './Footer.styled';

type FooterProps = {};

export const Footer: FC<FooterProps> = () => (
  <FooterStyled>
    <p>
      Created with <HeartStyled>❤</HeartStyled> by <TextLink href="https://dsyncerek.dev/">dsyncerek</TextLink>.
    </p>
  </FooterStyled>
);
