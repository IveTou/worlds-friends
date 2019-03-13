export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().sighInWithEmailAndPassword(
      credentials.email,
      credentials.password
    )
    .then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' })
    })
    .catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err })
    });
  }
}