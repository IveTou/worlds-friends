const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      console.log('Login success');
      return {
        ...state,
        authError: null
      };
    case 'LOGIN_ERROR':
      console.log('Login error');
      return {
        ...state,
        authError: 'Login failed'
      }
    case 'SIGNOUT_SUCESS':
      console.log('Signout sucess');
      return state;
    case 'SIGNOUT_ERROR':
      console.log('Signout error: ' + action.err.message);
      return state;    
    default:
      return state;
  }
}

export default authReducer;