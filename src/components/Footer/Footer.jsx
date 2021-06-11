import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ROUTES } from 'common/constants';

const Footer = () => (
  <footer className="footer px-0 px-lg-3">
    <Container fluid>
      <p className="copyright text-center">
        ©
        {' '}
        {new Date().getFullYear()}
        {' '}
        <Link to={ROUTES.DASHBOARD}>Fullerton</Link>
        , Simple booking system
      </p>
    </Container>
  </footer>
);
export default Footer;
