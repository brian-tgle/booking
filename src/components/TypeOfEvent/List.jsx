import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import {
  Badge, Button, Card, Table
} from 'react-bootstrap';
import EventCategoryRepository from 'services/eventCategoryRepository';
import useTypeOdEventStore from 'stores/typeOfEvent/typeOfEvent';
import bookingStyles from '../Booking/Booking.module.scss';

const TypeOfEventList = () => {
  const [loading, setLoading] = useState(true);
  const [typeOfEvent, setTypeOfEvent] = useState([]);
  const [typeOfEventState, typeOfEventActions] = useTypeOdEventStore();

  const fetchData = (callback = () => {}) => {
    EventCategoryRepository.getAll().then((response) => {
      setTypeOfEvent(response.data);
      setLoading(false);
      callback();
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (typeOfEventState.needRefresh) {
      setLoading(true);
      fetchData(typeOfEventActions.setRefresh(false));
    }
  }, [typeOfEventState.needRefresh]);

  const handleUpdate = (data) => {
    typeOfEventActions.setUpdateData(data);
  };

  const handleRemove = (id) => {
    EventCategoryRepository.delete(id).then(() => {
      typeOfEventActions.setRefresh(true);
    });
  };

  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header>
        <Card.Title as="h3">
          <Badge variant="secondary">List of event type</Badge>
        </Card.Title>
      </Card.Header>
      <Card.Body className="table-full-width table-responsive px-0">
        {loading ? <Loading /> : (
          <>
            <Table className="table-hover table-striped">
              <thead>
                <tr>
                  <th className="border-0">#</th>
                  <th className="border-0">Name</th>
                  <th className="border-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {typeOfEvent?.map((event, index) => (
                  <tr key={event.id}>
                    <td>{index + 1}</td>
                    <td><Badge variant="info">{event?.name}</Badge></td>
                    <td>
                      <div className={bookingStyles.adminAction}>
                        <Button variant="danger" onClick={() => handleRemove(event?.id)} size="sm">
                          <i className="nc-icon nc-simple-remove" />
                          {' Remove'}
                        </Button>
                        <Button variant="success" onClick={() => handleUpdate(event)} size="sm">
                          <i className="nc-icon nc-check-2" />
                          {' Update'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TypeOfEventList;
