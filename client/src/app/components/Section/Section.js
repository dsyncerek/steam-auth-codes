import PropTypes from 'prop-types';
import React from 'react';
import { SectionStyled } from './Section.styled';

const Section = ({ children, isOdd, as = 'div' }) => (
  <SectionStyled isOdd={isOdd} as={as}>
    {children}
  </SectionStyled>
);

Section.propTypes = {
  as: PropTypes.string,
  isOdd: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Section;
