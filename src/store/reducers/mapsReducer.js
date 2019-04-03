const initState = {
  maps: null,
  targetUserId: null,
  directions: null,
  mapsError: null,
};

const mapsReducer = (state = initState, action) => {
  switch(action.type) {
    case 'SET_TARGET_SUCCESS':
      console.log('Set target succes');
      return {
        ...state,
        targetUserId: action.tuid,
        mapsError: null,
      }
    case 'SET_MAP_SUCCESS':
      console.log('Set map succes');
      return {
        ...state,
        maps: action.maps,
        mapsError: null,
      }
    default:
      return state;
  }
}

export default mapsReducer;