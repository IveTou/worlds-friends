import googleMaps from '@google/maps';
import { omit } from 'lodash';

export const config = {
  url: 'https://maps.googleapis.com/maps/api/js?',
  key: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
  Promise: Promise,
  v: '3.exp',
  center: {
    lat: -12.98,
    lng: -38.47,
  },
  zoom: 13,
  assetsUrl:'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-2f3ee.appspot.com/o/img%2F',
  onlineMarker:'pin-green.png?alt=media&token=bc547406-5e90-44c2-a761-4c793614927b',
  ownMarker:'pin-blue.png?alt=media&token=051509dc-e220-461f-9b64-e3f648ff6ad4',
}

export default googleMaps.createClient(omit(config, ['v','assetsUrl', 'onlineMarker']));