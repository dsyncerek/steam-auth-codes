import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyled } from '../../styles/global.styled';
import { theme } from '../../styles/variables.styled';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Section from '../Section/Section';

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyled />
    <Section as="div">
      <Header />
    </Section>
    <Section odd={true} as="main">
      {children}
    </Section>
    <Section as="div">
      <Footer />
    </Section>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
