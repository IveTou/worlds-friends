const initState = {
  map: null,
  route: null,
  mapError: null,
};

const activityReducer = (state = initState, action) => {
  switch(action.type) {
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