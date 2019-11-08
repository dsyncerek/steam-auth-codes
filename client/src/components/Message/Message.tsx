import React, { FC } from 'react';
import { MessageStyled } from './Message.styled';

type MessageProps = {};

const Message: FC<MessageProps> = ({ children }) => <MessageStyled>{children}</MessageStyled>;

export default Message;
