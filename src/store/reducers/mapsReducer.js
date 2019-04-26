const initState = {
  maps: null,
  stagedMarkers: [],
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
    case 'SET_MARKERS_SUCCESS':
      console.log('Set markers succes');
      return {
        ...state,
        stagedMarkers: action.stagedMarkers,
        mapsError: null,
      }
    case 'ERASE_MARKERS_SUCCESS':
      console.log('Erase markers succes');
      return {
        ...state,
        stagedMarkers: [],
        mapsError: null,
      }
    case 'GET_DIRECTIONS_SUCCESS':
      console.log('Get directions succes');
      return {
        ...state,
        directions: action.result,
        mapsError: null,
      }
    case 'ERASE_DIRECTIONS_SUCCESS':
      console.log('Erase directions succes');
      return {
        ...state,
        directions: null,
        mapsError: null,
      }
    case 'GET_DIRECTIONS_ERROR':
      return {
        ...state,
        directions: null,
        mapsError: action.status,
      }
    default:
      return state;
  }
}

export default mapsReducer;