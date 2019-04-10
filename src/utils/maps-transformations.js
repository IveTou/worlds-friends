
import { filter, map, round, transform } from 'lodash';

const googleMaps = window.google.maps;

export const makeMarker = ({ latitude, longitude }, own=true, config ) => {
  const position = new googleMaps.LatLng(latitude, longitude);
  const icon = own 
    ? config.assetsUrl+config.ownMarker
    : config.assetsUrl+config.onlineMarker;

  return new googleMaps.Marker({ position, icon })
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

export const isPointChanged = (prev, current, n) => {
  const response =
    round(prev.latitude, n) !==  round(current.latitude, n) ||
    round(prev.longitude, n) !==  round(current.longitude, n);
  return response;
}