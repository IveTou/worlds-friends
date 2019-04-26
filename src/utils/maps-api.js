const googleMaps = window.google.maps;
const DistanceService = new googleMaps.DistanceMatrixService();

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
        dispatch({ type: 'GET_DISTANCE_ERROR', err });
      }
    );
  }
}