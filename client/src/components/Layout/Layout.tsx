import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../styles/global.styled';
import { theme } from '../../styles/theme.styled';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Section from '../Section/Section';

type LayoutProps = {};

const Layout: FC<LayoutProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Section>
        <Header />
      </Section>
      <Section odd={true} as="main">
        {children}
      </Section>
      <Section>
        <Footer />
      </Section>
    </>
  </ThemeProvider>
);

export default Layout;
