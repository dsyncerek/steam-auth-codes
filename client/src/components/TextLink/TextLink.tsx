import React, { FC, ReactNode } from 'react';
import { TextLinkStyled } from './TextLink.styled';

type TextLinkProps = {
  children: ReactNode;
  href: string;
};

export const TextLink: FC<TextLinkProps> = ({ children, href }) => (
  <TextLinkStyled href={href}>{children}</TextLinkStyled>
);
