import googleMapsClient from '../../config/gmConfig';

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
        const coordinates = { 
          longitude: pos.coords.longitude, 
          latitude: pos.coords.latitude, 
        };

        firebase.database().ref().child('users').child(uid).update({
          email,
          initials,
          timestamp: firebase.database.ServerValue.TIMESTAMP, 
          coordinates,
        })
        .then(() => {
          dispatch({ type: 'STATUS_UPDATE_SUCCESS' });
        })
        .catch(err => {
          dispatch({ type: 'STATUS_UPDATE_ERROR', err })
        });

        googleMapsClient.geocode({ address:[coordinates.latitude, coordinates.longitude].join() })
          .asPromise()
          .then(res => dispatch({ 
            type: 'REVERSE_GEOCODE_SUCCESS', 
            address: res.json.results[0].formatted_address 
          }))
          .catch(err => dispatch({ type: 'REVERSE_GEOCODE_ERROR', err}));
      },
      err => {
        dispatch({ type: 'GET_GEOLOCATION_ERROR', err })
      },
      options
    )
  }
}