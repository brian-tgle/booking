import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from 'assets/scss/login.module.scss';
import AuthRepository from 'services/authRepository';
import useAuthentication from 'stores/authentication/authentication';
import { ROUTES } from 'common/constants';

const Login = () => {
  const [serverError, setServerError] = useState(false);
  const [state, authenticationActions] = useAuthentication();
  const history = useHistory();
  const loginSchema = Yup.object().shape({
    username: Yup.string().required('User name can not be empty'),
    password: Yup.string().required('Password can not be empty')
  });

  useEffect(() => {
    if (state.loggedIn) {
      history.replace(ROUTES.DASHBOARD);
    }
  }, [state]);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting
  } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (data) => {
      try {
        const response = await AuthRepository.login(data);
        authenticationActions.login(response);
        history.replace(ROUTES.DASHBOARD);
      } catch {
        setServerError(true);
      }
    },
    validationSchema: loginSchema
  });

  return (
    <div className={styles.loginPage}>
      <Form className={styles.loginForm} onSubmit={handleSubmit}>
        <h3 className="text-center">Login Page</h3>
        <Form.Group controlId="formUsername">
          <Form.Label>User name</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            isInvalid={touched.username && errors.username}
          />
          {touched.username && errors.username && (
          <Form.Control.Feedback className={styles.inValid} type="invalid">
            {errors.username}
          </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            isInvalid={touched.password && errors.password}
          />
          {touched.password && errors.password && (
          <Form.Control.Feedback className={styles.inValid} type="invalid">
            {errors.password}
          </Form.Control.Feedback>
          )}
        </Form.Group>
        <p className="text-center">
          <Button
            variant="success"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </p>
        {serverError && <p className="text-center">Service unavailable! Please try again</p>}
      </Form>
    </div>
  );
};
export default Login;
