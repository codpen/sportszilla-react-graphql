import React, { useState, useCallback } from 'react';
import styles from './Map.module.scss';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { EventBS } from '../Board/eventBS';

import pinIcon from './footbal_icon.png';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface PropTypes {
  event: EventBS[];
}

const mapOptions = {
  disableDefaultUI: true,
  styles: require('./mapStyle.json'),
};

//const mapStyles = require('./mapStyle.json');

const Map: React.FC<PropTypes> = ({ event }) => {
  const markerList = event.map((ev, i) => {
    return (
      <Marker
        key={`${i}`}
        title={'Marker'}
        position={{ lat: ev.location.latitude, lng: ev.location.longitude }}
      />
    );
  });

  return (
    <div className={styles.Map} data-testid="Map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          center={{ lat: 51, lng: 0 }}
          zoom={14}
          mapContainerStyle={containerStyle}
          options={mapOptions}
        >
          {markerList}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default Map;
