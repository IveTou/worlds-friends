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
    case 'SIGNOUT_SUCCESS':
      console.log('Signout SUCCESS');
      return state;
    case 'SIGNOUT_ERROR':
      console.log('Signout error');
      return state;   
    case 'SIGNUP_SUCCESS':
    return {
      ...state,
      authError: null
    }
    case 'SIGNUP_ERROR':
      console.log('Signup error');
      return {
        ...state,
        authError: action.err.message
      }  
    default:
      return state;
  }
}

export default authReducer;