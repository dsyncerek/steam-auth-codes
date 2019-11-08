import { margin, padding, size } from 'polished';
import styled, { css } from 'styled-components';

export const CodeStyled = styled.span(
  props => css`
    display: block;
    font-size: 2em;
    font-weight: bold;
  `,
);

export const BarStyled = styled.div(
  props => css`
    display: inline-block;
    ${size(props.theme.gutter / 2, '100%')};
    ${margin(props.theme.gutter, 0, props.theme.gutter / 2)};
    background: ${props.theme.colorPrimary};
  `,
);

export const UsernameStyled = styled.span(
  props => css`
    display: block;
    color: ${props.theme.colorPrimary};
  `,
);

export const AccountDetailsStyled = styled.div<{ isEnding: boolean }>(
  props => css`
    ${padding(props.theme.gutter * 2)};
    background: ${props.theme.colorSecondary};
    color: ${props.theme.colorTextDefault};
    border-radius: ${`${props.theme.gutter * 2}px`};
    text-align: center;

    ${props.isEnding &&
      css`
        ${BarStyled} {
          background: ${props.theme.colors.red};
        }

        ${UsernameStyled} {
          color: ${props.theme.colors.red};
        }
      `}
  `,
);
