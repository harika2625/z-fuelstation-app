import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { APIProvider, Map as GoogleMap, Marker } from '@vis.gl/react-google-maps';
import Search from '../../components/Search/Search';
import './Map.css';

// Define marker icon paths - using /public folder
const iconPaths = {
  station: '/z-station.png',
  selectedStation: '/selected-z-station.png',
  recentre: '/recentre.png',
  diesel: '/diesel.png',
  unleaded95: '/95.png',
  unleaded91: '/91.png',
  currentLocation: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
};

/**
 * Z Fuel Station Map Component
 * 
 * This component renders a Google Map with Z Fuel station locations.
 * Users can search for stations, view station details, and get directions.
 */
const Map = () => {
  // State for selected station and all stations
  const [selectedStation, setSelectedStation] = useState(null);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  // Reference to the map instance
  const mapRef = useRef(null);
  
  // Auto-dismiss error message after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // 5 seconds
      
      // Cleanup timeout on component unmount or when error changes
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Default center on Wellington, New Zealand
  const defaultCenter = useMemo(() => ({ lat: -41.2865, lng: 174.7762 }), []);

  // Custom marker icons for Z stations
  const markerIcons = {
    default: {
      url: iconPaths.station,
      scaledSize: { width: 40, height: 40 },
      anchor: { x: 20, y: 40 }
    },
    selected: {
      url: iconPaths.selectedStation,
      scaledSize: { width: 50, height: 50 },
      anchor: { x: 25, y: 50 }
    },
    diesel: {
      url: iconPaths.diesel,
      scaledSize: { width: 40, height: 40 },
      anchor: { x: 20, y: 40 }
    },
    unleaded95: {
      url: iconPaths.unleaded95,
      scaledSize: { width: 40, height: 40 },
      anchor: { x: 20, y: 40 }
    },
    unleaded91: {
      url: iconPaths.unleaded91,
      scaledSize: { width: 40, height: 40 },
      anchor: { x: 20, y: 40 }
    }
  };
  
  /**
   * Handle when a place is selected from the search component 
   */
  const handlePlaceSelect = useCallback((location) => {
    // Update the map center to the selected location
    if (mapRef.current) {
      mapRef.current.panTo(location);
      mapRef.current.setZoom((mapRef.current.getZoom() || 12) + 1);
    }
  }, []);

  /**
   * Set current location from search results
   */
  const setLocationFromSearch = useCallback((location, address) => {
    setCurrentLocation(location);
    console.log('Current location set to:', address);
    // Show a temporary notification
    setError(`Current location set to: ${address}`);
    // Clear the notification after 3 seconds
    setTimeout(() => setError(null), 3000);
  }, []);

    /**
   * Handles camera movement on the map
   */
    const handleCameraChange = useCallback((ev) => {
      // Log the current map center position
      console.log('Map center changed to:', ev.center);
      
      // Future?: Load stations based on current map bounds
      // const bounds = mapRef.current?.getBounds();
      // if (bounds) fetchStationsInBounds(bounds);
    }, []);

  /**
   * Get directions to the selected station
   */
  const getDirectionsToStation = useCallback(() => {
    if (!currentLocation || !selectedStation) return;
    
    // Create directions URL for Google Maps
    const origin = `${currentLocation.lat},${currentLocation.lng}`;
    const destination = `${selectedStation.position.lat},${selectedStation.position.lng}`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    
    // Open in a new tab
    window.open(directionsUrl, '_blank');
  }, [currentLocation, selectedStation]);
  
  /**
   * Get the appropriate fuel icon path based on fuel type
   */
  const getFuelTypeIconPath = (fuelType) => {
    if (!fuelType) return null;
    
    const lowerFuelType = fuelType.toLowerCase();
    
    if (lowerFuelType.includes('diesel')) {
      return iconPaths.diesel;
    } else if (lowerFuelType.includes('95')) {
      return iconPaths.unleaded95;
    } else if (lowerFuelType.includes('91')) {
      return iconPaths.unleaded91;
    }
    
    return null;
  };
  
  /* ============================================================
   * Map styling to remove default POIs and map markers
   * ============================================================  /**
   * Comprehensive style configuration to hide all POIs (Points of Interest) on the map
   * This creates a cleaner look that focuses on Z Fuel stations
   */
  const mapStyles = [
    {
      // Hide all points of interest
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }]
    },
    {
      // Hide all business icons
      featureType: "poi.business",
      elementType: "all",
      stylers: [{ visibility: "off" }]
    },
    {
      // Hide transit stations and lines
      featureType: "transit",
      elementType: "all",
      stylers: [{ visibility: "off" }]
    },
    {
      // Hide labels for places
      featureType: "administrative.locality",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    },
    {
      // Remove all business points
      featureType: "business",
      stylers: [{ visibility: "off" }]
    },
    {
      // Remove labels from points of interest
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      // Remove attraction markers
      featureType: "poi.attraction",
      stylers: [{ visibility: "off" }]
    },
    {
      // Remove place of worship markers
      featureType: "poi.place_of_worship",
      stylers: [{ visibility: "off" }]
    },
    {
      // Remove government building markers
      featureType: "poi.government",
      stylers: [{ visibility: "off" }]
    },
    {
      // Remove school markers
      featureType: "poi.school",
      stylers: [{ visibility: "off" }]
    },
    {
      // Remove medical facility markers
      featureType: "poi.medical",
      stylers: [{ visibility: "off" }]
    },
    {
      // Remove park markers but keep the green areas
      featureType: "poi.park",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      // Remove sports complex markers
      featureType: "poi.sports_complex",
      stylers: [{ visibility: "off" }]
    }
  ];

  /**
   * Provides station data for the map
   * Currently using mock data; can be replaced with API fetch when backend is ready
   */
  const fetchStations = async () => {
    try {
      setLoading(true);
      
      // Using mock data for development
      const stationsWithCoordinates = [
        {
          _id: '1',
          name: 'Z Vivian Street',
          address: '154 Vivian Street, Wellington',
          fuel_price: 2.65,
          fuel_type: 'Unleaded 91',
          position: { lat: -41.2965, lng: 174.7762 }
        },
        {
          _id: '3',
          name: 'Z Midtown',
          address: '89 Willis Street, Wellington',
          fuel_price: 2.89,
          fuel_type: 'Unleaded 95',
          position: { lat: -41.2888, lng: 174.7772 }
        },
        {
          _id: '2',
          name: 'Z Harbour City',
          address: '232 Thorndon Quay, Wellington',
          fuel_price: 2.19,
          fuel_type: 'Diesel',
          position: { lat: -41.2765, lng: 174.7865 }
        }
      ];
      
      setStations(stationsWithCoordinates);
      setError(null);
    } catch (err) {
      console.error('Error fetching stations:', err);
      setError('Failed to fetch stations. Using mock data instead.');
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Handles clicks on station markers
   */
  const handleStationClick = useCallback((station) => {
    console.log('Station clicked:', station);
    setSelectedStation(station);
    
    // Center map on selected station
    if (mapRef.current) {
      mapRef.current.panTo(station.position);
      mapRef.current.setZoom(15);
    }
  }, []);

  /**
   * Clear selection when clicking the map background
   */
  const handleMapClick = useCallback(() => {
    setSelectedStation(null);
  }, []);

  /**
   * Recenter map to default location (Wellington)
   */
  const handleRecenterMap = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.panTo(defaultCenter);
      mapRef.current.setZoom(13);
    }
  }, [defaultCenter]);

  // Fetch stations on component mount
  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <div className="map-page">
      {/* API Provider wraps the entire map component */}
      <APIProvider 
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} 
        libraries={['places']}
      >
        {/* Map container */}
        <div className="map-container">
          {/* Search component */}
          <div className="search-container">
            <Search 
              onPlaceSelect={handlePlaceSelect} 
              onSetLocation={setLocationFromSearch} 
            />
          </div>
          
          {/* Recenter map button */}
          <button 
            className="recenter-button" 
            onClick={handleRecenterMap}
            title="Recenter map to Wellington"
          >
            <img src={iconPaths.recentre} alt="Recenter" width="20" height="20" />
          </button>
          
          {/* Main Google Map */}
          <GoogleMap
            ref={mapRef}
            mapId="z-fuel-map"
            defaultCenter={defaultCenter}
            defaultZoom={13}
            onClick={handleMapClick}
            onCameraChanged={handleCameraChange}
            options={{
              // Can't get this to work properly
              styles: mapStyles, 
              fullscreenControl: false, 
              mapTypeControl: false,
              streetViewControl: false,
              disableDefaultUI: true,
              clickableIcons: false
            }}
            gestureHandling={'greedy'}
          >
            {/* Render markers for each station */}
            {stations.map((station) => (
              <Marker
                key={station._id}
                position={station.position}
                onClick={() => handleStationClick(station)}
                title={station.name}
                icon={selectedStation && selectedStation._id === station._id
                  ? markerIcons.selected
                  : markerIcons.default}
              />
            ))}
            
            {/* Current location marker */}
            {currentLocation && (
              <Marker
                position={currentLocation}
                title="Your Location"
                icon={{
                  url: iconPaths.currentLocation,
                  scaledSize: { width: 34, height: 34 },
                  anchor: { x: 17, y: 17 }
                }}
              />
            )}
          </GoogleMap>
          
          {/* Station details panel - shows when a station is selected */}
          {selectedStation && (
            <div className="station-details-panel">
              <h3>{selectedStation.name}</h3>
              <p>{selectedStation.address}</p>
              <div className="fuel-info">
                <div className="fuel-type-container">
                  {getFuelTypeIconPath(selectedStation.fuel_type) ? (
                    <img 
                      src={getFuelTypeIconPath(selectedStation.fuel_type)} 
                      alt={selectedStation.fuel_type} 
                      className="fuel-type-icon" 
                      title={selectedStation.fuel_type}
                    />
                  ) : (
                    <span className="fuel-type">{selectedStation.fuel_type}</span>
                  )}
                </div>
                <span className="fuel-price">${selectedStation.fuel_price.toFixed(2)}/L</span>
              </div>
              <button 
                className="directions-btn"
                onClick={getDirectionsToStation}
                disabled={!currentLocation}
                title={currentLocation ? "Get directions to this station" : "Set your location first"}
              >
                {currentLocation ? "Get Directions" : "Set Location First"}
              </button>
              <button 
                className="close-btn"
                onClick={() => setSelectedStation(null)}
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Error and loading messages moved to bottom of page */}
        <div className="messages-container">
          {/* Loading indicator */}
          {loading && <div className="loading-spinner">Loading stations...</div>}
          
          {/* Error message display */}
          {error && <div className="error-message">{error}</div>}
        </div>
      </APIProvider>
    </div>
  );
};

export default Map;
