import { margin } from 'polished';
import styled from 'styled-components';

export const HeaderStyled = styled.header`
  text-align: center;
`;

export const TitleStyled = styled.h1`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -.05em;
  word-spacing: .1em;
  font-size: 3em;
`;

export const DescriptionStyled = styled.p`
  ${props => margin(props.theme.gutter, 0, 0)};
  font-size: 1.5em;
`;
