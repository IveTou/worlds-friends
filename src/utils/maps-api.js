const googleMaps = window.google.maps;
const DistanceService = new googleMaps.DistanceMatrixService();

export const getDistance = (origin = {}, destination = {}, func = () => {}) => {
  return DistanceService.getDistanceMatrix(
    {
      origins: [origin.placeId || [origin.latitude, origin.longitude].join()],
      destinations: [destination.placeId || [destination.latitude, destination.longitude].join()],
      travelMode: googleMaps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(Date.now()),
      },
    }, 
    res => { return { distance: res.rows[0].elements[0].distance }}, 
    err => { return { err } }
  );
}