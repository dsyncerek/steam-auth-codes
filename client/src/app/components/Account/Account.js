import PropTypes from 'prop-types';
import React from 'react';
import { AccountStyled, BarStyled, CodeStyled, UsernameStyled } from './Account.styled';
import useValidity, { CODE_ENDING_TIME, CODE_VALIDITY_TIME } from './useValidity';

const Account = ({ code, username, validity }) => {
  const currentValidity = useValidity(validity, code);

  const barWidth = currentValidity * 100 / CODE_VALIDITY_TIME;
  const isEnding = currentValidity <= CODE_ENDING_TIME;

  return (
    <AccountStyled isEnding={isEnding}>
      <CodeStyled>
        {code}
      </CodeStyled>
      <BarStyled style={{ width: `${barWidth}%` }} />
      <UsernameStyled>
        {username}
      </UsernameStyled>
    </AccountStyled>
  );
};

Account.propTypes = {
  code: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  validity: PropTypes.number.isRequired,
};

export default Account;
