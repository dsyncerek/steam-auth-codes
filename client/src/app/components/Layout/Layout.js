import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Section from '../Section/Section';

const Layout = ({ username, children }) => (
  <>
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
);

Layout.propTypes = {
  username: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Layout;
