import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import EventCategoryRepository from 'services/eventCategoryRepository';
import useTypeOdEventStore from 'stores/typeOfEvent/typeOfEvent';
import typeOfEventSchema from 'validationSchemas/typeOfEvent';
import styles from 'assets/scss/common.module.scss';
import bookingStyles from '../Booking/Booking.module.scss';

const TypeOfEventForm = () => {
  const [error, setError] = useState(false);
  const [action, setAction] = useState('Create');
  const [typeOfEventState, typeOfEventActions] = useTypeOdEventStore();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    values,
    errors,
    touched,
    setFieldValue
  } = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: (data, { resetForm }) => {
      const payload = typeOfEventState.updateData?.id
        ? { ...data, id: typeOfEventState.updateData?.id }
        : data;
      EventCategoryRepository.createOrUpdate(payload).then(() => {
        typeOfEventActions.setRefresh(true);
        typeOfEventActions.setUpdateData({});
        resetForm();
      }).catch(() => {
        setError(true);
      });
    },
    validationSchema: typeOfEventSchema
  });

  useEffect(() => {
    if (typeOfEventState.updateData?.id) {
      setAction('Update');
      setFieldValue('name', typeOfEventState.updateData?.name);
    } else {
      setAction('Create');
    }
  }, [typeOfEventState.updateData.id]);

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h4">{`${action} event type`}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <label>Name</label>
            <Form.Control
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values?.name}
              isInvalid={touched?.name && errors?.name}
            />
            {touched?.name && errors?.name && (
            <Form.Control.Feedback className={styles.inValid} type="invalid">
              {errors?.name}
            </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className={bookingStyles.formActions}>
            <Button
              className="btn-fill"
              size="sm"
              onClick={handleReset}
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
              {`${action}`}
            </Button>
          </div>
          {error ? (
            <p className="text-center">
              {`Opps!!! Can not ${action} this type of event. Please try again later.`}
            </p>
          ) : <></>}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TypeOfEventForm;
