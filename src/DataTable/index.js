import React, { useContext } from 'react';
import { store } from '../store.js';
import Pagination from './Pagination';
import Row from './Row';
import Search from './Search';

const DataTable = () => {
  const { state, dispatch } = useContext(store);

  const calculateTotalNumberOfPages = (state) =>
    state.rowsToDisplay.length === 0
      ? 0
      : Math.ceil(state.rowsToDisplay.length / state.rowsPerPage);

  const search = (e) => {
    const text = e.target.value;
    let rowsFound = state.rows;
    if (text) {
      rowsFound = state.rows.filter((row) => {
        return (
          row.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
          (row.email && row.email.toLowerCase().search(text.toLowerCase()) > -1)
        );
      });
      dispatch({ type: 'ROWS_FILTER', payload: rowsFound });
    } else {
      dispatch({ type: 'ROWS_FILTER', payload: state.rows });
    }
  };

  const changeToPageNumber = (page) => {
    dispatch({ type: 'PAGE_CHANGE', payload: page });
  };

  const rowsInPageNumber = (pageNumber) => {
    const startIndex = pageNumber * state.rowsPerPage;
    return [startIndex, startIndex + state.rowsPerPage];
  };

  return (
    <div>
      <Search onSearch={search} />
      <table>
        <tbody>
          {state.rowsToDisplay
            .map((row) => <Row key={row.per_id} row={row} />)
            .slice(...rowsInPageNumber(state.currentPageNumber))}
        </tbody>
      </table>
      <Pagination
        currentPageNumber={state.currentPageNumber}
        totalNumberOfPages={calculateTotalNumberOfPages(state)}
        onChange={changeToPageNumber}
      />
    </div>
  );
};

export default DataTable;
