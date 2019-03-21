import googleMaps from '@google/maps';
import { omit } from 'lodash';

export const config = {
  url: 'https://maps.googleapis.com/maps/api/js?',
  key: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
  v: '3.exp',
  center: {
    lat: -12.98,
    lng: -38.47,
  },
  zoom: 13,
  assetsUrl:'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-2f3ee.appspot.com/o/img%2F',
  onlineMarker:'pin-green.png?alt=media&token=1b61cb01-48f2-4123-a33b-3b0e0b9b5043'
}

export default googleMaps.createClient(omit(config, ['v','assetsUrl', 'onlineMarker']));