import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/variables';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Section from '../Section/Section';
import GlobalStyles from '../../styles/global';

const Layout = ({ username, children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles/>
      <Section as="div">
        <Header/>
      </Section>
      <Section isOdd={true} as="main">
        {children}
      </Section>
      <Section as="div">
        <Footer username={username}/>
      </Section>
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  username: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Layout;
