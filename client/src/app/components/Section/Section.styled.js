import { padding, rgba } from 'polished';
import styled, { css } from 'styled-components';

export const SectionStyled = styled.div`
  ${props => padding(props.theme.gutter * 10, props.theme.gutter * 3)};
  
  ${props => props.isOdd && css`
    background: ${rgba(props.theme.colorBgReversed, .95)};
    color: ${props.theme.colorTextReversed};
  `}
`;
