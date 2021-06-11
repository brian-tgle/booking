import React, { useEffect, useState } from 'react';
import {
  Badge, Button, Card, Table
} from 'react-bootstrap';
import Status from 'components/Booking/Status/Status';
import ProposedDate from 'components/Booking/ProposedDate/ProposedDate';
import BookingRepository from 'services/bookingRepository';
import useAuthentication from 'stores/authentication/authentication';
import useBookingStore from 'stores/booking/booking';
import { ACTION_TYPES, USER_ROLES, PAGINATION } from 'common/constants';
import CustomPagination from 'components/Booking/List/Pagination';
import Loading from 'components/Loading/Loading';
import ModalForm from '../Modal/ModalForm';
import BookingAction from '../Action';
import BookingModal from '../Modal/Modal';
import styles from '../Booking.module.scss';
import TableHead from './TableHead';

const BookingList = () => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: PAGINATION.DEFAULT_PAGE, totalPages: 0
  });
  const [bookingList, setBookingList] = useState([]);
  const [modalConfig, setModalConfig] = useState({});
  const [authenticationState] = useAuthentication();
  const [bookingState, bookingActions] = useBookingStore();

  const fetchData = (callback = () => {}, page = 1) => {
    setLoading(true);
    BookingRepository.getAll(page, PAGINATION.PAGE_SIZE).then((response) => {
      setBookingList(response.data);
      setPagination((prevState) => ({ ...prevState, totalPages: response.totalPages }));
      callback();
    }).catch(() => {
      setBookingList([]);
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleChangePage = (currentPage) => {
    setPagination((prevState) => ({ ...prevState, currentPage }));
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
      if (pagination.currentPage !== PAGINATION.DEFAULT_PAGE) {
        handleChangePage(1);
      }
      fetchData(bookingActions.setRefresh(false));
    }
  }, [bookingState.needRefresh]);

  useEffect(() => {
    fetchData(() => {}, pagination.currentPage);
  }, [pagination.currentPage]);

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
            <>
              <Table className="table-hover table-striped">
                <TableHead />
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
              <CustomPagination
                totalPages={pagination.totalPages}
                currentPage={pagination.currentPage}
                handleChangePage={handleChangePage}
              />
            </>
          )}
        </Card.Body>
      </Card>
      <BookingModal
        title={modalConfig?.title}
        size={modalConfig?.size || 'md'}
        show={bookingState.showModal}
      >
        <ModalForm />
      </BookingModal>
    </>
  );
};

export default BookingList;
