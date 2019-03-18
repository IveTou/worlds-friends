export const sendCurrentStatus = status => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const authorId = getState().firebase.auth.uid;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    //SYNC_ISSUE
    authorId && navigator.geolocation.getCurrentPosition(
      pos => {
        firebase.database().ref().child('users').child(authorId).set({ 
          timestamp: new Date().getTime(), 
          coordinates: { 
            longitude: pos.coords.longitude, 
            latitude: pos.coords.latitude, 
          }
        })
        .then(() => {
          dispatch({ type: 'STATUS_UPDATE_SUCCESS' });
        })
        .catch(err => {
          dispatch({ type: 'STATUS_UPDATE_ERROR', err })
        });
      },
      err => {
        dispatch({ type: 'GET_GEOLOCATION_ERROR', err })
      },
      options
    )
  }
}