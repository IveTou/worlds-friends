import { pick } from 'lodash';
import { googleMapsClient } from '../../config/maps';

const geolocationOpt = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export const sendPosition = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { uid } = getState().firebase.auth;
    const { directions } = getState().maps;
    const { 
      isEmpty, 
      firstName, 
      lastName, 
      initials 
    } = getState().firebase.profile;

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const point = [latitude, longitude].join();
        const status = {
          timestamp: firebase.database.ServerValue.TIMESTAMP, 
          firstName,
          lastName,
          initials,
          address: { latitude, longitude },
        }

        directions 
        ? googleMapsClient.nearestRoads({ points: point })
          .asPromise()
          .then(({ json: { snappedPoints } }) => {
            console.log(`We are using Roads' position correction now.`);
            !isEmpty && snappedPoints && storeUserStatus(
              dispatch, 
              firebase, 
              uid, 
              {
                ...status,
                address: {
                  ...snappedPoints[0].location ,
                  placeId: snappedPoints[0].placeId,
                },
              }
            );
          })
          .catch(err => {
            !isEmpty && storeUserStatus(dispatch, firebase, uid, status);
            dispatch({ 
              type: 'GET_GEOLOCATION_ERROR', 
              err: err + (!isEmpty && `Due to the error, the navigator's geolocation has placed.`), 
            });
          })
        : !isEmpty && storeUserStatus(dispatch, firebase, uid, status);
      },
      err => dispatch({ type: 'GET_GEOLOCATION_ERROR', err }),
      geolocationOpt
    );
  }
}

const storeUserStatus = (dispatch, firebase, uid, status) => {
  firebase.database().ref().child('users').child(uid).update({...status})
    .then(() => {
      dispatch({ 
        type: 'SEND_POSITION_SUCCESS', 
        status: pick(status, ['timestamp', 'address'])
      });
    })
    .catch(err => {
      dispatch({ type: 'SEND_POSITION_ERROR', err })
    });
}

/* export const getDetailedInfo = () => {
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
} */