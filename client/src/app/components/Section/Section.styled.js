import { padding } from 'polished';
import styled, { css } from 'styled-components';

export const SectionStyled = styled.div`
  ${props => padding(props.theme.gutter * 10, props.theme.gutter * 3)};
  
  ${props => props.odd && css`
    background: ${props.theme.colorBgReversed};
    color: ${props.theme.colorTextReversed};
  `}
`;
