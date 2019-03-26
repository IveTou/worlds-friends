const initState = {
  open: false,
  title: null,
  message: null,
  hasLoader: false,
  countDown: null,
  agree: false,
  disagree: false,
};

const dialogReducer = (state = initState, action) => {
  switch(action.type) {
    case 'OPEN_DIALOG':
      console.log('Open dialog');
      return {
        ...state,
        open: true,
        title: action.title,
        message: action.message,
        hasProgress: action.hasProgress,
        countDown: action.countDown,
        agree: action.agree,
        disagree: action.disagree,
      };
    case 'CHANGE_DIALOG':
      console.log('Change dialog');
      return {
        ...state,
        title: action.title,
        message: action.message,
        hasProgress: action.hasProgress,
        countDown: action.countDown,
        agree: action.agree,
        disagree: action.disagree,
      };
    case 'CLOSE_DIALOG':
      console.log('Close dialog.');
      return {
        ...state, 
        open: false,
        title: null,
        message: null,
        hasProgress: false,
        countDown: null,
        agree: false,
        disagree: false,
      };
    default:
      return state;
  }
}

export default dialogReducer;