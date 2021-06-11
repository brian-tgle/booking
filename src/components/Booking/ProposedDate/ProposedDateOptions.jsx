import React from 'react';
import { Form } from 'react-bootstrap';
import formatDate from 'ultis/date';

const ProposedDateOptions = ({
  options = [],
  handleBlur,
  handleChange,
  name = 'proposedDate'
}) => (
  <>
    {options.map((option, index) => (
      <Form.Check
        key={option}
        type="radio"
        label={formatDate(option)}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        value={option}
        id={`proposedDate${index}`}
      />
    ))}
  </>
);

export default ProposedDateOptions;
