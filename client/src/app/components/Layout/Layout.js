import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import StatusContext from '../../context/Status.context';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import LoginButton from '../LoginButton/LoginButton';
import Message from '../Message/Message';
import Section from '../Section/Section';
import socketStatusEnum from '../../enums/socketStatus.enum';
import responseStatusEnum from '../../enums/responseStatus.enum';

const getMessage = () => {
  const { socketStatus, responseStatus } = useContext(StatusContext);
  const loading = !socketStatus || (socketStatus === socketStatusEnum.connected && !responseStatus);
  const error = socketStatus === socketStatusEnum.error;
  const loginRequired = responseStatus === responseStatusEnum.unauthorized;
  const permissionRequired = responseStatus === responseStatusEnum.forbidden;

  if (loading) return 'Loading...';
  if (error) return 'Can\'t connect to the server!';
  if (permissionRequired) return 'You don\'t have permission!';
  if (loginRequired) return <LoginButton />;

  return null;
};

const Layout = ({ children }) => {
  const message = getMessage();
  const content = message ? <Message>{message}</Message> : children;

  return (
    <>
      <Section as="div">
        <Header />
      </Section>
      <Section odd={true} as="main">
        {content}
      </Section>
      <Section as="div">
        <Footer />
      </Section>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
