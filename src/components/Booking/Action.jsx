import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import useAuthentication from 'stores/authentication/authentication';
import BookingRepository from 'services/bookingRepository';
import { STATUS, USER_ROLES, ACTION_TYPES } from 'common/constants';
import useBookingStore from 'stores/booking/booking';
import styles from './Booking.module.scss';

const BookingAction = ({ status, bookingId }) => {
  const [error, setError] = useState(false);
  const [authenticationState] = useAuthentication();
  const [, bookingActions] = useBookingStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const handleCancel = () => {
    BookingRepository.cancel(bookingId).then(() => {
      bookingActions.setRefresh(true);
    }).catch(() => {
      setError(true);
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
          {error
            ? <i className={styles.rejectionReason}>Server error! Please try again later.</i>
            : <></>}
        </>
      );
    }
  }
  return <></>;
};

export default BookingAction;
