import React from 'react';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { config } from '../../config/gmConfig';

const MapLive = compose(
  withProps({
    googleMapURL: config.url+'key='+config.key+'&v='+config.v,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
  )(({ users, classes }) => (
    <GoogleMap defaultZoom={8} defaultCenter={
      { lat: config.center.lat, lng: config.center.lng }
    }>
      {users && users.map(user =>
        <Marker 
          position={{ 
            lat: user.value.coordinates && user.value.coordinates.latitude, 
            lng: user.value.coordinates && user.value.coordinates.longitude
          }} 
          key={user.key}
          icon='https://firebasestorage.googleapis.com/v0/b/react-redux-firebase-2f3ee.appspot.com/o/img%2Fpin-green.png?alt=media&token=1b61cb01-48f2-4123-a33b-3b0e0b9b5043'
          />
      )}
    </GoogleMap>
));

export default MapLive;