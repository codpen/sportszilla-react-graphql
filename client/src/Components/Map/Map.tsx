import React, { useState, useCallback } from 'react';
import styles from './Map.module.scss';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import pinIcon from './footbal_icon.png';
import mapStyle from './mapStyle.json';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
  disableDefaultUI: true,
  styles: require('./mapStyle.json'),
};

//const mapStyles = require('./mapStyle.json');

const Map: React.FC = () => {
  return (
    <div className={styles.Map} data-testid="Map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          center={{ lat: 51, lng: 0 }}
          zoom={14}
          mapContainerStyle={containerStyle}
          options={mapOptions}
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
