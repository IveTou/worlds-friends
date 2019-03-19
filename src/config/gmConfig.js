import googleMaps from '@google/maps';

export const config = {
  key: 'AIzaSyBb7bGZ2aw7QRoBgFfl25kxHDwABpjgqDI',
  center: {
    lat: -12.98,
    lng: -38.47,
  },
  zoom: 11,
}

export default googleMaps.createClient(config);