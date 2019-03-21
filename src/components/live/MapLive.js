import React from 'react';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import { config } from '../../config/gmConfig';

const MapLive = ({ users }) => (
  <GoogleMap 
    defaultZoom={config.zoom} 
    defaultCenter={
      { 
        lat: config.center.lat, 
        lng: config.center.lng,
      }
    }>
    {users && users.map(user => {
      const { value: { coordinates }} = user;
      return coordinates && <Marker 
        position={{ 
          lat: coordinates.latitude, 
          lng: coordinates.longitude,
        }} 
        key={user.key}
        icon={config.assetsUrl+config.onlineMarker}
        />
      }
    )}
  </GoogleMap>
);

export default compose(
  withProps({
    googleMapURL: `${config.url}key=${config.key}&v=${config.v}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(MapLive);