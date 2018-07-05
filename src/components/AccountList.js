import React     from 'react';
import PropTypes from 'prop-types';
import styled    from 'styled-components';
import Box       from './AccountBox';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const AccountList = ({accounts = [], expire = 30} = {}) => {
    return (
        <Wrapper>
            {accounts.map(account =>
                <Box key={account.username} expire={expire} code={account.authCode} username={account.username}/>)}
        </Wrapper>
    );
};

AccountList.propTypes = {
    accounts: PropTypes.array.isRequired,
    expire: PropTypes.number.isRequired
};

export default AccountList;