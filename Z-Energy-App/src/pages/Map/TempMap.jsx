import React, { useEffect, useState, useCallback } from "react";
import StationCard from "./components/stationCard";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  Pin,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import styles from "./TempMap.module.css";
import ZPing from "../../assets/find Z2.png";
import { Link } from "react-router-dom";
import CarWash from "./components/svg/CarWash";
import Coffee from "./components/svg/Coffee";
import Ev2 from "./components/svg/Ev2";
import Bathroom from "./components/svg/Bathroom";
import MobilePay from "./components/svg/MobilePay";
import Recenter from "./components/svg/Recenter";
import BackArrow from "./components/svg/BackArrow";

const locations = [
  {
    key: "Z Kingsway Station",
    location: { lat: -37.06173518582579, lng: 174.94842831873558 },
  },
  {
    key: "Z Papakura North Station",
    location: { lat: -37.05060622822807, lng: 174.9297406076361 },
  },
  {
    key: "Z Avondale",
    location: { lat: -36.8959524083582, lng: 174.68855442669843 },
  },

  {
    key: "Z Albany",
    location: { lat: -36.72528068863808, lng: 174.6978975613754 },
  },
  {
    key: "Z Botony Downs",
    location: { lat: -36.93086110810283, lng: 174.9109168002869 },
  },
  {
    key: "Z Browns Rd",
    location: { lat: -37.01774401829205, lng: 174.86198863321252 },
  },
  {
    key: "Z Clevedon",
    location: { lat: -36.993521800931596, lng: 175.0372419011561 },
  },
  {
    key: "Z Ellerslie",
    location: { lat: -36.89823257626804, lng: 174.8246387123931 },
  },
  {
    key: "Z Glen Innes",
    location: { lat: -36.877065437141226, lng: 174.85448789459102 },
  },
  {
    key: "Z Glen Park",
    location: { lat: -36.79427602484108, lng: 174.72429524748605 },
  },
  {
    key: "Z Green Bay",
    location: { lat: -36.93127844599181, lng: 174.67763805836543 },
  },
  {
    key: "Z Greenlane",
    location: { lat: -36.88998176259796, lng: 174.795794528216 },
  },
  {
    key: "Z Greville Rd",
    location: { lat: -36.7299778216118, lng: 174.7240433203225 },
  },
  {
    key: "Z Henderson Valley",
    location: { lat: -36.8918274398629, lng: 174.62315833639735 },
  },
  {
    key: "Z Hunters Corner",
    location: { lat: -36.96667088794491, lng: 174.8630240267014 },
  },
  {
    key: "Z Kepa Rd",
    location: { lat: -36.861315009997774, lng: 174.8231698710439 },
  },
  {
    key: "Z Kumeu",
    location: { lat: -36.774280007405736, lng: 174.55227405265757 },
  },
  {
    key: "Z Lakeside",
    location: { lat: -36.78557865344953, lng: 174.75700162669403 },
  },
  {
    key: "Z Lincoln Rd",
    location: { lat: -36.85882102621941, lng: 174.6294374656364 },
  },
  {
    key: "Z Manurewa",
    location: { lat: -37.02352052067158, lng: 174.89954898210334 },
  },
  {
    key: "Z Mt Albert",
    location: { lat: -36.880515146888456, lng: 174.7249704531108 },
  },
  {
    key: "Z New Lynn",
    location: { lat: -36.90274273534207, lng: 174.6811630481176 },
  },
  {
    key: "Z Northcote",
    location: { lat: -36.81021528436265, lng: 174.73784482781608 },
  },
  {
    key: "Z Northcross",
    location: { lat: -36.709933087735145, lng: 174.72825292669083 },
  },
  {
    key: "Z Panmure",
    location: { lat: -36.89618007055594, lng: 174.840762339038 },
  },
  {
    key: "Z Triangle",
    location: { lat: -36.89493262250368, lng: 174.80032991636796 },
  },
  {
    key: "Z Sylvia Park",
    location: { lat: -36.924761497024505, lng: 174.84190377773515 },
  },
  {
    key: "Z Highbrook",
    location: { lat: -36.93767738991612, lng: 174.8726722123008 },
  },
];

export default function TempMap() {
  const [currentStation, setCurrentStation] = useState("");
  const [stationData, setStationData] = useState({});
  const [showStationCard, setShowStationCard] = useState(false);
  const [showBackArrow, setBackArrow] = useState(false);

  // Toggle states for different services
  const [googlePingToggle, setGooglePingToggle] = useState(false);

  let map;

  function getLocationName(lng, lat) {
    const foundLocation = locations.find((location) => {
      return location.location.lng === lng && location.location.lat === lat;
    });
    return foundLocation ? foundLocation.key : null;
  }

  function handleBackArrowClick() {
    setShowStationCard(false);
    setBackArrow(false);
  }

  function handleGooglePingClick() {
    setGooglePingToggle(!googlePingToggle);
  }

  function getLngLat(name) {
    const foundLocation = locations.find((location) => location.key === name);
    return foundLocation ? foundLocation.location : null;
  }

  function handleCarWashClick() {
    if (!map) return;
    const go = async () => {
      const currentLat = map.center.lat();
      const currentLng = map.center.lng();
      const response = await fetch(`http://localhost:3000/nearestcarwash`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: currentLat,
          lng: currentLng,
        }),
      });
      const nearestStation = await response.json();
      map.panTo(new google.maps.LatLng(nearestStation.lat, nearestStation.lng));
      map.setZoom(20);
    };
    go();
  }

  function handleEvClick() {
    if (!map) return;
    const go = async () => {
      const currentLat = map.center.lat();
      const currentLng = map.center.lng();
      const response = await fetch(`http://localhost:3000/nearestev`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: currentLat,
          lng: currentLng,
        }),
      });
      const nearestStation = await response.json();
      map.panTo(new google.maps.LatLng(nearestStation.lat, nearestStation.lng));
      map.setZoom(20);
    };
    go();
  }

  function handleBathroomClick() {
    if (!map) return;
    const go = async () => {
      const currentLat = map.center.lat();
      const currentLng = map.center.lng();
      const response = await fetch(`http://localhost:3000/nearestbathroom`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: currentLat,
          lng: currentLng,
        }),
      });
      const nearestStation = await response.json();
      map.panTo(new google.maps.LatLng(nearestStation.lat, nearestStation.lng));
      map.setZoom(20);
    };
    go();
  }

  function handleCoffeeClick() {
    if (!map) return;
    const go = async () => {
      const currentLat = map.center.lat();
      const currentLng = map.center.lng();
      const response = await fetch(`http://localhost:3000/nearestcoffee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: currentLat,
          lng: currentLng,
        }),
      });
      const nearestStation = await response.json();
      map.panTo(new google.maps.LatLng(nearestStation.lat, nearestStation.lng));
      map.setZoom(20);
    };
    go();
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/stationdata/${currentStation}`
      );
      const data = await response.json();
      setStationData(data);
      setBackArrow(true);
    };
    fetchData();
  }, [currentStation]);

  const PoiMarkers = (props) => {
    map = useMap();
    const [markers, setMarkers] = useState({});
    const clusterer = MarkerClusterer;

    // Initialize MarkerClusterer, if the map has changed
    useEffect(() => {
      if (!map) return;
      if (!clusterer.current) {
        console.log(clusterer);
        clusterer.current = new MarkerClusterer({ map });
      }
    }, [map]);

    // Handle Google Ping click event
    useEffect(() => {
      if (!map) return;
      const lngLat = getLngLat(currentStation);
      if (!lngLat) return;
      map.panTo(new google.maps.LatLng(lngLat.lat, lngLat.lng));
    }, [googlePingToggle]);

    // Update markers, if the markers array has changed
    useEffect(() => {
      clusterer.current?.clearMarkers();
      clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker, key) => {
      if (marker && markers[key]) return;
      if (!marker && !markers[key]) return;

      setMarkers((prev) => {
        if (marker) {
          return { ...prev, [key]: marker };
        } else {
          const newMarkers = { ...prev };
          delete newMarkers[key];
          return newMarkers;
        }
      });
    };

    const handleClick = useCallback((ev) => {
      if (!map) return;
      if (!ev.latLng) return;
      console.log("marker clicked:", ev.latLng.toString());
      const stationName = getLocationName(ev.latLng.lng(), ev.latLng.lat());
      map.panTo(ev.latLng);
      map.setZoom(22);
      setCurrentStation(stationName);
      setShowStationCard(true);
      setBackArrow(true);
    });

    return (
      <>
        {props.pois.map((poi) => (
          <AdvancedMarker
            key={poi.key}
            position={poi.location}
            ref={(marker) => setMarkerRef(marker, poi.key)}
            clickable={true}
            onClick={handleClick}
          >
            <img src={ZPing} alt="marker" width={40} height={50} />
          </AdvancedMarker>
        ))}
      </>
    );
  };

  return (
    <div>
      <div
        className={showBackArrow ? styles.backArrow : styles.hidden}
        onClick={handleBackArrowClick}
      >
        <BackArrow />
      </div>
      <div className={showBackArrow ? styles.hidden : styles.topNav}>
        <form className={styles.searchBar}>
          <svg
            width="237"
            height="29"
            viewBox="0 0 237 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="237" height="29" rx="14.5" fill="white" />
            <path
              d="M22.7201 21.3845L18.9868 17.6499C20.1062 16.1913 20.6288 14.3615 20.4486 12.5318C20.2684 10.7021 19.399 9.00939 18.0166 7.79711C16.6343 6.58483 14.8425 5.94374 13.0048 6.00388C11.1672 6.06402 9.42118 6.82089 8.12105 8.12096C6.82093 9.42102 6.06402 11.1669 6.00388 13.0045C5.94374 14.8421 6.58486 16.6338 7.79719 18.0161C9.00953 19.3983 10.7023 20.2678 12.5321 20.4479C14.3619 20.6281 16.1917 20.1055 17.6504 18.9862L21.3868 22.7232C21.4746 22.811 21.5787 22.8806 21.6934 22.9281C21.808 22.9756 21.9309 23 22.055 23C22.1791 23 22.302 22.9756 22.4167 22.9281C22.5313 22.8806 22.6355 22.811 22.7232 22.7232C22.811 22.6355 22.8806 22.5313 22.9281 22.4167C22.9756 22.302 23 22.1792 23 22.0551C23 21.931 22.9756 21.8081 22.9281 21.6935C22.8806 21.5788 22.811 21.4746 22.7232 21.3869L22.7201 21.3845ZM7.90254 13.2478C7.90254 12.1906 8.21606 11.1571 8.80344 10.2781C9.39082 9.39905 10.2257 8.71392 11.2025 8.30935C12.1793 7.90477 13.2541 7.79891 14.291 8.00516C15.328 8.21142 16.2805 8.72051 17.0281 9.46807C17.7757 10.2156 18.2848 11.1681 18.491 12.205C18.6973 13.2419 18.5914 14.3167 18.1868 15.2934C17.7822 16.2701 17.0971 17.105 16.218 17.6923C15.3389 18.2797 14.3054 18.5932 13.2481 18.5932C11.8309 18.5917 10.472 18.0281 9.46984 17.0259C8.46766 16.0238 7.904 14.665 7.90254 13.2478Z"
              fill="#1E196B"
            />
          </svg>

          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
        </form>
        <button className={styles.homeButton}>
          <Link to="/home">
            <svg
              width="20"
              height="22"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.15525 21.4998C1.78091 21.4998 0.666748 20.3565 0.666748 18.9448V8.67583C0.666748 7.9 1.01091 7.165 1.60008 6.68083L8.44491 1.05983C8.88225 0.69768 9.43226 0.499512 10.0001 0.499512C10.5679 0.499512 11.1179 0.69768 11.5552 1.05983L18.3989 6.68083C18.9892 7.165 19.3334 7.9 19.3334 8.67583V18.9448C19.3334 20.3565 18.2192 21.4998 16.8449 21.4998H3.15525Z"
                stroke="#1E196B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.0835 21.5V15.0833C7.0835 14.4645 7.32933 13.871 7.76691 13.4334C8.2045 12.9958 8.79799 12.75 9.41683 12.75H10.5835C11.2023 12.75 11.7958 12.9958 12.2334 13.4334C12.671 13.871 12.9168 14.4645 12.9168 15.0833V21.5"
                stroke="#1E196B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </button>
      </div>
      <APIProvider apiKey={"AIzaSyBr7ORed3s00Qs8aAx_M8YGgkWq1JUeRnI"}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: -36.93766022803409, lng: 174.8148665666841 }}
          defaultZoom={12}
          mapId="acabcfd7d52bcb72"
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <PoiMarkers pois={locations} />
        </Map>
      </APIProvider>
      <div className={styles.navBar}>
        <div onClick={handleCarWashClick}>
          <CarWash color="#1E196B" />
        </div>

        <div onClick={handleEvClick}>
          <Ev2 />
        </div>

        <div onClick={handleBathroomClick}>
          <Bathroom color="#1E196B" />
        </div>

        <div onClick={handleCoffeeClick}>
          <Coffee color="#1E196B" />
        </div>

        <MobilePay />
      </div>
      <div className={styles.recenter}>
        <Recenter />
      </div>
      <StationCard
        showStationCard={showStationCard}
        handleGooglePingClick={handleGooglePingClick}
        name={stationData?.name || "Z Kingsway Station"}
        address={stationData?.address || "26 Clevedon Road, Papakura"}
        time_table={
          stationData?.time_table || {
            Sunday: "Open 24 hours",
            Monday: "Open 24 hours",
            Tuesday: "Open 24 hours",
            Wednesday: "Open 24 hours",
            Thursday: "Open 24 hours",
            Friday: "Open 24 hours",
            Saturday: "Open 24 hours",
          }
        }
        services={
          stationData?.services || [
            "Bathroom",
            "LPG SWAP'n'GO",
            "Z Express",
            "Trailer Hire",
            "ATM",
          ]
        }
        store_contact={stationData?.store_contact || "09-2988185"}
      />
    </div>
  );
}
