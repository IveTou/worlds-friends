import { pick } from 'lodash';
import googleMapsClient from '../../config/gmConfig';

export const sendCurrentStatus = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { uid, email } = getState().firebase.auth;
    const { initials, isEmpty } = getState().firebase.profile;
    const adressState = getState().activity.address || {};

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    //SYNC_ISSUE 
    uid && navigator.geolocation.getCurrentPosition(
      pos => {
        const address =  {
          ...adressState,
          coordinates: { 
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude, 
          } 
        };

        !isEmpty && firebase.database().ref().child('users').child(uid).update({
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
  return (dispatch, getState ) => {
    const { coordinates: { latitude, longitude }} = getState().activity.address;

    googleMapsClient.geocode({ address:[latitude, longitude].join() })
      .asPromise()
      .then(res => {
        const {formatted_address: formatted, place_id: placeId } = pick(res.json.results[0], ['formatted_address', 'place_id']);
        const { geometry: { location: { lat: latitude, lng: longitude}}} = res.json.results[0];
        dispatch({ 
          type: 'REVERSE_GEOCODE_SUCCESS',
          address: {
            placeId,
            formatted,
            coordinates: { latitude, longitude }
          }
        });
      })
      .catch(err => dispatch({ type: 'REVERSE_GEOCODE_ERROR', err}));
  }
}

export const getRoute = (origin, target) => {
  return (dispatch, getState, { getFirebase }) => {
    const route = { origin, target };
    dispatch({ type: 'GET_ROUTE_SUCCESS', route });
  }
}