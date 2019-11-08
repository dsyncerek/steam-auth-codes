import React, { FC } from 'react';
import { SectionStyled } from './Section.styled';

type SectionProps = {
  odd?: boolean;
  as?: 'div' | 'section' | 'main';
};

const Section: FC<SectionProps> = ({ children, odd = false, as = 'div' }) => (
  <SectionStyled odd={odd} as={as}>
    {children}
  </SectionStyled>
);

export default Section;
