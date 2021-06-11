import React from 'react';
import { Badge } from 'react-bootstrap';
import formatDate from 'ultis/date';
import styles from '../Booking.module.scss';

const ProposedDate = ({ options = [], proposedDate }) => (
  <>
    {proposedDate ? (
      <ul className={styles.proposedDateOptions}>
        <li><Badge variant="success">{formatDate(proposedDate)}</Badge></li>
      </ul>
    )
      : (
        <ul className={styles.proposedDateOptions}>
          {options.map((option) => (
            <li key={option}>
              <Badge variant="warning">{formatDate(option)}</Badge>
            </li>
          ))}

        </ul>
      )}
  </>
);

export default ProposedDate;
