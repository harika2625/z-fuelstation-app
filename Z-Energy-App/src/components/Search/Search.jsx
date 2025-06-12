import React, { useState, useEffect, useRef } from 'react';
import './Search.css';

/**
 * Search component for Z Fuel stations
 * 
 * This component provides search functionality for Z Fuel stations.
 * It includes autocomplete suggestions and handles search submissions.
 * 
 * @param {Object} props
 * @param {Function} props.onStationSelect - Callback when a station is selected
 * @param {Array} props.stations - List of available stations
 */
const Search = ({ onStationSelect, stations = [] }) => {
  // State for search input and results
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Reference to the search input and suggestions container
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  
  /**
   * Filter stations based on search term
   */
  const filterStations = (term) => {
    if (!term.trim() || !stations || stations.length === 0) {
      return [];
    }
    
    const lowerCaseTerm = term.toLowerCase();
    
    // Filter stations by name or address
    return stations.filter(
      station => 
        station.name.toLowerCase().includes(lowerCaseTerm) || 
        station.address.toLowerCase().includes(lowerCaseTerm)
    );
  };
  
  /**
   * Handle input change in search box
   */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      setIsSearching(true);
      
      // Filter stations based on search term
      const filteredResults = filterStations(value);
      setSearchResults(filteredResults);
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
    
    setIsSearching(false);
  };
  
  /**
   * Handle selection of a station from search results
   */
  const handleStationSelect = (station) => {
    setSearchTerm(station.name);
    setShowSuggestions(false);
    
    // Call the callback to select this station on the map
    if (onStationSelect) {
      onStationSelect(station);
    }
  };
  
  /**
   * Handle form submission for search
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // If we have search results, select the first one
    if (searchResults.length > 0) {
      handleStationSelect(searchResults[0]);
    }
  };
  
  /**
   * Close suggestions when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target) &&
        !searchInputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="search-component">
      <form onSubmit={handleSearchSubmit}>
        <div className="search-input-container">
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Z Fuel stations..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      
      {/* Search suggestions dropdown */}
      {showSuggestions && searchResults.length > 0 && (
        <div className="search-suggestions" ref={suggestionsRef}>
          {isSearching ? (
            <div className="suggestion-item loading">Searching...</div>
          ) : (
            searchResults.map((station, index) => (
              <div
                key={station._id || index}
                className="suggestion-item"
                onClick={() => handleStationSelect(station)}
              >
                <div className="suggestion-name">{station.name}</div>
                <div className="suggestion-address">{station.address}</div>
                <div className="suggestion-fuel">
                  {station.fuel_type} - ${station.fuel_price?.toFixed(2)}/L
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
