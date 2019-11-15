import { DefaultTheme } from 'styled-components';
import breakpoints from './breakpoints';
import colors from './colors';

const theme: DefaultTheme = {
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

export default theme;
