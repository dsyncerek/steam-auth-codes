import React     from 'react';
import PropTypes from 'prop-types';
import styled    from 'styled-components';

const Wrapper = styled.footer`
    text-align: center;
    padding: 50px 0;
    
    a {
        margin: 0 10px;
    }
`;

const Link = styled.a`
    text-decoration: none;
    transition: 0.3s;
    color: #00adee;
    border-bottom: 1px solid transparent;
    
    &:hover {
        color: #eeeeee;
        border-bottom: 1px solid #00adee;
    }
`;

const Footer = ({logged}) => {
    return (
        <Wrapper>
            <Link href="https://github.com/dsyncerek/steam-authcodes">GitHub</Link>
            {logged && <Link href="/logout">Logout</Link>}
        </Wrapper>
    );
};

Footer.propTypes = {
    logged: PropTypes.bool.isRequired
};

export default Footer;