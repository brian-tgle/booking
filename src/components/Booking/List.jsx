import React, { useEffect, useState } from 'react';
import {
  Badge, Button, Card, Table
} from 'react-bootstrap';
import Status from 'components/Booking/Status/Status';
import ProposedDate from 'components/Booking/ProposedDate/ProposedDate';
import BookingRepository from 'services/bookingRepository';
import useAuthentication from 'stores/authentication/authentication';
import useBookingStore from 'stores/booking/booking';
import { ACTION_TYPES, USER_ROLES } from 'common/constants';
import Loading from 'components/Loading/Loading';
import CreateBookingForm from './Form/Create';
import RejectBookingForm from './Form/Reject';
import BookingAction from './Action';
import BookingModal from './Modal';
import CancelBookingForm from './Form/Cancel';
import ApproveBookingForm from './Form/Approve';
import styles from './Booking.module.scss';

const BookingList = () => {
  const [loading, setLoading] = useState(false);
  const [bookingList, setBookingList] = useState([]);
  const [modalConfig, setModalConfig] = useState({});
  const [authenticationState] = useAuthentication();
  const [bookingState, bookingActions] = useBookingStore();

  const fetchData = (callback = () => {}) => {
    setLoading(true);
    BookingRepository.getAll(1, 20).then((response) => {
      setBookingList(response.data);
      callback();
    }).catch(() => {
      setBookingList([]);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (bookingState.bookingData?.type === ACTION_TYPES.REJECT) {
      setModalConfig({ title: 'Reject booking' });
      bookingActions.setShowModal(true);
    }
    if (bookingState.bookingData?.type === ACTION_TYPES.CANCEL) {
      setModalConfig({ title: 'Cancel booking' });
      bookingActions.setShowModal(true);
    }
    if (bookingState.bookingData?.type === ACTION_TYPES.APPROVE) {
      setModalConfig({ title: 'Approve booking' });
      bookingActions.setShowModal(true);
    }
  }, [bookingState.bookingData]);

  useEffect(() => {
    if (bookingState.needRefresh) {
      fetchData(bookingActions.setRefresh(false));
    }
  }, [bookingState.needRefresh]);

  const renderModalForm = (type) => {
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

  const handleCreate = () => {
    setModalConfig({ title: 'Create a new booking', size: 'xl' });
    bookingActions.setBookingData({
      type: ACTION_TYPES.CREATE
    });
    bookingActions.setShowModal(true);
  };

  return (
    <>
      <Card className="strpied-tabled-with-hover">
        <Card.Header>
          <Card.Title as="h3" className={styles.bookingHeader}>
            <Badge variant="secondary">List of booking</Badge>
            {authenticationState.user?.role === USER_ROLES.COMPANY ? (
              <Button onClick={handleCreate} size="sm" className="btn-fill pull-right">
                <i className="nc-icon nc-simple-add" />
                {' Create new booking'}
              </Button>
            ) : <></>}
          </Card.Title>
          <p className="card-category">
            Here is the list of booking make by user
          </p>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          {loading ? <Loading /> : (
            <Table className="table-hover table-striped">
              <thead>
                <tr>
                  <th className="border-0">#</th>
                  <th className="border-0">Type of event</th>
                  <th className="border-0 text-center">Location</th>
                  <th className="border-0 text-center">Proposed Date</th>
                  <th className="border-0">Status</th>
                  <th className="border-0 text-center">-</th>
                </tr>
              </thead>
              <tbody>
                {bookingList?.map((booking, index) => (
                  <tr key={booking?.id}>
                    <td className={styles.index}>{index + 1}</td>
                    <td className={styles.eventCategory}>
                      <Badge variant="info">{booking?.eventCategory?.name}</Badge>
                    </td>
                    <td className={styles.locationColumn}><b>{booking?.location}</b></td>
                    <td>
                      <ProposedDate
                        proposedDate={booking?.proposedDate}
                        options={booking?.proposedDateOptions || []}
                      />
                    </td>
                    <td>
                      <Status type={booking?.status} />
                    </td>
                    <td>
                      <BookingAction
                        status={booking?.status}
                        bookingId={booking?.id}
                        proposedDateOptions={booking?.proposedDateOptions || []}
                        rejectionReason={booking?.rejectionReason}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      <BookingModal
        title={modalConfig?.title}
        size={modalConfig?.size || 'md'}
        show={bookingState.showModal}
      >
        {renderModalForm(bookingState.bookingData?.type)}
      </BookingModal>
    </>
  );
};

export default BookingList;
