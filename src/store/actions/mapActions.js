export const getRoute = (origin, target) => {
  return (dispatch, getState, { getFirebase }) => {
    const route = { origin, target };
    dispatch({ type: 'GET_ROUTE_SUCCESS', route });
  }
}