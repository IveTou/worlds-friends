export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(()=> {
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err })
      });
    })
    .catch(err => console.log(err.message));
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
    .then(()=>{
      dispatch({ type: 'SIGNOUT_SUCESS'});
    })
    .catch(err => {
      dispatch({ type: 'SIGNOUT_ERROR', err});
    });
  }
}