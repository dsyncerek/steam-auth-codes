import { DefaultTheme } from 'styled-components';
import { breakpoints, colors } from './variables.styled';

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
