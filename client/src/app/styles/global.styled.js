import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyled = createGlobalStyle(props => css`
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
    background: ${props.theme.colorBgDefault};
    color: ${props.theme.colorTextDefault};
    font-family: ${props.theme.fontFamily};
    font-size: ${props.theme.fontSize};
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
`);
