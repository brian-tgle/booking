import * as Yup from 'yup';

const rejectBookingSchema = Yup.object().shape({
  rejectionReason: Yup.string().required('Please input the reject reason').max(500)
});

export default rejectBookingSchema;
