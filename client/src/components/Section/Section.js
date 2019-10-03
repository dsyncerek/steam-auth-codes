import PropTypes from 'prop-types';
import React from 'react';
import { SectionStyled } from './Section.styled';

const Section = ({ children, odd, as = 'div' }) => (
  <SectionStyled odd={odd} as={as}>
    {children}
  </SectionStyled>
);

Section.propTypes = {
  as: PropTypes.string,
  odd: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Section;
