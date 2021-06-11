import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import BookingRepository from 'services/bookingRepository';
import useBookingStore from 'stores/booking/booking';
import bookingStyles from '../Booking.module.scss';

const CancelBookingForm = ({ bookingId }) => {
  const [error, setError] = useState(false);
  const [, bookingActions] = useBookingStore();
  const handleCancel = () => {
    bookingActions.setShowModal(false);
    bookingActions.setBookingData({});
  };
  const handleSubmit = () => {
    BookingRepository.cancel(bookingId).then(() => {
      bookingActions.setShowModal(false);
      bookingActions.setBookingData({});
      bookingActions.setRefresh(true);
    }).catch(() => {
      setError(true);
    });
  };

  return (
    <Form as="div">
      <p>Do you want to cancel?</p>
      <div className={bookingStyles.formActions}>
        <Button
          className="btn-fill"
          size="sm"
          onClick={handleCancel}
          variant="secondary"
        >
          No
        </Button>
        <Button
          className="btn-fill"
          size="sm"
          onClick={handleSubmit}
          variant="danger"
        >
          Yes
        </Button>
      </div>
      {error ? <p className="text-center">Opps!!! Can not cancel this booking. Please try again later.</p> : <></>}
    </Form>
  );
};

export default CancelBookingForm;
