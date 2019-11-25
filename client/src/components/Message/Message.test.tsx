import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme/theme';
import Message from './Message';

describe('Message', () => {
  it('should render without crashing', () => {
    const container = document.createElement('div');
    const component = <Message>Hello!</Message>;
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>, container);
    unmountComponentAtNode(container);
  });
});
