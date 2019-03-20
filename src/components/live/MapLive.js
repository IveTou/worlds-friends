import React from 'react';
import GoogleMapReact from 'google-map-react';

const Pin = ({ content, id }) => <div id={id}>{content}</div>;

const MapLive = ({ initConfig, users = [] }) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: initConfig.key }}
      defaultCenter={initConfig.center}
      defaultZoom={initConfig.zoom}
    >
      {users && users.map(user => 
        <Pin 
          id={user.key}
          key={user.key}
          lat={user.value.coordinates && user.value.coordinates.latitude}
          lng={user.value.coordinates && user.value.coordinates.longitude}
          content={user.value.initials}
        />
      )}
    </GoogleMapReact>
  )
}

export default MapLive;
