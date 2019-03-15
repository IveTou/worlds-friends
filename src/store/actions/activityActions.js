export const sendCurrentStatus = status => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const authorId = getState().firebase.auth.uid;

    firebase.database().ref().child(authorId).set({ 
      time: new Date().getTime(), 
      coordinates: { lng: null, lat: null }
    })
    .then(() => {
      dispatch({ type: 'STATUS_UPDATE_SUCCESS' });
    })
    .catch(err => {
      dispatch({ type: 'STATUS_UPDATE_ERROR', err })
    });
  }
}