import React, { FC } from 'react';
import { MessageStyled } from './Message.styled';

export const Message: FC = ({ children }) => <MessageStyled>{children}</MessageStyled>;
