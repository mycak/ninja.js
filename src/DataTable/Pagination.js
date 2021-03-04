import React from 'react';
import Page from './Page';

const Pagination = ({ currentPageNumber, totalNumberOfPages, onChange }) => (
  <>
    {totalNumberOfPages <= 1 && null}
    {totalNumberOfPages > 1 && (
      <ul className="pagination">
        {[...Array(totalNumberOfPages)].map((e, i) => (
          <Page
            key={i}
            currentPageNumber={currentPageNumber}
            pageNumber={i}
            onChange={onChange}
            isActive={i === currentPageNumber}
          />
        ))}
      </ul>
    )}
  </>
);

export default Pagination;
