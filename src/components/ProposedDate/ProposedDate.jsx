import React from 'react';
import { Form } from 'react-bootstrap';

const ProposedDate = ({ options = [], proposedDate, name = 'proposedDate' }) => (
  <>
    {proposedDate ? <>{proposedDate}</> : options.map((option, index) => (
      <Form.Check
        key={option}
        type="radio"
        label={option}
        name={name}
        id={`proposedDate${index}`}
      />
    ))}
  </>
);

export default ProposedDate;
