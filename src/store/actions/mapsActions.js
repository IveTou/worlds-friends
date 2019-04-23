import { map } from 'lodash';

const googleMaps = window.google.maps;
const DirectionsService = new googleMaps.DirectionsService();
const DistanceService = new googleMaps.DistanceMatrixService();

export const setTargetUserId = tuid => {
  return dispatch => {
    dispatch({ type: 'SET_TARGET_SUCCESS', tuid});
  }
}

export const setMaps = maps => {
  return dispatch => {
    dispatch({ type: 'SET_MAP_SUCCESS', maps});
  }
}

export const setMarkers = stagedMarkers => {
  return dispatch => {
    dispatch({ type: 'SET_MARKERS_SUCCESS', stagedMarkers });
  }
}

export const getDirections = (ori = {}, des = {}, way = []) => {
  return dispatch => {
    const origin = ori.placeId ?
      { placeId: ori.placeId} : 
      { lat: ori.latitude, lng:  ori.longitude };

    const destination = des.placeId ?
      { placeId: des.placeId} : 
      { lat: des.latitude, lng:  des.longitude };

    const waypoints = way ? 
      map(way, ({ location, stopover }) => {
        const loc =  location.placeId ?
          { placeId: location.placeId} : 
          { lat: location.latitude, lng:  location.longitude };

        return { location: loc, stopover };
      }) :
      null;
    
    DirectionsService.route(
      {
        origin,
        destination,
        travelMode: googleMaps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(Date.now()),
        },
        waypoints: waypoints  || [],
        optimizeWaypoints: true,//Maybe it is worth to tell users about this rearrange
        avoidFerries: true,
        region: 'BR',
      }, 
      (result, status) => {
        if (status === googleMaps.DirectionsStatus.OK) {
          dispatch({ type: 'GET_DIRECTIONS_SUCCESS', result});
        } else {
          dispatch({ type: 'GET_DIRECTIONS_ERROR', status});
        }
      }
    );
  }
}

export const eraseDirections = () => {
  return dispatch => {
    dispatch({ type: 'ERASE_DIRECTIONS_SUCCESS'});
  }
}

export const getDistance = (origin = {}, destination = {}, func = () => {}) => {
  return dispatch => {
    DistanceService.getDistanceMatrix(
      {
        origins: [origin.placeId || [origin.latitude, origin.longitude].join()],
        destinations: [destination.placeId || [destination.latitude, destination.longitude].join()],
        travelMode: googleMaps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(Date.now()),
        },
      }, 
      res => {
        dispatch({ 
          type: 'GET_DISTANCE_SUCCESS', 
          distance: res.rows[0].elements[0].distance 
        });
        func();
      },
      err => {
        dispatch({ type: 'GET_DISTANCE_SUCCESS', err });
      }
    );
  }
}

export const updateDirections = () => {
  return (dispatch, getState, { getFirebase }) => {
    //const adressState = getState().activity.address;
  }
}