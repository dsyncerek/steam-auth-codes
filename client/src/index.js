import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { ThemeProvider } from 'styled-components';
import { theme } from './app/styles/variables.styled';
import { GlobalStyled } from './app/styles/global.styled';
import { StatusContextProvider } from './app/context/Status.context';

const Root = () => (
  <StatusContextProvider>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyled />
        <App />
      </>
    </ThemeProvider>
  </StatusContextProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
