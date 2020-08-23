import React, { useState } from 'react';
import styles from './Map.module.scss';
import EventLogin from '../EventLogin/EventLogin';
import { GoogleMap, LoadScript, InfoWindow, Marker } from '@react-google-maps/api';
import { EventBS } from '../Board/eventBS';

import pinIcon from './footbal_icon.png';
import { isPunctuatorToken } from 'graphql/language/lexer';

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
  const [open, setOpen] = useState<number | null>(null);

  const markerList = event.map((ev, i) => {
    const sportIcon: any = {
      url: require(`../../Images/SportIcons/${ev.sportName}.svg`),
      scaledSize: { height: 30, width: 30 },
    };

    return (
      <Marker
        icon={sportIcon}
        key={ev.ID}
        position={{ lat: ev.location.latitude, lng: ev.location.longitude }}
        onClick={() => setOpen(ev.ID)}
      >
        {(open === ev.ID || open === 0) && (
          <InfoWindow onCloseClick={() => setOpen(null)}>
            <EventLogin event={ev} />
          </InfoWindow>
        )}
      </Marker>
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
