import React, { useContext } from 'react';
import StatusContext from '../../context/StatusContext';
import TextLink from '../TextLink/TextLink';
import { FooterStyled, HeartStyled } from './Footer.styled';

const Footer = () => {
  const { steamid } = useContext(StatusContext);

  return (
    <FooterStyled>
      {steamid && (
        <p>
          Hello {steamid}, <TextLink href="/logout">Logout</TextLink>!
        </p>
      )}
      <p>
        Created with <HeartStyled>❤</HeartStyled> by <TextLink href="https://dsyncerek.dev/">dsyncerek</TextLink>.
      </p>
    </FooterStyled>
  );
};

export default Footer;
