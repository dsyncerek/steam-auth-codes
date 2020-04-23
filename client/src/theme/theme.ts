import { DefaultTheme } from 'styled-components';
import { breakpoints } from './breakpoints';
import { colors } from './colors';

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

export const theme: DefaultTheme = {
  colors,
  breakpoints,

  colorTextDefault: colors.white,
  colorTextReversed: colors.black,
  colorBgDefault: colors.black,
  colorBgReversed: colors.white,
  colorPrimary: colors.blue,
  colorSecondary: colors.darkBlue,

  fontSize: '14px',
  fontFamily: `'Ubuntu', sans-serif`,
  gutter: 10,
  transitionTime: '.3s',
};
