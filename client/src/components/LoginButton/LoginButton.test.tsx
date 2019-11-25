import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme/theme';
import LoginButton from './LoginButton';

describe('LoginButton', () => {
  it('should render without crashing', () => {
    const container = document.createElement('div');
    const component = <LoginButton />;
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>, container);
    unmountComponentAtNode(container);
  });
});
