const initState = {
  map: null,
  targetUserId: null,
  directions: null,
  mapError: null,
};

const activityReducer = (state = initState, action) => {
  switch(action.type) {
    case 'GET_DIRECTIONS_SUCCESS':
      console.log('Get directions sucess');
      return {
        ...state,
        directions: action.result,
        mapError: null,
      }
    case 'GET_DIRECTIONS_ERROR':
      console.log('Get directions error');
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
    case 'SET_TARGET_SUCCESS':
      console.log('Set target succes');
      return {
        ...state,
        targetUserId: action.tuid,
        mapError: null,
      }
    default:
      return state;
  }
}

export default activityReducer;