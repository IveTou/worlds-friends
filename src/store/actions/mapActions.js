export const getRoute = (ori, des) => {
  return (dispatch, getState ) => {
    const googleMaps = window.google.maps;
    const DirectionsService = new googleMaps.DirectionsService();
    console.log(ori);
    const origin = { placeId: ori.placeId} || { lat: ori.latitude, lng:  ori.latitude };
    const destination = { lat: des.latitude, lng:  des.latitude };
    //Maybe in the future I will take destination PlaceId too. We must to study the real advantage

    DirectionsService.route({
      origin,
      destination,
      travelMode: googleMaps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === googleMaps.DirectionsStatus.OK) {
          dispatch({ type: 'GET_ROUTE_SUCCESS', result});
        } else {
          dispatch({ type: 'GET_ROUTE_ERROR', status});
        }
      }
    );
  }
}