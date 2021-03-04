import React, { createContext, useReducer } from 'react';
import { usersData } from './data';

const defaultState = {
  rows: usersData,
  rowsToDisplay: usersData,
  currentPageNumber: 0,
  rowsPerPage: 2,
};

const store = createContext(defaultState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ROWS_FILTER':
        return {
          ...state,
          rowsToDisplay: action.payload,
          currentPageNumber: 0,
        };
      case 'PAGE_CHANGE':
        return {
          ...state,
          currentPageNumber: action.payload,
        };
      default:
        throw new Error();
    }
  }, defaultState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
