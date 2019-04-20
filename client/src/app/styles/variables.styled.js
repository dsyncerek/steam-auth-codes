export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
};

export const colors = {
  white: '#eee',
  black: '#111',
  red: '#cd201f',
  blue: '#00adee',
  darkBlue: '#171a21',
};

export const theme = {
  colors,
  breakpoints,

  colorTextDefault: colors.white,
  colorTextReversed: colors.black,
  colorBgDefault: colors.black,
  colorBgReversed: colors.white,
  colorPrimary: colors.blue,
  colorSecondary: colors.darkBlue,

  fontSize: '14px',
  fontFamily: 'Ubuntu',
  gutter: 10,
  transitionTime: '.3s',
};
