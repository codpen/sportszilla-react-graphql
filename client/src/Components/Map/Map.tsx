import React, { useState, useCallback } from 'react';
import styles from './Map.module.scss';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import pinIcon from './footbal_icon.png';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Map: React.FC = () => {
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className={styles.Map} data-testid="Map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          center={{ lat: 51, lng: 0 }}
          zoom={14}
          mapContainerStyle={containerStyle}
          options={{ disableDefaultUI: true }}
        >
          <Marker title={'Marker'} position={{ lat: 51, lng: 0 }} />
          <Marker
            title={'Marker'}
            position={{ lat: 51.005, lng: 0 }}
            //  icon={pinIcon}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default Map;
