import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import SteamAccount from '../../models/SteamAccount';
import theme from '../../theme/theme';
import AccountDetails from './AccountDetails';

describe('AccountDetails', () => {
  it('should render without crashing', () => {
    const container = document.createElement('div');
    const account: SteamAccount = { username: 'lorem', authCode: { code: 'XGG12', validity: 10000, generatedAt: 0 } };
    const component = <AccountDetails account={account} />;
    render(<ThemeProvider theme={theme}>{component}</ThemeProvider>, container);
    unmountComponentAtNode(container);
  });
});
