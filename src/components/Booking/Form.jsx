/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EventCategoryRepository from 'services/eventCategoryRepository';
import styles from 'assets/scss/common.module.scss';
import BookingRepository from 'services/bookingRepository';

const BookingForm = () => {
  const [eventCategories, setEventCategories] = useState([]);

  useEffect(() => {
    EventCategoryRepository.getAll().then((response) => {
      setEventCategories(response.data);
    });
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookingSchema = Yup.object().shape({
    eventCategory: Yup.string().required('Please select a type of event'),
    location: Yup.string().required('Please input a location').max(500),
    proposedDate1: Yup.date().required('Please input a Proposed date and time 1')
      .min(today, 'Date cannot be in the past')
      .test(
        'notSameValue',
        'Can not input the same value with Proposed date and time 2',
        function (proposedDate1) {
          // eslint-disable-next-line react/no-this-in-sfc
          const { proposedDate2 } = this.parent;
          if (proposedDate1?.getTime() === proposedDate2?.getTime()) {
            return false;
          }
          return true;
        }
      )
      .test(
        'notSameValue',
        'Can not input the same value with Proposed date and time 3',
        function (proposedDate1) {
          // eslint-disable-next-line react/no-this-in-sfc
          const { proposedDate3 } = this.parent;
          if (proposedDate1?.getTime() === proposedDate3?.getTime()) {
            return false;
          }
          return true;
        }
      ),
    proposedDate2: Yup.date().required('Please input a Proposed date and time 2')
      .min(today, 'Date cannot be in the past')
      .test(
        'notSameValue',
        'Can not input the same value with Proposed date and time 1',
        function (proposedDate2) {
        // eslint-disable-next-line react/no-this-in-sfc
          const { proposedDate1 } = this.parent;
          console.log(proposedDate1, proposedDate2);
          if (proposedDate2?.getTime() === proposedDate1?.getTime()) {
            return false;
          }
          return true;
        }
      )
      .test(
        'notSameValue',
        'Can not input the same value with Proposed date and time 3',
        function (proposedDate2) {
        // eslint-disable-next-line react/no-this-in-sfc
          const { proposedDate3 } = this.parent;
          if (proposedDate2?.getTime() === proposedDate3?.getTime()) {
            return false;
          }
          return true;
        }
      ),
    proposedDate3: Yup.date().required('Please input a Proposed date and time 3')
      .min(today, 'Date cannot be in the past')
      .test(
        'notSameValue',
        'Can not input the same value with Proposed date and time 2',
        function (proposedDate3) {
        // eslint-disable-next-line react/no-this-in-sfc
          const { proposedDate2 } = this.parent;
          if (proposedDate3?.getTime() === proposedDate2?.getTime()) {
            return false;
          }
          return true;
        }
      )
      .test(
        'notSameValue',
        'Can not input the same value with Proposed date and time 1',
        function (proposedDate3) {
        // eslint-disable-next-line react/no-this-in-sfc
          const { proposedDate1 } = this.parent;
          if (proposedDate3?.getTime() === proposedDate1?.getTime()) {
            return false;
          }
          return true;
        }
      )
  });

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
    onSubmit: async (data, { resetForm }) => {
      const proposedDateOptions = [data.proposedDate1, data.proposedDate2, data.proposedDate3];
      const payload = {
        eventCategory: data.eventCategory,
        location: data.location,
        proposedDateOptions
      };
      BookingRepository.create(payload).then((response) => {
        console.log(response.data);
        resetForm();
      }).catch((error) => {
        console.log(error);
      });
    },
    validationSchema: bookingSchema
  });

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h3"><Badge variant="secondary">Booking form</Badge></Card.Title>
      </Card.Header>
      <Card.Body>
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
          <Button
            className="btn-fill pull-right"
            type="submit"
            variant="primary"
          >
            Create Booking
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BookingForm;
