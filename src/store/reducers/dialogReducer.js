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
  const { 
    type, 
    status: { 
      title, 
      message, 
      hasProgress, 
      countDown,
      agree,
      disagree,
    },
  } = action;

  switch(type) {
    case 'OPEN_DIALOG':
      console.log('Open dialog');
      return {
        ...state,
        open: true,
        title,
        message,
        hasProgress,
        countDown,
        agree,
        disagree,
      };
    case 'CHANGE_DIALOG':
      console.log('Change dialog');
      return {
        ...state,
        title,
        message,
        hasProgress,
        countDown,
        agree,
        disagree,
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