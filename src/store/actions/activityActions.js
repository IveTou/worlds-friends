import googleMapsClient from '../../config/gmConfig';

export const sendCurrentStatus = () => {
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
        const address =  {
          coordinates: { 
            longitude: pos.coords.longitude, 
            latitude: pos.coords.latitude,
          } 
        };

        firebase.database().ref().child('users').child(uid).update({
          email,
          initials,
          timestamp: firebase.database.ServerValue.TIMESTAMP, 
          address,
        })
        .then(() => {
          dispatch({ type: 'STATUS_UPDATE_SUCCESS', address });
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

export const getDetailedInfo = () => {
  return (dispatch, getState, { getFirebase }) => {
    console.log(getState().activity.adress);
    /* const { coordinates: { latitude, longitude }} = getState().activity.address;

    googleMapsClient.geocode({ address:[latitude, longitude].join() })
      .asPromise()
      .then(res => dispatch({ 
        type: 'REVERSE_GEOCODE_SUCCESS', 
        address: { 
          formatted: res.json.results[0].formatted_address, 
          coordinates: {}, //There is a little difference from the coordinate retrieved from API
          placeId: res.json.results[0].place_id, 
          response: res.json.results[0],
        } 
      }))
      .catch(err => dispatch({ type: 'REVERSE_GEOCODE_ERROR', err})); */
  }
}

export const getRoute = (origin, target) => {
  return (dispatch, getState, { getFirebase }) => {
    const route = { origin, target };
    dispatch({ type: 'GET_ROUTE_SUCCESS', route });
  }
}