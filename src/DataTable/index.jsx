import React, { useContext, useState } from 'react';
import { store } from '../store.js';
import Pagination from './Pagination'
import Row from './Row'
import Search from './Search'

const DataTable = ({rowsPerPage}) => {

  const rows = useContext(store)

  const calculateTotalNumberOfPages = rows => rows === 0 ? 0 : Math.ceil(rows.length / rowsPerPage)

  const [state, setState] = useState({
    rows: rows.state,
    currentPageNumber: 0,
    totalNumberOfPages: calculateTotalNumberOfPages(rows.state),
  })

  console.log(state)

  const search = (e) => {
    const text = e.target.value
    let rowsFound = rows;
    if (text) {
      rowsFound = rows.filter((row) => {
        return row.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
         (row.email && row.email.toLowerCase().search(text.toLowerCase()) > -1)

        })
    }
    setState({
      rows: rowsFound,
      currentPageNumber: 0,
      totalNumberOfPages: calculateTotalNumberOfPages(rowsFound)
    })
  }
  const changeToPageNumber =(pageNumber) => {
    setState({...state, currentPageNumber: pageNumber })
  }
  const rowsInPageNumber = (pageNumber) => {
    const startIndex = pageNumber * rowsPerPage
    return [startIndex, startIndex + rowsPerPage]
  }

  return(
    <div>
      <Search onSearch={search} />
      <table>
        <tbody>
          {state.rows.map(row => <Row key={row.per_id} row={row}/>).slice(...rowsInPageNumber(state.currentPageNumber))}
        </tbody>
      </table>
      <Pagination
        currentPageNumber={state.currentPageNumber}
        totalNumberOfPages={state.totalNumberOfPages}
        onChange={changeToPageNumber} />
    </div>
  )
}

export default DataTable
