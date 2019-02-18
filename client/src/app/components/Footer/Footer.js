import React from 'react';
import PropTypes from 'prop-types';
import TextLink from '../TextLink/TextLink';
import { FooterStyled, HeartStyled } from './Footer.styled';

const Footer = ({ username }) => (
  <FooterStyled>
    {username && (
      <p>
        Hello {username}, <TextLink href="/logout">Logout</TextLink>!
      </p>
    )}
    <p>
      Created with <HeartStyled>❤</HeartStyled> by <TextLink href="https://dsyncerek.pl/">dsyncerek</TextLink>.
    </p>
  </FooterStyled>
);

Footer.propTypes = {
  username: PropTypes.string,
};

export default Footer;
