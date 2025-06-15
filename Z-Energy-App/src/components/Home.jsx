import React from "react";
import styles from "./Home.module.css";
import Clock from "../common/Clock";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.greetingContainer}>
        <div className={styles.statusIcons}>
          <Clock />
          <img src="/Cellular Connection.png" alt="Network Connection"></img>
          <img src="/Property 1=icon, Property 2=wifi.png" alt="Wifi"></img>
          <img src="/Battery.png" alt="Battery"></img>
        </div>
        <div className={styles.greeting}>
          <h2>Kia Ora Alex,</h2>
          <div className={styles.greetingText}>
            <img src="/Property 1=icon, Property 2=ev1.png" alt="Wifi"></img>
            <p>Sharetank</p>
          </div>
          <p>
            Maximize Your Fuel,
            <br />
            Amplify Your Sharing
          </p>
          <button>View my tank</button>
        </div>
      </div>
      <div className={styles.fuelFoodContainer}>
        <div className={styles.leftContainer}>
          <img src="/Property 1=icon, Property 2=graph.png"></img>
          <p>Fuel Price Comparison</p>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.orderFoodContainer}>
            Order Food
            <img src="/Property 1=icon, Property 2=pie.png"></img>
          </div>
          <div className={styles.nearMeContainer}>
            Z<br />
            Near me
            <img src="/Property 1=icon, Property 2=find Z.png"></img>
          </div>
        </div>
      </div>
      <div className={styles.navBarContainer}>
        <img src="public/Property 1=icon, Property 2=HOME.png"></img>
        <img src="/Property 1=icon, Property 2=qr.png"></img>
        <img src="/Property 1=icon, Property 2=sharetank.png"></img>
        <img src="/Property 1=icon, Property 2=hamburger menu.png"></img>
      </div>
    </div>
  );
}
export default Home;
