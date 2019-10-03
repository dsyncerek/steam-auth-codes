import { padding } from 'polished';
import styled, { css } from 'styled-components';

export const SectionStyled = styled.div(
  props => css`
    ${padding(props.theme.gutter * 10, props.theme.gutter * 3)};

    ${props.odd &&
      css`
        background: ${props.theme.colorBgReversed};
        color: ${props.theme.colorTextReversed};
      `}
  `,
);
