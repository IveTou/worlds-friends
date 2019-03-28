export const setMap = map => {
  return dispatch => {
    if(map) {
      dispatch({ type: 'SET_MAP_SUCCESS', map });
    } else {
      dispatch({ type: 'SET_MAP_ERROR' });
    }
  }
}

export const getRoute = (origin, target) => {
  return (dispatch, getState ) => {
    const map = getState().map.map;
    const directionsService = new window.google.maps.DirectionsService();
    const directionsDisplay = new window.google.maps.DirectionsRenderer();  
    console.log(map);
    const route = { origin, target };
    dispatch({ type: 'GET_ROUTE_SUCCESS', route});
  }
}