import 'normalize.css/normalize.css';
import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle(
  props => css`
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
  `,
);
