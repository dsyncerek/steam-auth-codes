import { margin } from 'polished';
import styled, { css } from 'styled-components';

export const HeaderStyled = styled.header(
  props => css`
    text-align: center;
  `,
);

export const TitleStyled = styled.h1(
  props => css`
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.05em;
    word-spacing: 0.1em;
    font-size: 3em;
  `,
);

export const DescriptionStyled = styled.p(
  props => css`
    ${margin(props.theme.gutter, 0, 0)};
    font-size: 1.5em;
  `,
);
