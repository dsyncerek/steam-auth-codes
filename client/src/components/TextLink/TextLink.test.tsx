import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme/theme';
import TextLink from './TextLink';

describe('TextLink', () => {
  it('should render without crashing', () => {
    const container = document.createElement('div');
    const component = <TextLink href="https://dsyncerek.dev/">my site</TextLink>;
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>, container);
    unmountComponentAtNode(container);
  });
});
