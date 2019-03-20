export const sendCurrentStatus = status => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { uid, email } = getState().firebase.auth;
    const { initials } = getState().firebase.profile;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    //SYNC_ISSUE
    uid && navigator.geolocation.getCurrentPosition(
      pos => {
        firebase.database().ref().child('users').child(uid).set({
          email,
          initials,
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