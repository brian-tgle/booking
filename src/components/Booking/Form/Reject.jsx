import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import rejectBookingSchema from 'validationSchemas/rejectBooking';
import BookingRepository from 'services/bookingRepository';
import useBookingStore from 'stores/booking/booking';
import { STATUS } from 'common/constants';
import styles from 'assets/scss/common.module.scss';
import bookingStyles from '../Booking.module.scss';

const RejectBookingForm = ({ bookingId }) => {
  const [error, setError] = useState(false);
  const [, bookingActions] = useBookingStore();
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched
  } = useFormik({
    initialValues: {
      rejectionReason: ''
    },
    onSubmit: (data) => {
      BookingRepository.update(bookingId, STATUS.REJECTED, data).then(() => {
        bookingActions.setShowModal(false);
        bookingActions.setBookingData({});
        bookingActions.setRefresh(true);
      }).catch(() => {
        setError(true);
      });
    },
    validationSchema: rejectBookingSchema
  });
  const handleCancel = () => {
    bookingActions.setShowModal(false);
    bookingActions.setBookingData({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <label>Reject reason</label>
        <Form.Control
          cols="80"
          name="rejectionReason"
          rows="2"
          as="textarea"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.rejectionReason}
          isInvalid={touched?.rejectionReason && errors?.rejectionReason}
        />
        {touched?.rejectionReason && errors?.rejectionReason && (
        <Form.Control.Feedback className={styles.inValid} type="invalid">
          {errors?.rejectionReason}
        </Form.Control.Feedback>
        )}
      </Form.Group>
      <div className={bookingStyles.formActions}>
        <Button
          className="btn-fill"
          size="sm"
          onClick={handleCancel}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          className="btn-fill"
          size="sm"
          type="submit"
          variant="danger"
        >
          Reject Booking
        </Button>
      </div>
      {error ? <p className="text-center">Opps!!! Can not reject this booking. Please try again later.</p> : <></>}
    </Form>
  );
};

export default RejectBookingForm;
