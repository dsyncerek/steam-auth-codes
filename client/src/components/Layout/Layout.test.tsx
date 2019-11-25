import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme/theme';
import Layout from './Layout';

describe('Layout', () => {
  it('should render without crashing', () => {
    const container = document.createElement('div');
    const component = <Layout>Hello!</Layout>;
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>, container);
    unmountComponentAtNode(container);
  });
});
