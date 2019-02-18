import { margin, padding } from 'polished';
import styled from 'styled-components';

export const CodeStyled = styled.span`
  display: block;
  font-size: 2em;
  font-weight: bold;
`;

export const BarStyled = styled.div`
  display: inline-block;
  height: ${props => `${props.theme.gutter / 2}px`};
  width: 100%;
  ${props => margin(props.theme.gutter, 0, props.theme.gutter / 2)};
  background: ${props => props.theme.colorPrimary};
`;

export const UsernameStyled = styled.span`
  display: block;
  color: ${props => props.theme.colorPrimary};
`;

export const AccountStyled = styled.div`
  ${props => padding(props.theme.gutter * 2)};
  background: ${props => props.theme.colorSecondary};
  color: ${props => props.theme.colorTextDefault};
  border-radius: ${props => `${props.theme.gutter * 2}px`};
  text-align: center;
  
  ${props => props.isEnding && `
    ${BarStyled} {
      background: ${props.theme.colors.red};
    }
    
    ${UsernameStyled} {
      color: ${props.theme.colors.red};
    }
  `}
`;
