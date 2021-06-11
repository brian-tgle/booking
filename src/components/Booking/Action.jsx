import React from 'react';
import { Button } from 'react-bootstrap';
import useAuthentication from 'stores/authentication/authentication';
import { STATUS, USER_ROLES, ACTION_TYPES } from 'common/constants';
import useBookingStore from 'stores/booking/booking';
import styles from './Booking.module.scss';

const BookingAction = ({ status, bookingId }) => {
  const [authenticationState] = useAuthentication();
  const [, bookingActions] = useBookingStore();

  const handleCancel = () => {
    bookingActions.setBookingData({
      type: ACTION_TYPES.CANCEL,
      bookingId
    });
  };

  const handleReject = () => {
    bookingActions.setBookingData({
      type: ACTION_TYPES.REJECT,
      bookingId
    });
  };

  const handleApprove = () => {

  };

  if (status === STATUS.PENDING_REVIEW) {
    if (authenticationState?.user?.role === USER_ROLES.ADMIN) {
      return (
        <div className={styles.adminAction}>
          <Button variant="danger" onClick={handleReject} size="sm">
            <i className="nc-icon nc-simple-remove" />
            {' Reject'}
          </Button>
          <Button variant="success" onClick={handleApprove} size="sm">
            <i className="nc-icon nc-check-2" />
            {' Approve'}
          </Button>
        </div>
      );
    }
    if (authenticationState?.user?.role === USER_ROLES.COMPANY) {
      return (
        <>
          <Button variant="danger" onClick={handleCancel} size="sm">Cancel</Button>
        </>
      );
    }
  }
  return <></>;
};

export default BookingAction;
