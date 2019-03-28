const initState = {
  map: null,
  route: null,
  mapError: null,
};

const activityReducer = (state = initState, action) => {
  switch(action.type) {
    case 'SET_MAP_SUCCESS':
      console.log('Set map sucess');
      return {
        ...state,
        map: action.map,
        mapError: null,
      }
    case 'SET_MAP_ERROR':
      console.log('Set map error');
      return {
        ...state,
        mapError: 'Set map failed',
      }
    case 'GET_ROUTE_SUCCESS':
      console.log('Get route sucess', action.route);
      return {
        ...state,
        route: action.route,
        mapError: null,
      }
    case 'GET_ROUTE_ERROR':
      console.log('Get route error');
      return {
        ...state,
        route: null,
        mapError: 'Get route failed',
      }
    default:
      return state;
  }
}

export default activityReducer;