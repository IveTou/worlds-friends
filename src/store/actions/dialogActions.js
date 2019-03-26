export const openDialog = status => {
  return (dispatch) => {
    dispatch({ type: 'OPEN_DIALOG', status });
  }
}

export const changeDialog = status => {
  return (dispatch) => {
    dispatch({ type: 'OPEN_DIALOG', status });
  }
}

export const closeDialog = () => {
  return (dispatch) => {
    dispatch({ type: 'OPEN_DIALOG' });
  }
}