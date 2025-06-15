import React from "react";
import styles from "./StationCard.module.css";
import { Link } from "react-router-dom";
import googlePing from "../../../assets/Property 1=icon, Property 2=googlemap.png";
import CarWash from "./svg/CarWash";
import Coffee from "./svg/Coffee";
import Ev from "./svg/Ev";
import Lpg from "./svg/Lpg";
import Trailer from "./svg/Trailer";
import Bathroom from "./svg/Bathroom";
import Atm from "./svg/atm";
import dollarSign from "../../../assets/Ellipse 47.png";
import fuelGauge from "../../../assets/Ellipse 36.png";
import coffeeImage from "../../../assets/Ellipse 35.png";

export default function StationCard({
  showStationCard,
  handleGooglePingClick,
  name,
  address,
  time_table,
  services,
  store_contact,
}) {
  return (
    <div className={showStationCard ? styles.container : styles.hidden}>
      <div className={styles.stationCard}>
        <div className={styles.topDiv}>
          <div className={styles.headerDiv}>
            <h2 className={styles.header}>{name}</h2>
            <p className={styles.address}>{address}</p>
          </div>
          <img
            className={styles.googlePing}
            src={googlePing}
            alt="station"
            onClick={() => handleGooglePingClick(name)}
          />
        </div>
        <div className={styles.timeTable}>
          <ul className={styles.timeTableDay}>
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thurs</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul className={styles.timeTableHours}>
            <li>{time_table.Sunday}</li>
            <li>{time_table.Monday}</li>
            <li>{time_table.Tuesday}</li>
            <li>{time_table.Wednesday}</li>
            <li>{time_table.Thursday}</li>
            <li>{time_table.Friday}</li>
            <li>{time_table.Saturday}</li>
          </ul>
        </div>
        <div className={styles.services}>
          <h4 className={styles.servicesHeader}>Services Offered</h4>
          <div>
            {services.map((service, index) =>
              service === "Bathroom" ? (
                <Bathroom color="#34C759" />
              ) : service === "LPG SWAP'n'GO" ? (
                <Lpg />
              ) : service === "Z Express" ? (
                <Coffee color="#34C759" />
              ) : service === "Trailer Hire" ? (
                <Trailer />
              ) : service === "ATM" ? (
                <Atm />
              ) : service === "EV Charging" ? (
                <Ev />
              ) : service === "Z20 Carwash" ? (
                <CarWash color="#34C759" />
              ) : null
            )}
          </div>
        </div>
        <div className={styles.priceComparisonDiv}>
          <div className={styles.cardText}>
            <h2>Worried about Prices?</h2>
            <Link to="/pricecomparison">
              <p>Click Here</p>
            </Link>
          </div>
          <img src={dollarSign} alt="dollar sign" />
        </div>
        <div className={styles.contactDiv}>
          <h4>Contact Store</h4>
          <div className={styles.phoneContact}>
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.916855 4.75151C2.03696 7.19018 4.02683 9.12306 6.49702 10.1718L6.89369 10.3486C7.33295 10.5442 7.82716 10.5785 8.28923 10.4454C8.7513 10.3123 9.15158 10.0204 9.41952 9.62117L9.9381 8.84884C10.0193 8.72772 10.0521 8.5806 10.0302 8.43646C10.0083 8.29232 9.93317 8.16162 9.81969 8.07009L8.06269 6.65259C8.0015 6.60326 7.93097 6.5668 7.85534 6.54541C7.77971 6.52401 7.70053 6.51813 7.62257 6.5281C7.5446 6.53807 7.46946 6.56369 7.40164 6.60343C7.33383 6.64317 7.27474 6.6962 7.22794 6.75934L6.68427 7.49259C5.28871 6.80335 4.15909 5.67353 3.4701 4.27784L4.20277 3.73418C4.26591 3.68737 4.31895 3.62829 4.35869 3.56047C4.39842 3.49266 4.42405 3.41751 4.43402 3.33955C4.44399 3.26158 4.4381 3.18241 4.41671 3.10677C4.39531 3.03114 4.35885 2.96061 4.30952 2.89943L2.89202 1.14243C2.80049 1.02894 2.66979 0.953842 2.52565 0.931924C2.38151 0.910006 2.23439 0.942858 2.11327 1.02401L1.33569 1.54551C0.934005 1.81488 0.64099 2.2181 0.508843 2.68334C0.376696 3.14858 0.413998 3.64562 0.614105 4.08593L0.916855 4.75151Z"
                fill="white"
              />
            </svg>
            <p>{store_contact}</p>
          </div>
        </div>
        <div className={styles.linkCards}>
          <div className={styles.cardText}>
            <h2>Need more energy?</h2>
            <Link to="/">
              <p>Pre-order Now!</p>
            </Link>
          </div>
          <img src={coffeeImage} alt="Coffee" />
        </div>
        <div className={styles.linkCards}>
          <div className={styles.cardText}>
            <h2>Out of Fuel?</h2>
            <Link to="/">
              <p>Top up now, Click here!</p>
            </Link>
          </div>
          <img src={fuelGauge} alt="empty fuel gauge" />
        </div>
      </div>
    </div>
  );
}
