import React from 'react';
import { Badge } from 'react-bootstrap';
import BookingAction from '../Action';
import ProposedDate from '../ProposedDate/ProposedDate';
import Status from '../Status/Status';
import styles from '../Booking.module.scss';

const BookingTableRow = ({ booking, index }) => (
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
);

export default BookingTableRow;
