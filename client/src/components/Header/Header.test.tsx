import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme/theme';
import Header from './Header';

describe('Header', () => {
  it('should render without crashing', () => {
    const container = document.createElement('div');
    const component = <Header />;
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>, container);
    unmountComponentAtNode(container);
  });
});
