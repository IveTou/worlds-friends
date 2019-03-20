import React from 'react';
import { compose, withProps } from "recompose";
import { config } from '../../config/gmConfig';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


const MapLive = compose(
  withProps({
    googleMapURL: config.url+'key='+config.key+'&v='+config.v,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={8} defaultCenter={
      { lat: config.center.lat, lng: config.center.lng }
    }>
      {props.users && props.users.map(user =>
        <Marker 
          position={{ 
            lat: user.value.coordinates.latitude, 
            lng: user.value.coordinates.longitude
          }} 
          key={user.key}
          defaultLabel={user.value.initials} 
          />
      )}
    </GoogleMap>
));

export default MapLive;