import React from 'react';
import {
  Badge, Button, Card, Table
} from 'react-bootstrap';
import Status from 'components/Status/Status';
import ProposedDate from 'components/ProposedDate/ProposedDate';

const BookingList = () => (
  <Card className="strpied-tabled-with-hover">
    <Card.Header>
      <Card.Title as="h3"><Badge variant="secondary">List of booking</Badge></Card.Title>
      <p className="card-category">
        Here is the list of booking make by user
      </p>
    </Card.Header>
    <Card.Body className="table-full-width table-responsive px-0">
      <Table className="table-hover table-striped">
        <thead>
          <tr>
            <th className="border-0">#</th>
            <th className="border-0">Type of event</th>
            <th className="border-0">Location</th>
            <th className="border-0">Proposed Date</th>
            <th className="border-0">Status</th>
            <th className="border-0">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <Badge variant="info">Health Talk</Badge>
            </td>
            <td><b>123 Cong Hoa, Phuong 12, Tan Binh, HCM - Room 104</b></td>
            <td>
              <ProposedDate options={['123', '1234', '12356']} />
            </td>
            <td>
              <Status type="approved" />
            </td>
            <td>
              <Button variant="danger" size="sm">Reject</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

export default BookingList;
