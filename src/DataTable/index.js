import React, { useContext } from 'react';
import { store } from '../store.js';
import Pagination from './Pagination';
import Row from './Row';
import Search from './Search';
import { useDisplay, filtering } from '../utils/helpers';

const DataTable = () => {
  const { state, dispatch } = useContext(store);
  const [rowsInPageNumber, calculateTotalNumberOfPages] = useDisplay(state);

  const search = (e) => {
    const text = e.target.value;
    if (text) {
      dispatch({ type: 'ROWS_FILTER', payload: filtering(state.rows, text) });
    } else {
      dispatch({ type: 'ROWS_FILTER', payload: state.rows });
    }
  };

  const changeToPageNumber = (page) => {
    dispatch({ type: 'PAGE_CHANGE', payload: page });
  };

  return (
    <div>
      <Search onSearch={search} />
      <table>
        <tbody>
          {state.rowsToDisplay
            .map((row) => <Row key={row.per_id} row={row} />)
            .slice(...rowsInPageNumber)}
        </tbody>
      </table>
      <Pagination
        currentPageNumber={state.currentPageNumber}
        totalNumberOfPages={calculateTotalNumberOfPages}
        onChange={changeToPageNumber}
      />
    </div>
  );
};

export default DataTable;
