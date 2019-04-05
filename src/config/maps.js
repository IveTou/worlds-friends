//The '@google/maps' is a server-side API not designed to respond in real time to user input.
import googleMaps from '@google/maps';
import { omit } from 'lodash';

export const config = {
  url: 'https://maps.googleapis.com/maps/api/js?',
  key: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
  Promise: Promise,
  v: '3.exp',
  assetsUrl:'https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-2f3ee.appspot.com/o/img%2F',
  onlineMarker:'pin-green.png?alt=media&token=bc547406-5e90-44c2-a761-4c793614927b',
  ownMarker:'pin-blue.png?alt=media&token=051509dc-e220-461f-9b64-e3f648ff6ad4',
}

export const googleMapsClient = googleMaps.createClient(omit(config, ['v','assetsUrl', 'onlineMarker']));