import React, { useState } from 'react';
import styles from './Map.module.scss';
import EventLogin from '../EventLogin/EventLogin';
import { GoogleMap, LoadScript, InfoBox, InfoWindow, Marker } from '@react-google-maps/api';
import { EventBS } from '../Board/eventBS';
import { InfoBoxOptions } from '@react-google-maps/infobox';

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

const infoBoxOptions = {
  boxStyle: {
    width: '100vw',
    closeBoxMargin: '2px',
  },
};
//const mapStyles = require('./mapStyle.json');

const Map: React.FC<PropTypes> = ({ event }) => {
  const [open, setOpen] = useState<number | null>(null);

  const markerList = event.map((ev, i) => {
    const sportIcon: any = {
      url: require(`../../Images/SportIconsColor/${ev.sportName}.svg`),
      scaledSize: { height: 35, width: 35 },
    };

    return (
      <div style={{ width: '100%' }}>
        <Marker
          title={ev.eventName}
          icon={sportIcon}
          key={ev.ID}
          position={{ lat: ev.location.latitude, lng: ev.location.longitude }}
          onClick={() => setOpen(ev.ID)}
        >
          {(open === ev.ID || open === 0) && (
            <InfoBox options={{ closeBoxURL: '' }} onCloseClick={() => setOpen(null)}>
              <div className={styles.Popup}>
                <EventLogin event={ev} />
              </div>
            </InfoBox>
          )}
        </Marker>
      </div>
    );
  });

  return (
    <div className={styles.Map} data-testid="Map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
        <GoogleMap
          onClick={() => setOpen(null)}
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
