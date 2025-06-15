import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Clock from "../common/Clock";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    axios
      .post("http://localhost:3000/login", {
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "successfully logged in") {
          navigate("/home");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={styles.signUpContainer}>
      <div className={styles.blueContainer}>
        <div className={styles.statusIcons}>
          <Clock />
          <img src="/high-connection.png" alt="networkConnection"></img>
          <img src="/wifi.png" alt="Wifi"></img>
          <img src="/full-battery.png" alt="Battery"></img>
        </div>
        <div className={styles.Zlogo}>
          <img src="/logo .png" alt="Z-Energy Logo" />
        </div>
      </div>
      <div className={styles.yellowLine}></div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.login}>
          <strong>Login</strong>
        </button>
      </form>
    </div>
  );
}
export default Login;
