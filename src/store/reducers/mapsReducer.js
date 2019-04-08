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
    case 'GET_DIRECTIONS_SUCCESS':
      console.log('Get directions succes');
      return {
        ...state,
        directions: action.result,
        mapsError: null,
      }
    case 'GET_DIRECTIONS_ERROR':
      console.log('Get directions error');
      return {
        ...state,
        directions: null,
        mapsError: action.status,
      }
      case 'ERASE_DIRECTIONS_SUCCESS':
        console.log('Erase directions success');
        return {
          ...state,
          directions: null,
        }
    default:
      return state;
  }
}

export default mapsReducer;