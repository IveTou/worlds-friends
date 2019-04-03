const initState = {
  map: null,
  targetUserId: null,
  directions: null,
  mapError: null,
};

const activityReducer = (state = initState, action) => {
  switch(action.type) {
    case 'SET_TARGET_SUCCESS':
      console.log('Set target succes');
      return {
        ...state,
        targetUserId: action.tuid,
        mapError: null,
      }
    case 'SET_MAP_SUCCESS':
      console.log('Set map succes');
      return {
        ...state,
        map: action.map,
        mapError: null,
      }
    default:
      return state;
  }
}

export default activityReducer;