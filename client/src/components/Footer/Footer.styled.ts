import styled, { css } from 'styled-components';

export const FooterStyled = styled.footer(
  props => css`
    text-align: center;

    p {
      margin: 0;
    }
  `,
);

export const HeartStyled = styled.span(
  props => css`
    color: ${props.theme.colors.red};
  `,
);
