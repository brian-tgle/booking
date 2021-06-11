import React from 'react';
import { STATUS } from 'common/constants';
import { Badge } from 'react-bootstrap';

const Status = ({ type }) => {
  switch (type) {
    case STATUS.PENDING_REVIEW:
      return (
        <Badge variant="warning">
          <i className="nc-icon nc-support-17" />
          {' Pending'}
        </Badge>
      );
    case STATUS.APPROVED:
      return (
        <Badge variant="success">
          <i className="nc-icon nc-check-2" />
          {' Approved'}
        </Badge>
      );
    case STATUS.REJECTED:
      return (
        <Badge variant="danger">
          <i className="nc-icon nc-simple-remove" />
          {' Rejected'}
        </Badge>
      );
    default:
      return <></>;
  }
};

export default Status;
