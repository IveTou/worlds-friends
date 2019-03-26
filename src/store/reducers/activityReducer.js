const initState = {
  updateError: null,
  address: null,
  targetUser: null,
};

const activityReducer = (state = initState, action) => {
  switch(action.type) {
    case 'STATUS_UPDATE_SUCCESS':
      console.log('Status update sucess');
      return {
        ...state,
        updateError: null,
      }
    case 'STATUS_UPDATE_ERROR':
      console.log('Status update error');
      return {
        ...state,
        updateError: 'Status update failed'
      }
    case 'GET_GEOLOCATION_ERROR':
      console.log('Get location error');
      return {
        ...state,
        updateError: 'Get location failed',
      }
    case 'REVERSE_GEOCODE_SUCCESS':
      console.log('Reverse geocode sucess');
      return {
        ...state,
        address: action.address,
        updateError: null,
      }
    case 'REVERSE_GEOCODE_ERROR':
      console.log('Reverse geocode failed');
      return {
        ...state,
        updateError: 'Reverse geocode failed',
      }
    case 'CREATE_USER_SUCCESS':
      console.log('Create user sucess');
      return {
        ...state,
        updateError: null,
      }
    case 'DELETE_USER_SUCCESS':
      console.log('Delete user sucess');
      return {
        ...state,
        updateError: null
      }
    case 'SELECT_TARGET_USER_SUCCESS':
      console.log('Select target user sucess');
      return {
        ...state,
        targetUser: action.targetUser,
        updateError: null,
      }
    default:
      return state;
  }
}

export default activityReducer;