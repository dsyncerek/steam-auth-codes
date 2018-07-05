import React  from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
    text-align: center;
    padding: 50px 10px;
`;

const Title = styled.h1`
    margin: 0;
    text-transform: uppercase;
    letter-spacing: -2px;
    word-spacing: 5px;
    color: #eee;
`;

const Header = () => {
    return (
        <Wrapper>
            <Title>Steam AuthCodes</Title>
        </Wrapper>
    );
};

export default Header;