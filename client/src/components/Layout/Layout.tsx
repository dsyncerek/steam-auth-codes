import React, { FC, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme/theme';
import { Footer } from '../Footer/Footer';
import { GlobalStyle } from '../GlobalStyle/GlobalStyle';
import { Header } from '../Header/Header';
import { Section } from '../Section/Section';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => (
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
