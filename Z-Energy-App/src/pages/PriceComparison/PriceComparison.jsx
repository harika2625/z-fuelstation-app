import React from "react";
import styles from "./PriceComparison.module.css";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import WebHeader from "../../common/WebHeader";
import WebFooter from "../../common/WebFooter";

export default function PriceComparison() {
  const [leftstations, setLeftStations] = useState([]);
  const [rightstations, setRightStations] = useState([]);
  const [leftAddress, setLeftAddress] = useState("");
  const [rightAddress, setRightAddress] = useState("");

  const Z91 = "/Property 1=91 sharetank, Property 2=clicked.png";
  const Z95 = "/Property 1=95 sharetank, Property 2=clicked.png";
  const ZDiesel = "/Property 1=ZD sharetank, Property 2=clicked.png";

  const leftInput = useRef();
  const rightInput = useRef();

  function handleSubmit() {
    setLeftAddress(leftInput.current.value);
    setRightAddress(rightInput.current.value);
  }
  useEffect(() => {
    fetch(
      `http://localhost:3000/stations${
        leftAddress ? `?search_string=${leftAddress}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setLeftStations(data.response);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [leftAddress]);

  useEffect(() => {
    fetch(
      `http://localhost:3000/stations${
        rightAddress ? `?search_string=${rightAddress}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setRightStations(data.response);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [rightAddress]);

  return (
    <div className={styles.pageContainer}>
      <WebHeader />
      <div className={styles.header}>
        <Link to="/Home">
          <button className={styles.homeBtn}>
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.111 17.5002C4.12933 17.5002 3.3335 16.6836 3.3335 15.6752V8.34023C3.3335 7.78606 3.57933 7.26106 4.00016 6.91523L8.88933 2.90023C9.20171 2.64155 9.59458 2.5 10.0002 2.5C10.4057 2.5 10.7986 2.64155 11.111 2.90023L15.9993 6.91523C16.421 7.26106 16.6668 7.78606 16.6668 8.34023V15.6752C16.6668 16.6836 15.871 17.5002 14.8893 17.5002H5.111Z"
                  fill="url(#paint0_linear_1_1127)"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.91699 17.5V12.9167C7.91699 12.4746 8.09259 12.0507 8.40515 11.7382C8.71771 11.4256 9.14163 11.25 9.58366 11.25H10.417C10.859 11.25 11.2829 11.4256 11.5955 11.7382C11.9081 12.0507 12.0837 12.4746 12.0837 12.9167V17.5"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1_1127"
                    x1="20.1483"
                    y1="10.0677"
                    x2="3.3335"
                    y2="10.0677"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.317457"
                      stopColor="#3129AB"
                      stopOpacity="0.782912"
                    />
                    <stop offset="0.897669" stopColor="#1E196B" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </button>
        </Link>
        <h2>Price Comparison</h2>
      </div>

      <div className={styles.jumpNav}>
        <ul>
          <li className={styles.jumpNavItem}>
            How to enjoy Z station{" "}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.194 6.84483C11.2815 6.74813 11.3277 6.62107 11.3229 6.49075C11.318 6.36043 11.2625 6.23716 11.168 6.14723C11.0736 6.05731 10.9477 6.00784 10.8173 6.00938C10.6869 6.01093 10.5623 6.06336 10.47 6.1555L6.50066 10.3228L6.50066 0.500162C6.50066 0.367553 6.44798 0.240376 6.35421 0.146608C6.26044 0.0528398 6.13326 0.000161671 6.00066 0.000161659C5.86805 0.000161648 5.74087 0.0528397 5.6471 0.146608C5.55333 0.240376 5.50066 0.367553 5.50066 0.500162L5.50066 10.3228L1.53066 6.1555C1.48539 6.10791 1.4312 6.06971 1.37118 6.04307C1.31115 6.01643 1.24647 6.00188 1.18082 6.00024C1.11516 5.9986 1.04983 6.0099 0.988552 6.03351C0.92727 6.05712 0.871239 6.09257 0.823657 6.13783C0.776074 6.18309 0.737873 6.23728 0.711234 6.29731C0.684595 6.35733 0.670039 6.42202 0.668398 6.48767C0.666758 6.55332 0.678065 6.61865 0.701673 6.67993C0.72528 6.74121 0.760727 6.79725 0.80599 6.84483L5.51732 11.7915C5.6202 11.8996 5.75635 11.97 5.90399 11.9915C5.96794 12.0031 6.03346 12.0028 6.09732 11.9908C6.24448 11.969 6.38012 11.8986 6.48266 11.7908L11.194 6.84483Z"
                fill="black"
              />
            </svg>
          </li>
          <li className={styles.jumpNavItem}>
            Reward and promotion{" "}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.194 6.84483C11.2815 6.74813 11.3277 6.62107 11.3229 6.49075C11.318 6.36043 11.2625 6.23716 11.168 6.14723C11.0736 6.05731 10.9477 6.00784 10.8173 6.00938C10.6869 6.01093 10.5623 6.06336 10.47 6.1555L6.50066 10.3228L6.50066 0.500162C6.50066 0.367553 6.44798 0.240376 6.35421 0.146608C6.26044 0.0528398 6.13326 0.000161671 6.00066 0.000161659C5.86805 0.000161648 5.74087 0.0528397 5.6471 0.146608C5.55333 0.240376 5.50066 0.367553 5.50066 0.500162L5.50066 10.3228L1.53066 6.1555C1.48539 6.10791 1.4312 6.06971 1.37118 6.04307C1.31115 6.01643 1.24647 6.00188 1.18082 6.00024C1.11516 5.9986 1.04983 6.0099 0.988552 6.03351C0.92727 6.05712 0.871239 6.09257 0.823657 6.13783C0.776074 6.18309 0.737873 6.23728 0.711234 6.29731C0.684595 6.35733 0.670039 6.42202 0.668398 6.48767C0.666758 6.55332 0.678065 6.61865 0.701673 6.67993C0.72528 6.74121 0.760727 6.79725 0.80599 6.84483L5.51732 11.7915C5.6202 11.8996 5.75635 11.97 5.90399 11.9915C5.96794 12.0031 6.03346 12.0028 6.09732 11.9908C6.24448 11.969 6.38012 11.8986 6.48266 11.7908L11.194 6.84483Z"
                fill="black"
              />
            </svg>
          </li>
          <li className={styles.jumpNavItem}>
            Location{" "}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.194 6.84483C11.2815 6.74813 11.3277 6.62107 11.3229 6.49075C11.318 6.36043 11.2625 6.23716 11.168 6.14723C11.0736 6.05731 10.9477 6.00784 10.8173 6.00938C10.6869 6.01093 10.5623 6.06336 10.47 6.1555L6.50066 10.3228L6.50066 0.500162C6.50066 0.367553 6.44798 0.240376 6.35421 0.146608C6.26044 0.0528398 6.13326 0.000161671 6.00066 0.000161659C5.86805 0.000161648 5.74087 0.0528397 5.6471 0.146608C5.55333 0.240376 5.50066 0.367553 5.50066 0.500162L5.50066 10.3228L1.53066 6.1555C1.48539 6.10791 1.4312 6.06971 1.37118 6.04307C1.31115 6.01643 1.24647 6.00188 1.18082 6.00024C1.11516 5.9986 1.04983 6.0099 0.988552 6.03351C0.92727 6.05712 0.871239 6.09257 0.823657 6.13783C0.776074 6.18309 0.737873 6.23728 0.711234 6.29731C0.684595 6.35733 0.670039 6.42202 0.668398 6.48767C0.666758 6.55332 0.678065 6.61865 0.701673 6.67993C0.72528 6.74121 0.760727 6.79725 0.80599 6.84483L5.51732 11.7915C5.6202 11.8996 5.75635 11.97 5.90399 11.9915C5.96794 12.0031 6.03346 12.0028 6.09732 11.9908C6.24448 11.969 6.38012 11.8986 6.48266 11.7908L11.194 6.84483Z"
                fill="black"
              />
            </svg>
          </li>
        </ul>
      </div>
      <img
        src="/money doodle 1.png"
        alt="money doodle"
        className={styles.banner}
      />

      <div className={styles.heroContainer}>
        <img
          src="/price comparison 1.png"
          alt="Compare prices fueling image"
          className={styles.heroImage}
        />
      </div>

      <div>
        <h2 className={styles.searchTitle}>Compare Prices Across Stations</h2>
      </div>

      <form
        className={styles.searchForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={styles.inputContainer}>
          <input
            className={styles.addressInput}
            placeholder="Enter Address"
            ref={leftInput}
          />
          <input
            className={styles.addressInput}
            placeholder="Enter Address"
            ref={rightInput}
          />
        </div>
        <button className={styles.compareBtn}>Compare</button>
      </form>

      <div className={styles.priceComparisonContainer}>
        <section className={styles.left}>
          {leftstations.map((station) => (
            <div key={station._id} className={styles.stationCard}>
              <img
                src={"/pngwing.com.png"}
                alt="Station"
                className={styles.stationImage}
              />
              <h3>{station.name}</h3>
              <p className={styles.address}>{station.address}</p>
              <p
                className={
                  station.fuel_type === "91"
                    ? styles.fuelPrice91
                    : station.fuel_type === "95"
                    ? styles.fuelPrice95
                    : styles.fuelPriceDiesel
                }
              >{`$${station.fuel_price} per liter`}</p>
              <img
                src={
                  station.fuel_type === "91"
                    ? Z91
                    : station.fuel_type === "95"
                    ? Z95
                    : ZDiesel
                }
                alt="Z 95"
              />
              <button className={styles.topUpBtn}>Top up</button>
            </div>
          ))}
        </section>
        <section className={styles.right}>
          {rightstations.map((station) => (
            <div key={station._id} className={styles.stationCard}>
              <img
                src={"/pngwing.com.png"}
                alt="Station"
                className={styles.stationImage}
              />
              <h3>{station.name}</h3>
              <p className={styles.address}>{station.address}</p>
              <p
                className={
                  station.fuel_type === "91"
                    ? styles.fuelPrice91
                    : station.fuel_type === "95"
                    ? styles.fuelPrice95
                    : styles.fuelPriceDiesel
                }
              >{`$${station.fuel_price} per liter`}</p>
              <img
                src={
                  station.fuel_type === "91"
                    ? Z91
                    : station.fuel_type === "95"
                    ? Z95
                    : ZDiesel
                }
                alt="Z 95"
              />
              <button className={styles.topUpBtn}>Top up</button>
            </div>
          ))}
        </section>
      </div>

      <div className={styles.priceComparisonWebContainer}>
        <section className={styles.left}>
          {leftstations.map((station) => (
            <div key={station._id} className={styles.stationCard}>
              <div>
                <img
                  src={
                    station.fuel_type === "91"
                      ? Z91
                      : station.fuel_type === "95"
                      ? Z95
                      : ZDiesel
                  }
                  alt="Z 95"
                />
              </div>
              <img
                src={"/WhiteZLogo.png"}
                alt="Station"
                className={styles.stationImage}
              />

              <h3>{station.name}</h3>
              <p className={styles.address}>{station.address}</p>
              <p
                className={
                  station.fuel_type === "91"
                    ? styles.fuelPrice91
                    : station.fuel_type === "95"
                    ? styles.fuelPrice95
                    : styles.fuelPriceDiesel
                }
              >{`$${station.fuel_price} per liter`}</p>
              <button className={styles.topUpBtn}>Top up</button>
            </div>
          ))}
        </section>
        <section className={styles.right}>
          {rightstations.map((station) => (
            <div key={station._id} className={styles.stationCard}>
              <div>
                <img
                  src={
                    station.fuel_type === "91"
                      ? Z91
                      : station.fuel_type === "95"
                      ? Z95
                      : ZDiesel
                  }
                  alt="Z 95"
                />
              </div>
              <img
                src={"/WhiteZLogo.png"}
                alt="Station"
                className={styles.stationImage}
              />
              <h3>{station.name}</h3>
              <p className={styles.address}>{station.address}</p>
              <p
                className={
                  station.fuel_type === "91"
                    ? styles.fuelPrice91
                    : station.fuel_type === "95"
                    ? styles.fuelPrice95
                    : styles.fuelPriceDiesel
                }
              >{`$${station.fuel_price} per liter`}</p>
              <button className={styles.topUpBtn}>Top up</button>
            </div>
          ))}
        </section>
      </div>
      <WebFooter />
    </div>
  );
}
