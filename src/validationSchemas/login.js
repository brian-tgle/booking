import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('User name can not be empty'),
  password: Yup.string().required('Password can not be empty')
});

export default loginSchema;
