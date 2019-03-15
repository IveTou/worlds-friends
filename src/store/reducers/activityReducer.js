const initState = {
  updateError: null,
};

const activityReducer = (state = initState, action) => {
  switch(action.type) {
    case 'STATUS_UPDATE_SUCCESS':
      console.log('Status update succeeded');
      return {
        ...state,
        updateError: null,
      }
    case 'STATUS_UPDATE_ERROR':
      console.log('Status update error');
      return {
        ...state,
        authError: 'Status update failed'
      }
    default:
      return state;
  }
}

export default activityReducer;