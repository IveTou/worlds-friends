import { map } from 'lodash';

export const getRoute = (ori, des, way) => {
  return (dispatch, getState ) => {
    const googleMaps = window.google.maps;
    const DirectionsService = new googleMaps.DirectionsService();
    
    const origin = ori.placeId ?
      { placeId: ori.placeId} : 
      { lat: ori.latitude, lng:  ori.longitude };

    const destination = { lat: des.latitude, lng:  des.longitude };
    //Maybe in the future I will take destination PlaceId too. We must to study the real advantage
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
          dispatch({ type: 'GET_ROUTE_SUCCESS', result});
        } else {
          dispatch({ type: 'GET_ROUTE_ERROR', status});
        }
      }
    );
  }
}