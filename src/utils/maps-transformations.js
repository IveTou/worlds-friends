
import { each, drop, filter, map, mean, reduce, round, transform } from 'lodash';

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

export const toRadians = dg =>  dg * (Math.PI/180);

export const haversineFunction = (origin, destination) => {
  const { latitude: origin_lat, longitude: origin_lng } = origin;
  const { latitude: destination_lat, longitude: destination_lng } = destination;

	var R = 6371e3; // meters
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
  each(arr, (value, key) => lowest = value < arr[lowest] ? key : lowest);
  return lowest;
 }

export const pointLegMatching = (point, steps) => {
  const distances =  map(
    steps, 
    ({ 
      start_location: { lat: start_lat, lng: start_lng }, 
      end_location: { lat: end_lat, lng: end_lng } 
    }) => {
      const mean_lat = mean([start_lat(), end_lat()]);
      const mean_lng = mean([start_lng(), end_lng()]);

      return haversineFunction(point, { latitude: mean_lat, longitude: mean_lng })
    }
  );

  const smallestIndex = indexOfSmallest(distances);
  const minimumDistance = distances[smallestIndex];

  return { 
    index: minimumDistance <= 200 ? smallestIndex : 0, 
    distance: minimumDistance 
  };
}

export const updateLeg = (leg = [], index) => {
  const { steps } = leg;
  const cutAt = index > 0 ? index + 1 : index;
  const newSteps = drop(steps, cutAt);

  const newCalc = reduce(
    newSteps, 
    (
      { distance, duration }, 
      { distance: { value: distValue }, duration: { value: durValue } }
    ) => {
      const distsum = distance.value + distValue;
      const dursum = duration.value + durValue
      return { 
        distance: { value: distsum, text: round(distsum/1000) + ' km' }, 
        duration: { value: dursum, text: round(dursum/60) + ' mins' },
      };
    },
    { distance: { value: 0, text: '' }, duration: { value: 0, text: '' }}
  );  
  
  return  { 
    ...leg, 
    ...newCalc, 
    steps: newSteps,
  };
}