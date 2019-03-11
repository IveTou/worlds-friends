export const createProject = project => {
  return (dispatch, getState) => {
    //make an async call to database
    dispatch({ type: 'CREATE_PROJECT', project })
  }
}