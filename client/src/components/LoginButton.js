import React  from 'react';
import styled from 'styled-components';

const Button = styled.a`
    display: inline-block;
    
    img {
        display: block;
    }
`;

const LoginButton = () => {
    return (
        <Button href="/login">
            <img alt="Login through Steam" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"/>
        </Button>
    );
};

export default LoginButton;