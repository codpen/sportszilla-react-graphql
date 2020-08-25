import React, { useState } from 'react';
import { GoogleMap, LoadScript, InfoBox, Marker } from '@react-google-maps/api';
import styles from './Map.module.scss';
import { EventData } from '../Board/Event';
import EventLogin from '../EventLogin/EventLogin';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface PropTypes {
  events: EventData[];
}

const mapOptions = {
  disableDefaultUI: true,
  styles: require('./mapStyle.json'),
};

const Map: React.FC<PropTypes> = ({ events }) => {
  const [open, setOpen] = useState<number | null>(0);

  const markerList = events.map((ev, i) => {
    const sportIcon: any = {
      url: require(`../../Images/SportIconsColor/${ev.sport?.sportName}.svg`),
      scaledSize: { height: 35, width: 35 },
    };

    return (
      <div style={{ width: '100%' }}>
        <Marker
          title={ev.eventName}
          icon={sportIcon}
          key={ev.ID}
          position={{ lat: ev.latitude!, lng: ev.longitude! }}
          onClick={() => setOpen(ev.ID!)}
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
      <GoogleMap
        onClick={() => setOpen(null)}
        center={{ lat: 51, lng: 0 }}
        zoom={14}
        mapContainerStyle={containerStyle}
        options={mapOptions}
      >
        {markerList}
      </GoogleMap>
    </div>
  );
};
export default Map;
