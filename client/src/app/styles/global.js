import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyled = createGlobalStyle`
  ${reset}
  
  html {
    box-sizing: border-box;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  
  body {
    background: ${props => props.theme.colorBgDefault};
    color: ${props => props.theme.colorTextDefault};
    font-family: ${props => props.theme.fontFamily};
    font-size: ${props => props.theme.fontSize};
    font-weight: 400;
    line-height: normal;
  }
  
  img {
    vertical-align: middle;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;
