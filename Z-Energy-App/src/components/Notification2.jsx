import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Notification2.module.css";

function Notification2() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/PaymentDetails", {
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "sucessfully logged in") {
          navigate("/PaymentDetails");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={styles.signUpContainer}>
      <div className={styles.blueContainer}>
        <div className={styles.statusIcons}>
          <p>9:41</p>
          <img src="/high-connection.png" alt="networkConnection"></img>
          <img src="/wifi.png" alt="Wifi"></img>
          <img src="/full-battery.png" alt="Battery"></img>
        </div>
      </div>
      <div className={styles.yellowLine}></div>
      <form onSubmit={handleSubmit}>
        <p className={styles.notificationText}>
          Allow this application to access your device's Location.These can be
          configured in Settings.
        </p>
        <div className={styles.notificationForm}></div>
        <Link to="/PaymentDetails" type="submit" className={styles.twoButtons}>
          <button type="submit" className={styles.login}>
            <p className={styles.dontAllow}>Dont Allow</p>
          </button>
          <div className={styles.verticalDivider}></div>
          <button type="submit" className={styles.login}>
            <p className={styles.allow}>Allow</p>
          </button>
        </Link>
      </form>
    </div>
  );
}
export default Notification2;
