const initState = {
  route: null,
  mapError: null,
};

const activityReducer = (state = initState, action) => {
  switch(action.type) {
    case 'GET_ROUTE_SUCCESS':
      console.log('Get route sucess', action.result);
      return {
        ...state,
        route: action.route,
        mapError: null,
      }
    case 'GET_ROUTE_ERROR':
      console.log('Get route error: \n', action.status);
      return {
        ...state,
        route: null,
        mapError: `Get route failed with status: ${action.status}`,
      }
    default:
      return state;
  }
}

export default activityReducer;