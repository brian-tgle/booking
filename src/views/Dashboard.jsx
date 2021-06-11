import React from 'react';
import BookingList from 'components/Booking/List';
import { Container, Row, Col } from 'react-bootstrap';
import BookingForm from 'components/Booking/Form';

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <BookingForm />
          </Col>
          <Col md="12">
            <BookingList />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
