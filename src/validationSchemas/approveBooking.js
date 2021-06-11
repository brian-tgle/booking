import * as Yup from 'yup';

const approveBookingSchema = Yup.object().shape({
  proposedDate: Yup.date().required('Please select a proposed date')
});

export default approveBookingSchema;
