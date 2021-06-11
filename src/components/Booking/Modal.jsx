import React from 'react';
import { Badge, Modal } from 'react-bootstrap';

const BookingModal = ({
  children,
  show,
  size,
  title = ''
}) => (
  <Modal show={show} size={size}>
    <Modal.Header>
      <Modal.Title as={Badge} variant="danger">{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
  </Modal>
);

export default BookingModal;
