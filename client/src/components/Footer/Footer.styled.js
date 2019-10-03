import styled, { css } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const FooterStyled = styled.footer(
  props => css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;

    ${breakpoint('sm')`
      flex-direction: row;
    `}
  `,
);

export const HeartStyled = styled.span(
  props => css`
    color: ${props.theme.colors.red};
  `,
);
