import googleMaps from '@google/maps';

export const config = {
  url: 'https://maps.googleapis.com/maps/api/js?',
  key: 'AIzaSyBb7bGZ2aw7QRoBgFfl25kxHDwABpjgqDI',
  center: {
    lat: -12.98,
    lng: -38.47,
  },
  zoom: 11,
  v: '3.exp',
}

export default googleMaps.createClient(config);