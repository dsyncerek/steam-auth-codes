import React     from 'react';
import PropTypes from 'prop-types';
import styled    from 'styled-components';

const Wrapper = styled.div`
    text-align: center;
    
    p {
        margin: 0;
        line-height: 18px;
        font-size: 14px;
    }
`;

const Information = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
};

Information.propTypes = {
    children: PropTypes.node.isRequired
};

export default Information;