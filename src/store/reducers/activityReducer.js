const initState = {
  updateError: null,
  status: null,
};

const activityReducer = (state = initState, action) => {
  switch(action.type) {
    case 'SEND_POSITION_SUCCESS':
      console.log('Send position sucess');
      return {
        status: action.status,
        updateError: null,
      }
    case 'SEND_POSITION_ERROR':
      console.log('Send position error');
      return {
        ...state,
        updateError: 'Send position error' + action.err
      }
    case 'GET_GEOLOCATION_ERROR':
      console.log('Get location error');
      //console.log(action.err);
      return {
        ...state,
        updateError: 'Get location failed' + action.err,
      }
    default:
      return state;
  }
}

export default activityReducer;