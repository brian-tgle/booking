import * as Yup from 'yup';

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
      function compare(proposedDate1) {
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
      function compare(proposedDate1) {
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
      function compare(proposedDate2) {
        const { proposedDate1 } = this.parent;
        if (proposedDate2?.getTime() === proposedDate1?.getTime()) {
          return false;
        }
        return true;
      }
    )
    .test(
      'notSameValue',
      'Can not input the same value with Proposed date and time 3',
      function compare(proposedDate2) {
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
      function compare(proposedDate3) {
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
      function compare(proposedDate3) {
        const { proposedDate1 } = this.parent;
        if (proposedDate3?.getTime() === proposedDate1?.getTime()) {
          return false;
        }
        return true;
      }
    )
});

export default bookingSchema;
