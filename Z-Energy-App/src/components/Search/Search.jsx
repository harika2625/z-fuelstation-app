import React, { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import './Search.css';

const Search = () => {
  const map = useMap();
  const searchBoxRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!map || !window.google || searchBoxRef.current) return;

    // Create the search box input
    const input = document.createElement('input');
    input.placeholder = 'Search for a location';
    input.className = 'places-search-input';
    searchInputRef.current = input;
    
    // Add event listener for Enter key press
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = input.value;
        
        // If input is not empty, trigger geocoding
        if (query.trim()) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: query }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              // Zoom and center to the geocoded location
              const location = results[0].geometry.location;
              map.setCenter(location);
              
              // Increase zoom by 1 level
              const currentZoom = map.getZoom() || 13;
              map.setZoom(currentZoom + 1);
              
              console.log('Geocoded address:', results[0].formatted_address);
            } else {
              console.error('Geocoding failed:', status);
            }
          });
        }
      }
    });

    // Create the search box
    const searchBox = new window.google.maps.places.SearchBox(input);
    searchBoxRef.current = searchBox;

    // Add the search box to the map
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input);

    // Listen for the event fired when the user selects a prediction
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) return;

      // Get the first place
      const place = places[0];

      if (!place.geometry || !place.geometry.location) {
        console.log('Returned place contains no geometry');
        return;
      }

      // Pan to the selected location
      map.panTo(place.geometry.location);
      
      // Increase zoom by 1 level
      const currentZoom = map.getZoom() || 13;
      map.setZoom(currentZoom + 1);
    });

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });

    // Cleanup
    return () => {
      if (searchInputRef.current) {
        searchInputRef.current.remove();
      }
      window.google.maps.event.clearInstanceListeners(searchBox);
    };
  }, [map]);

  return null; // The search box is added directly to the map
};

export default Search;
