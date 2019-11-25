import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme/theme';
import Footer from './Footer';

describe('Footer', () => {
  it('should render without crashing', () => {
    const container = document.createElement('div');
    const component = <Footer />;
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>, container);
    unmountComponentAtNode(container);
  });
});
