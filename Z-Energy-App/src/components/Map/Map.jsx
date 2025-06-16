import React, { useCallback } from 'react';
import { Map } from '@vis.gl/react-google-maps';
import Search from '../Search/Search';

// Wellington coordinates
const defaultCenter = { lat: -41.2865, lng: 174.7762 };

// Hide only POIs while keeping all other default styling
const mapStyles = [
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }]
  }
];

const MapComponent = () => {
  const handleCameraChange = useCallback((ev) => {
    console.log('Camera changed:', ev.center);
  }, []);

  return (
    <>
      <Search />
      <Map
        defaultZoom={13}
        defaultCenter={defaultCenter}
        onCameraChanged={handleCameraChange}
        gestureHandling={'greedy'}
        mapTypeControl={false}
        streetViewControl={false}
        options={{
          styles: mapStyles,
          disableDefaultUI: true
        }}
      />
    </>
  );
};

export default MapComponent;