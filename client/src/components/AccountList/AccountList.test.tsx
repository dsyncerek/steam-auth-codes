import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme/theme';
import AccountList from './AccountList';

describe('AccountList', () => {
  it('should render without crashing', () => {
    const container = document.createElement('div');
    const component = <AccountList accounts={[]} />;
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>, container);
    unmountComponentAtNode(container);
  });
});
