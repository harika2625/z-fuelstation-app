import styles from "./PaymentDetails.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Clock from "../common/Clock";

function PaymentDetails() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/PaymentDetails", {
        cardNumber,
        expiryDate,
        cvv,
        cardHolderName,
      })
      .then((result) => {
        console.log("Saved to DB:", result.data);
        navigate("/Login"); // Navigate after successful save
      })
      .catch((error) => {
        console.error("Error saving payment:", error);
        alert("Something went wrong. Please try again!");
      });
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.statusIcons}>
        <Clock />
        <img src="/Cellular Connection.png" alt="Network Connection"></img>
        <img src="/Property 1=icon, Property 2=wifi.png" alt="Wifi"></img>
        <img src="/Battery.png" alt="Battery"></img>
      </div>
      <h3 className={styles.title}>
        <img src="/Property 1=icon, Property 2=card.png" alt="Wifi"></img>Add
        Payment Details
      </h3>
      <p className={styles.textLine}>
        Save Payment detail now, fuel up straight away
      </p>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <label htmlFor="cardNumber">
            <strong>Card Number</strong> <br />
          </label>
          <div className={styles.cardInputContainer}>
            <input
              type="text"
              placeholder="Enter card Number"
              autoComplete="off"
              className={styles.cardNumber}
              name="cardNumber"
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <img
              src="/Frame 7079.png"
              alt="Visacard"
              className={styles.cardTypeIcon}
            ></img>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="expiryDate">
            <strong>Expiry Date</strong> <br />
          </label>
          <input
            type="text"
            id="expiryDate"
            placeholder="MM/YY"
            autoComplete="off"
            name="expiryDate"
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="cvv">
            <strong>CVV Number</strong> <br />
          </label>
          <div className={styles.cardInputContainer}>
            <input
              type="password"
              id="cvv"
              placeholder="Enter CVV"
              className={styles.cvv}
              name="cvv"
              onChange={(e) => setCvv(e.target.value)}
            />
            <img
              src="/Property 1=icon, Property 2=question mark.png"
              alt="Visacard"
              className={styles.cvvIcon}
            ></img>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="cardHolderName">
            <strong>Name on Card</strong> <br />
          </label>
          <input
            type="text"
            id="cardHolderName"
            placeholder="Enter cardholder's name"
            autoComplete="off"
            name="cardHolderName"
            onChange={(e) => setCardHolderName(e.target.value)}
          />
        </div>
        <div className={styles.saveButtonContainer}>
          <button
            variant="outlined "
            type="submit"
            className={styles.saveLaterButton}
          >
            Save Later
          </button>
          <button
            variant="outlined "
            type="submit"
            className={styles.saveButton}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
export default PaymentDetails;
