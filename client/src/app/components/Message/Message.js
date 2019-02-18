import React from 'react';
import PropTypes from 'prop-types';
import { MessageStyled } from './Message.styled';

const Message = ({ children }) => (
  <MessageStyled>
    {children}
  </MessageStyled>
);

Message.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Message;
