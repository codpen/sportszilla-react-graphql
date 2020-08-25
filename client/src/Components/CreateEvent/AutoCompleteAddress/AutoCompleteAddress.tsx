import React, { Dispatch, SetStateAction } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styles from './AutoCompleteAddress.module.scss';
import { any } from 'prop-types';

interface PropTypes {
  address: string | undefined;
  setAddress: Dispatch<SetStateAction<string>> | undefined;
  setCoordinates: Dispatch<SetStateAction<any>>;
}

const AutoCompleteAddress: React.FC<PropTypes> = ({ address, setAddress, setCoordinates }) => {
  const handleSelect = async (value: any) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setCoordinates(latlng);
  };

  return (
    <>
      <div className={styles.Autocomplete} data-testid="Autocomplete">
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({ placeholder: 'Type Address' })} />
              <div>
                {loading ? <div>...loading</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                  };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    </>
  );
};

export default AutoCompleteAddress;
