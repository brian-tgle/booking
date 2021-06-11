import React from 'react';
import useBookingStore from 'stores/booking/booking';
import { ACTION_TYPES } from 'common/constants';
import CreateBookingForm from '../Form/Create';
import RejectBookingForm from '../Form/Reject';
import CancelBookingForm from '../Form/Cancel';
import ApproveBookingForm from '../Form/Approve';

const ModalForm = () => {
  const [bookingState] = useBookingStore();
  const type = bookingState.bookingData?.type;
  switch (type) {
    case ACTION_TYPES.CREATE:
      return <CreateBookingForm />;
    case ACTION_TYPES.REJECT:
      return <RejectBookingForm bookingId={bookingState.bookingData?.bookingId} />;
    case ACTION_TYPES.CANCEL:
      return <CancelBookingForm bookingId={bookingState.bookingData?.bookingId} />;
    case ACTION_TYPES.APPROVE:
      return (
        <ApproveBookingForm
          bookingId={bookingState.bookingData?.bookingId}
          proposedDateOptions={bookingState.bookingData?.proposedDateOptions}
        />
      );
    default:
      return <></>;
  }
};

export default ModalForm;
