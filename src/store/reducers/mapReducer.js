const initState = {
  directions: null,
  mapError: null,
};

const activityReducer = (state = initState, action) => {
  switch(action.type) {
    case 'GET_DIRECTIONS_SUCCESS':
      console.log('Get directions sucess', action.result);
      return {
        ...state,
        directions: action.result,
        mapError: null,
      }
    case 'GET_DIRECTIONS_ERROR':
      console.log('Get directions error: \n', action.status);
      return {
        ...state,
        directions: null,
        mapError: `Get directions failed with status: ${action.status}`,
      }
    default:
      return state;
  }
}

export default activityReducer;