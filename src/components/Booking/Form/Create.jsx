/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  Row
} from 'react-bootstrap';
import { useFormik } from 'formik';
import EventCategoryRepository from 'services/eventCategoryRepository';
import BookingRepository from 'services/bookingRepository';
import bookingSchema from 'validationSchemas/createBooking';
import useBookingStore from 'stores/booking/booking';
import styles from 'assets/scss/common.module.scss';
import bookingStyles from '../Booking.module.scss';

const CreateBookingForm = () => {
  const [eventCategories, setEventCategories] = useState([]);
  const [error, setError] = useState(false);
  const [, bookingActions] = useBookingStore();
  useEffect(() => {
    EventCategoryRepository.getAll().then((response) => {
      setEventCategories(response.data);
    });
  }, []);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched
  } = useFormik({
    initialValues: {
      eventCategory: '',
      proposedDate1: '',
      proposedDate2: '',
      proposedDate3: '',
      location: ''
    },
    onSubmit: async (data) => {
      const proposedDateOptions = [data.proposedDate1, data.proposedDate2, data.proposedDate3];
      const payload = {
        eventCategory: data.eventCategory,
        location: data.location,
        proposedDateOptions
      };
      BookingRepository.create(payload).then(() => {
        bookingActions.setShowModal(false);
        bookingActions.setBookingData({});
        bookingActions.setRefresh(true);
      }).catch(() => {
        setError(true);
      });
    },
    validationSchema: bookingSchema
  });

  const handleCancel = () => {
    bookingActions.setShowModal(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md="3">
          <Form.Group>
            <label>Type of event</label>
            <Form.Control
              as="select"
              name="eventCategory"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.eventCategory}
              isInvalid={touched.eventCategory && errors.eventCategory}
            >
              <option>Choose type of event</option>
              {eventCategories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Form.Control>
            {touched.eventCategory && errors.eventCategory && (
            <Form.Control.Feedback className={styles.inValid} type="invalid">
              {errors.eventCategory}
            </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Proposed Date 1</label>
            <Form.Control
              name="proposedDate1"
              type="datetime-local"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.proposedDate1}
              isInvalid={touched.proposedDate1 && errors.proposedDate1}
            />
            {touched.proposedDate1 && errors.proposedDate1 && (
            <Form.Control.Feedback className={styles.inValid} type="invalid">
              {errors.proposedDate1}
            </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Proposed Date 2</label>
            <Form.Control
              name="proposedDate2"
              type="datetime-local"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.proposedDate2}
              isInvalid={touched.proposedDate2 && errors.proposedDate2}
            />
            {touched.proposedDate2 && errors.proposedDate2 && (
            <Form.Control.Feedback className={styles.inValid} type="invalid">
              {errors.proposedDate2}
            </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Proposed Date 3</label>
            <Form.Control
              name="proposedDate3"
              type="datetime-local"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.proposedDate3}
              isInvalid={touched.proposedDate3 && errors.proposedDate3}
            />
            {touched.proposedDate3 && errors.proposedDate3 && (
            <Form.Control.Feedback className={styles.inValid} type="invalid">
              {errors.proposedDate3}
            </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Form.Group>
            <label>Location</label>
            <Form.Control
              cols="80"
              name="location"
              rows="2"
              as="textarea"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location}
              isInvalid={touched.location && errors.location}
            />
            {touched.location && errors.location && (
            <Form.Control.Feedback className={styles.inValid} type="invalid">
              {errors.location}
            </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
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
          variant="primary"
        >
          Create Booking
        </Button>
      </div>
      {error ? <p className="text-center">Create a booking failed! Please try again later.</p> : <></>}
    </Form>
  );
};

export default CreateBookingForm;
