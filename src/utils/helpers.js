export const filtering = (data, text) =>
  data.filter((item) => {
    return (
      item.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
      (item.email && item.email.toLowerCase().search(text.toLowerCase()) > -1)
    );
  });

export const useDisplay = (state) => {
  const startIndex = state.currentPageNumber * state.rowsPerPage;
  const rowsInPageNumber = [startIndex, startIndex + state.rowsPerPage];
  const calculateTotalNumberOfPages =
    state.rowsToDisplay.length === 0
      ? 0
      : Math.ceil(state.rowsToDisplay.length / state.rowsPerPage);
  return [rowsInPageNumber, calculateTotalNumberOfPages];
};
