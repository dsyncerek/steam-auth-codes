import React from 'react';
import PropTypes from 'prop-types';
import { TextLinkStyled } from './TextLink.styled';

const TextLink = ({ children, href }) => (
  <TextLinkStyled href={href}>
    {children}
  </TextLinkStyled>
);

TextLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TextLink;
