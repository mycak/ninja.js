import React from 'react';

const Page = ({ pageNumber, isActive, onChange }) => (
  <li className="page-item mr-1">
    <button
      className={`page-link ${isActive ? 'button-outline' : ''}`}
      onClick={() => onChange(pageNumber)}
    >
      {pageNumber + 1}
    </button>
  </li>
);

export default Page;
