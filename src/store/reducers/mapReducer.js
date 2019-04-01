const initState = {
  map: null,
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
    case 'ERASE_DIRECTIONS_SUCCESS':
      console.log('Erase directions succes');
      return {
        ...state,
        directions: null,
        mapError: null,
      }
    case 'SET_MAP_SUCCESS':
      console.log('Set map succes');
      return {
        ...state,
        map: action.map,
      }
    default:
      return state;
  }
}

export default activityReducer;