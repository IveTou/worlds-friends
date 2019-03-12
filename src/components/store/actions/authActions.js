export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().sighInWithEmailAndPassword({
    })
    .then(() => {
      dispatch({ type: 'CREATE_PROJECT', project })
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', err })
    });
  }
}