import React from 'react';
import TextLink from '../TextLink/TextLink';
import { FooterStyled, HeartStyled } from './Footer.styled';

const Footer = () => (
  <FooterStyled>
    <p>
      Created with <HeartStyled>❤</HeartStyled> by <TextLink href="https://dsyncerek.dev/">dsyncerek</TextLink>.
    </p>
  </FooterStyled>
);

export default Footer;
