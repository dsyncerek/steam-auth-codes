import React, { FC, ReactNode } from 'react';
import { MessageStyled } from './Message.styled';

type MessageProps = {
  children: ReactNode;
};

export const Message: FC<MessageProps> = ({ children }) => <MessageStyled>{children}</MessageStyled>;
