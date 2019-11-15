import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: { [key: string]: string };
    breakpoints: { [key: string]: number };

    colorTextDefault: string;
    colorTextReversed: string;
    colorBgDefault: string;
    colorBgReversed: string;
    colorPrimary: string;
    colorSecondary: string;

    gutter: number;
    fontSize: string;
    fontFamily: string;
    transitionTime: string;
  }
}
