import * as Yup from 'yup';

const typeOfEventSchema = Yup.object().shape({
  name: Yup.string().required('Please input event name').max(100)
});

export default typeOfEventSchema;
