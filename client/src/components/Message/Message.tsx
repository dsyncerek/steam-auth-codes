import React, { FC, ReactNode } from 'react';
import { MessageStyled } from './Message.styled';

type MessageProps = {
  children: ReactNode;
};

const Message: FC<MessageProps> = ({ children }) => <MessageStyled>{children}</MessageStyled>;

export default Message;
