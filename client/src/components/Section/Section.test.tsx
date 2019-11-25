import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme/theme';
import Section from './Section';

describe('Section', () => {
  it('should render without crashing', () => {
    const container = document.createElement('div');
    const component = <Section>Hello!</Section>;
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>, container);
    unmountComponentAtNode(container);
  });
});
