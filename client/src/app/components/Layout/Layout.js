import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { responseStatus, socketStatus } from '../../api/enums';
import StatusContext from '../../context/StatusContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import LoginButton from '../LoginButton/LoginButton';
import Message from '../Message/Message';
import Section from '../Section/Section';

const getMessage = () => {
  const { socketState, statusCode } = useContext(StatusContext);
  const loading = socketState === socketStatus.loading || (socketState === socketStatus.connected && !statusCode);
  const error = socketState === socketStatus.error;
  const loginRequired = statusCode === responseStatus.unauthorized;
  const permissionRequired = statusCode === responseStatus.forbidden;

  if (loading) return 'Loading...';
  if (error) return 'Can\'t connect to the server!';
  if (permissionRequired) return 'You don\'t have permission!';
  if (loginRequired) return <LoginButton/>;

  return null;
};

const Layout = ({ children }) => {
  const message = getMessage();
  const content = message ? <Message>{message}</Message> : children;

  return (
    <>
      <Section as="div">
        <Header/>
      </Section>
      <Section isOdd={true} as="main">
        {content}
      </Section>
      <Section as="div">
        <Footer/>
      </Section>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
