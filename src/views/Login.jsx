import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import styles from 'assets/scss/login.module.scss';
import AuthRepository from 'services/authRepository';
import useAuthentication from 'stores/authentication/authentication';
import { ROUTES } from 'common/constants';
import loginSchema from 'validationSchemas/login';

const Login = () => {
  const [serverError, setServerError] = useState(false);
  const [state, authenticationActions] = useAuthentication();
  const history = useHistory();

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
    touched
  } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (data) => {
      AuthRepository.login(data).then((response) => {
        if (response?.success) {
          authenticationActions.login(response.data);
          history.replace(ROUTES.DASHBOARD);
        } else {
          setServerError(true);
        }
      }).catch(() => {
        setServerError(true);
      });
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
            value={values?.username}
            isInvalid={touched?.username && errors?.username}
          />
          {touched?.username && errors?.username && (
          <Form.Control.Feedback className={styles.inValid} type="invalid">
            {errors?.username}
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
            value={values?.password}
            isInvalid={touched?.password && errors?.password}
          />
          {touched?.password && errors?.password && (
          <Form.Control.Feedback className={styles.inValid} type="invalid">
            {errors?.password}
          </Form.Control.Feedback>
          )}
        </Form.Group>
        <p className="text-center">
          <Button
            className="btn-fill"
            variant="success"
            type="submit"
          >
            Login
          </Button>
        </p>
        {serverError && <p className="text-center">Username or Password not correct! Please try again</p>}
      </Form>
    </div>
  );
};
export default Login;
