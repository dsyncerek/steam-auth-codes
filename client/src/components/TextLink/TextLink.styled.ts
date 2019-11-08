import styled, { css } from 'styled-components';

export const TextLinkStyled = styled.a(
  props => css`
    text-decoration: none;
    transition: ${props.theme.transitionTime};
    color: ${props.theme.colorPrimary};
    border-bottom: 1px solid transparent;

    &:hover,
    &:focus {
      color: inherit;
      border-bottom: 1px solid currentColor;
    }
  `,
);
