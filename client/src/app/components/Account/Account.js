import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { AccountStyled, BarStyled, CodeStyled, UsernameStyled } from './Account.styled';

const CODE_VALIDITY_TIME = 30 * 1000;
const CODE_DECREASE_INTERVAL = 1000;
const CODE_ENDING_TIME = 5 * 1000;

const Account = ({ code, username, validity }) => {
  const [currentValidity, setValidity] = React.useState(0);

  useEffect(() => {
    setValidity(validity);

    const handler = setInterval(() => {
      setValidity(currentValidity => currentValidity - CODE_DECREASE_INTERVAL);
    }, CODE_DECREASE_INTERVAL);

    return () => clearInterval(handler);
  }, [code, validity]);

  const barWidth = currentValidity * 100 / CODE_VALIDITY_TIME;
  const isEnding = currentValidity <= CODE_ENDING_TIME;

  return (
    <AccountStyled isEnding={isEnding}>
      <CodeStyled>
        {code}
      </CodeStyled>
      <BarStyled style={{ width: `${barWidth}%` }}/>
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
