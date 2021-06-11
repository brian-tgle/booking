import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import approveBookingSchema from 'validationSchemas/approveBooking';
import BookingRepository from 'services/bookingRepository';
import useBookingStore from 'stores/booking/booking';
import { STATUS } from 'common/constants';
import styles from 'assets/scss/common.module.scss';
import bookingStyles from '../Booking.module.scss';
import ProposedDateOptions from '../ProposedDate/ProposedDateOptions';

const ApproveBookingForm = ({ bookingId, proposedDateOptions = [] }) => {
  const [error, setError] = useState(false);
  const [, bookingActions] = useBookingStore();
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    isValid
  } = useFormik({
    initialValues: {
      proposedDate: ''
    },
    onSubmit: (data) => {
      BookingRepository.update(bookingId, STATUS.APPROVED, data).then(() => {
        bookingActions.setShowModal(false);
        bookingActions.setBookingData({});
        bookingActions.setRefresh(true);
      }).catch(() => {
        setError(true);
      });
    },
    validationSchema: approveBookingSchema
  });
  const handleCancel = () => {
    bookingActions.setShowModal(false);
    bookingActions.setBookingData({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <label>Proposed date options</label>
        <ProposedDateOptions
          options={proposedDateOptions}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        {!isValid && (
        <Form.Control.Feedback className={styles.inValid} type="invalid">
          {errors?.proposedDate}
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
          variant="success"
        >
          Approve Booking
        </Button>
      </div>
      {error ? <p className="text-center">Opps!!! Can not approve this booking. Please try again later.</p> : <></>}
    </Form>
  );
};

export default ApproveBookingForm;
