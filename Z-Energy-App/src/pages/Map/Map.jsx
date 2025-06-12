import React, { useState, useEffect, useCallback, useRef } from 'react';
import { APIProvider, Map as GoogleMap, Marker } from '@vis.gl/react-google-maps';
import Search from '../../components/Search/Search';
import './Map.css';

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
  
  // Reference to the map instance
  const mapRef = useRef(null);

  // Default center on Wellington, New Zealand
  const defaultCenter = { lat: -41.2865, lng: 174.7762 };
  
  /* ============================================================
   * Map styling to remove default POIs and map markers
   * ============================================================ */
  const mapStyles = [
    {
      // Remove all points of interest
      featureType: 'poi',
      elementType: 'all',
      stylers: [{ visibility: 'off' }]
    },
    {
      // Remove all business POIs
      featureType: 'poi.business',
      elementType: 'all',
      stylers: [{ visibility: 'off' }]
    },
    {
      // Remove transit stations
      featureType: 'transit',
      elementType: 'all',
      stylers: [{ visibility: 'off' }]
    }
  ];

  /**
   * Fetches station data from the backend API
   * This connects to the existing /stations endpoint
   */
  const fetchStations = async () => {
    try {
      setLoading(true);
      // Using the existing endpoint from your backend
      const response = await fetch('http://localhost:3000/stations');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Station model will need latitude and longitude fields
      const stationsWithCoordinates = data.response.map(station => ({
        ...station,
        // Lat/Long such as these:
        position: {
          lat: parseFloat(station.latitude || -41.2865),
          lng: parseFloat(station.longitude || 174.7762)
        }
      }));
      
      setStations(stationsWithCoordinates);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch stations:', err);
      setError('Failed to load station data. Please try again later.');
      // Use mock data for testing when backend is unavailable
      setStations([
        {
          _id: '1',
          name: 'Z Vivian Street',
          address: '154 Vivian Street, Wellington',
          fuel_price: 2.65,
          fuel_type: 'Unleaded 91',
          position: { lat: -41.2965, lng: 174.7762 }
        },
        {
          _id: '2',
          name: 'Z Harbour City',
          address: '125 Customhouse Quay, Wellington',
          fuel_price: 2.63,
          fuel_type: 'Unleaded 91',
          position: { lat: -41.2825, lng: 174.7782 }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles camera movement on the map
   * Can be used to dynamically load stations as user moves around
   */
  const handleCameraChange = useCallback((ev) => {
    // Log the current map center position
    console.log('Map center changed to:', ev.center);
    
    // Future?: Load stations based on current map bounds
    // const bounds = mapRef.current?.getBounds();
    // if (bounds) fetchStationsInBounds(bounds);
  }, []);
  
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
   * Clear selected station when clicking elsewhere on map
   */
  const handleMapClick = useCallback(() => {
    setSelectedStation(null);
  }, []);

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
        {/* Error message display */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Loading indicator */}
        {loading && <div className="loading-spinner">Loading stations...</div>}
        
        {/* Map container */}
        <div className="map-container">
          {/* Search component */}
          <div className="search-container">
            <Search 
              stations={stations} 
              onStationSelect={handleStationClick}
            />
          </div>
          
          {/* Main Google Map */}
          <GoogleMap
            ref={mapRef}
            mapId="z-fuel-map"
            defaultCenter={defaultCenter}
            defaultZoom={13}
            onClick={handleMapClick}
            onCameraChanged={handleCameraChange}
            options={{
              styles: mapStyles,
              fullscreenControl: false, 
              mapTypeControl: false,
              streetViewControl: false,
              disableDefaultUI: false
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
                // You can customize the marker appearance with these props
                // icon={customMarkerIcon}
              />
            ))}
          </GoogleMap>
          
          {/* Station details panel - shows when a station is selected */}
          {selectedStation && (
            <div className="station-details-panel">
              <h3>{selectedStation.name}</h3>
              <p>{selectedStation.address}</p>
              <div className="fuel-info">
                <span className="fuel-type">{selectedStation.fuel_type}</span>
                <span className="fuel-price">${selectedStation.fuel_price.toFixed(2)}/L</span>
              </div>
              <button className="directions-btn">
                Get Directions
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
      </APIProvider>
    </div>
  );
};

export default Map;
