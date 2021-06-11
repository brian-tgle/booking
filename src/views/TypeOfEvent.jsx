import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TypeOfEventForm from 'components/TypeOfEvent/Form';
import TypeOfEventList from 'components/TypeOfEvent/List';

function Icons() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="4">
            <TypeOfEventForm />
          </Col>
          <Col md="8">
            <TypeOfEventList />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Icons;
