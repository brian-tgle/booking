import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ totalPages, currentPage, handleChangePage }) => (
  <Pagination className="justify-center">
    <Pagination.First />
    <Pagination.Prev />
    {[...new Array(totalPages)].map((_, index) => (
      <Pagination.Item
        active={currentPage === index + 1}
        key={index.toString()}
        onClick={() => handleChangePage(index + 1)}
      >
        {index + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next />
    <Pagination.Last />
  </Pagination>
);

export default CustomPagination;
