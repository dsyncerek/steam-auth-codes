import React, { FC } from 'react';
import { TextLinkStyled } from './TextLink.styled';

type TextLinkProps = {
  href: string;
}

const TextLink: FC<TextLinkProps> = ({ children, href }) => (
  <TextLinkStyled href={href}>
    {children}
  </TextLinkStyled>
);

export default TextLink;
