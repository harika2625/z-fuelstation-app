import React, { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import './Search.css';

// Google Maps search box component
const Search = ({ onPlaceSelect, onSetLocation }) => {
  const map = useMap();
  const searchBoxRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Reference to keep track of current search text
  const searchTextRef = useRef('');
  
  useEffect(() => {
    if (!map || !window.google) return;

    // Create container for search box
    const container = document.createElement('div');
    container.className = 'search-input-container';

    // Create the search box input
    const input = document.createElement('input');
    input.placeholder = 'Search for a location';
    input.className = 'places-search-input';
    searchInputRef.current = input;
    
    // Restore previous search text if any
    if (searchTextRef.current) {
      input.value = searchTextRef.current;
    }
    
    // Create pin icon
    const pinIcon = document.createElement('span');
    pinIcon.className = 'search-pin-icon';
    pinIcon.innerHTML = '📍';
    pinIcon.title = 'Location will be set when you search';
    
    // Add the search box to the container
    container.appendChild(input);
    container.appendChild(pinIcon);

    // Add the container to the map
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(container);

    // Create the search box
    const searchBox = new window.google.maps.places.SearchBox(input);
    searchBoxRef.current = searchBox;
    
    // Track input changes
    input.addEventListener('input', (e) => {
      searchTextRef.current = e.target.value;
    });
    
    // Hide autocomplete on blur
    input.addEventListener('blur', () => {
      // Use setTimeout to allow click events on autocomplete predictions to fire first
      setTimeout(() => {
        const pacContainer = document.querySelector('.pac-container');
        if (pacContainer) {
          pacContainer.style.display = 'none';
        }
      }, 200);
    });

    // Listen for the event fired when the user selects a prediction
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;

      const place = places[0];
      if (!place.geometry || !place.geometry.location) return;

      // Get location coordinates
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      
      // Hide the autocomplete dropdown
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer) {
        pacContainer.style.display = 'none';
      }

      // Always set as current location AND center the map
      onSetLocation(location, place.formatted_address || place.name);
      
      // Center the map
      map.setCenter(location);
      
      // Increase zoom by 1 level
      const currentZoom = map.getZoom() || 13;
      map.setZoom(currentZoom + 1);
      
      if (onPlaceSelect) {
        onPlaceSelect(location);
      }
      
      // Show formatted address in search input
      input.value = place.formatted_address || place.name;
      searchTextRef.current = place.formatted_address || place.name;
      
      // Visual feedback that pin was dropped
      pinIcon.classList.add('pin-active');
      setTimeout(() => {
        pinIcon.classList.remove('pin-active');
      }, 1000);
    });

    // Add event listener for Enter key to handle geocoding
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        // If input is empty, don't do anything
        if (!input.value.trim()) return;

        // Use geocoder to convert address to coordinates
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: input.value }, (results, status) => {
          if (status === 'OK' && results[0]) {
            // Zoom and center to the geocoded location
            const location = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };
            
            // Always set location and center map
            onSetLocation(location, results[0].formatted_address);
            map.setCenter(location);
            
            // Increase zoom by 1 level
            const currentZoom = map.getZoom() || 13;
            map.setZoom(currentZoom + 1);
            
            // Hide the autocomplete dropdown
            const pacContainer = document.querySelector('.pac-container');
            if (pacContainer) {
              pacContainer.style.display = 'none';
            }
            
            // Show formatted address in search input
            input.value = results[0].formatted_address;
            searchTextRef.current = results[0].formatted_address;
            
            // Visual feedback that pin was dropped
            pinIcon.classList.add('pin-active');
            setTimeout(() => {
              pinIcon.classList.remove('pin-active');
            }, 1000);
            
            if (onPlaceSelect) {
              onPlaceSelect(location);
            }
          }
        });
      }
    });

    // Handle bias of search box results towards current viewport
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });

    // Clean up function
    return () => {
      if (container.parentNode) {
        container.remove();
      }
      if (searchBoxRef.current) {
        window.google.maps.event.clearInstanceListeners(searchBoxRef.current);
        searchBoxRef.current = null;
      }
    };
  }, [map, onPlaceSelect, onSetLocation]);

  return null; // The search box is added directly to the map
};

export default Search;
