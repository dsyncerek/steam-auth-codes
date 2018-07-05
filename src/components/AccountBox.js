import React     from 'react';
import PropTypes from 'prop-types';
import styled    from 'styled-components';

const Wrapper = styled.div`
    text-align: center;
    padding: 20px;
    margin: 10px;
    border-radius: 20px;
    min-width: 150px;
    background: #171a21;
    border: 5px solid rgba(238, 238, 238, 0.25);
    color: #eee;
`;

const Code = styled.span`
    font-size: 30px;
    font-weight: bold;
    display: block;
`;

const Bar = styled.div`
    height: 6px;
    background: #00adee;
    margin: 10px 0 5px;
    width: 100%;
    display: inline-block;
`;

const Name = styled.span`
    display: block;
    color: #00adee;
`;

const AccountBox = ({code, username, expire}) => {
    return (
        <Wrapper>
            <Code style={{color: expire <= 5 ? '#cd201f' : ''}}>{code}</Code>
            <Bar style={{width: `${expire * 100 / 30}%`, background: expire <= 5 ? '#cd201f' : ''}}/>
            <Name>{username}</Name>
        </Wrapper>
    );
};

AccountBox.propTypes = {
    code: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    expire: PropTypes.number.isRequired
};

export default AccountBox;