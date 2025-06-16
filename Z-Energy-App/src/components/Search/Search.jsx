import React, { useEffect, useRef, useState } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import './Search.css';

const Search = ({ onPlaceSelect, onSetLocation }) => {
  const map = useMap();
  const searchBoxRef = useRef(null);
  const searchInputRef = useRef(null);
  const [isLocMode, setIsLocMode] = useState(false);

  // Keep track of the current search text
  const [searchText, setSearchText] = useState('');
  
  useEffect(() => {
    // Clean up previous elements if they exist
    const oldContainer = searchInputRef.current?.parentNode;
    if (oldContainer) {
      oldContainer.remove();
    }
    if (searchBoxRef.current) {
      window.google.maps.event.clearInstanceListeners(searchBoxRef.current);
      searchBoxRef.current = null;
    }
    
    if (!map || !window.google) return;

    // Create container for input and button
    const container = document.createElement('div');
    container.className = 'search-input-container';

    // Create the search box input
    const input = document.createElement('input');
    input.placeholder = isLocMode ? 'Set your current location...' : 'Search for a location';
    input.className = 'places-search-input';
    // Restore previous search text if any
    if (searchText) {
      input.value = searchText;
    }
    
    // Track input changes
    input.addEventListener('input', (e) => {
      setSearchText(e.target.value);
    });
    
    // Create location mode toggle button
    const locButton = document.createElement('button');
    locButton.className = 'location-mode-button';
    locButton.innerHTML = isLocMode ? '🔍' : '📍';
    locButton.title = isLocMode ? 'Switch to search mode' : 'Set your location';
    locButton.onclick = () => {
      const newMode = !isLocMode;
      setIsLocMode(newMode);
      input.placeholder = newMode ? 'Set your current location...' : 'Search for a location';
      locButton.innerHTML = newMode ? '🔍' : '📍';
      locButton.title = newMode ? 'Switch to search mode' : 'Set your location';
      input.focus();
    };
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
              const location = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              };
              
              if (isLocMode) {
                // Set as current location
                onSetLocation(location, results[0].formatted_address);
                // Show success message
                input.value = results[0].formatted_address;
                setSearchText(results[0].formatted_address);
              } else {
                // Regular search behavior
                map.setCenter(location);
                // Increase zoom by 1 level
                const currentZoom = map.getZoom() || 13;
                map.setZoom(currentZoom + 1);
                
                if (onPlaceSelect) {
                  onPlaceSelect(location);
                }
              }
              
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

    // Add elements to the container
    container.appendChild(input);
    container.appendChild(locButton);
    
    // Add the container to the map
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(container);

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

      // Get location coordinates
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      if (isLocMode) {
        // Set as current location
        onSetLocation(location, place.formatted_address || place.name);
      } else {
        // Regular search behavior
        map.panTo(place.geometry.location);
        // Increase zoom by 1 level
        const currentZoom = map.getZoom() || 13;
        map.setZoom(currentZoom + 1);
        
        if (onPlaceSelect) {
          onPlaceSelect(location);
        }
      }
    });

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });

    // Cleanup
    return () => {
      const container = searchInputRef.current?.parentNode;
      if (container) {
        container.remove();
      }
      if (searchBoxRef.current) {
        window.google.maps.event.clearInstanceListeners(searchBoxRef.current);
      }
    };
  }, [map, isLocMode, onPlaceSelect, onSetLocation, searchText]);

  return null; // The search box is added directly to the map
};

export default Search;
