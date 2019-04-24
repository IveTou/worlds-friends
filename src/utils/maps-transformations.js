
import { each, filter, map, round, transform } from 'lodash';

const googleMaps = window.google.maps;

export const makeMarker = ({ latitude, longitude }, own = true, config, animation = null ) => {
  const position = new googleMaps.LatLng(latitude, longitude);
  const icon = own 
    ? config.assetsUrl+config.ownMarker
    : config.assetsUrl+config.onlineMarker;

  return new googleMaps.Marker({ position, icon, animation: animation })
}

export const makePosition = ({tuid, uid, users}) => {
  const origin = filter(users, ({ key, value }) => ((key === uid) || !value.address))[0] || [];
  const destination = filter(users, ({ key, value }) => ((key === tuid) || !value.address))[0] || [];
  return { origin: origin.value.address, destination: destination.value.address }
}

export const arePointsChanged = (prevUsers, currentUsers) => {
  const response = [];

  const prevUsersAddress = map(prevUsers, prevUser => {
    const { address } = prevUser.value;
    return transform(address, (res, val, key) => {
        res[key] = round(val, 3)
    })
  });

  const usersAddress = map(currentUsers, prevUser => {
    const { address } = prevUser.value;
    return transform(address, (res, val, key) => {
        res[key] = round(val, 3)
    })
  });

  for(let i in prevUsersAddress) {
    response.push(
      round(prevUsersAddress[i].latitude, 5) !== round(usersAddress[i].latitude, 5) ||
      round(prevUsersAddress[i].longitude, 5) !== round(usersAddress[i].longitude, 5)
    )
  }

  return response.indexOf(true) > 0;
}

export const isPointChanged = (prev, current, n = 16) => {
  const response =
    round(prev.latitude, n) !==  round(current.latitude, n) ||
    round(prev.longitude, n) !==  round(current.longitude, n);
  return response;
}

export const toRadians = dg => {
  var pi = Math.PI;
  return dg * (pi/180);
}


export const haversineFunction = (origin, destination) => {
  const { latitude: origin_lat, longitude: origin_lng } = origin;
  const { latitude: destination_lat, longitude: destination_lng } = destination;

	var R = 6371e3; // metres
	var origin_lat_rad = toRadians(origin_lat);
	var destination_lat_rad = toRadians(destination_lat);
	var distance_lat = toRadians(destination_lat - origin_lat);
	var distance_lng = toRadians(destination_lng - origin_lng);

	var a = Math.sin(distance_lat/2) * Math.sin(distance_lat/2) +
			Math.cos(origin_lat_rad) * Math.cos(destination_lat_rad) *
			Math.sin(distance_lng/2) * Math.sin(distance_lng/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;

	return d;
}

export const indexOfSmallest = arr => {
  let lowest = 0;
  each(arr, (value, key) => lowest = value < lowest ? key : lowest);
  return lowest;
 }

export const pointLegMatching = (point, steps) => {
  const distances =  map(steps, ({ start_location: { lat, lng } }) => {
    return haversineFunction(point, {latitude: lat(), longitude: lng()})
  });

  const smallestIndex = indexOfSmallest(distances);
  const minimumDistance = distances[smallestIndex];

  /*
  TASK: Directions update logic
  0 - Inf: In route
    0: Same step
    x: specific step ranging from 0 to N
  -1: Out of route 
  */
  return { index: smallestIndex, distance: minimumDistance };
}