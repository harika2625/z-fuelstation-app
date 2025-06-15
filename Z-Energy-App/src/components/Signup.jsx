import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Clock from "../common/Clock";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateName = (value) => {
    if (!value.trim()) return "Name is required";
    return "";
  };

  const validateEmail = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!value.trim()) return "Email is required";
    if (!emailRegex.test(value)) return "Enter a valid email";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors((prev) => ({ ...prev, name: validateName(value) }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isFormValid = () => {
    return (
      !validateName(name) &&
      !validateEmail(email) &&
      !validatePassword(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ name: nameError, email: emailError, password: passwordError });

    if (nameError || emailError || passwordError) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    axios
      .post("http://localhost:3000/register", { name, email, password })
      .then((result) => {
        console.log(result);
        toast.success("Registered Successfully");
        navigate("/Notification");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Registration failed");
      });
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.blueContainer}>
        <div className={styles.statusIcons}>
          <Clock />
          <img src="/high-connection.png" alt="networkConnection" />
          <img src="/wifi.png" alt="Wifi" />
          <img src="/full-battery.png" alt="Battery" />
        </div>
        <div className={styles.Zlogo}>
          <img src="/logo .png" alt="Z-Energy Logo" />
        </div>
      </div>

      <div className={styles.yellowLine}></div>
      <h3>Create an Account</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label>
            <strong>Name</strong>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            autoComplete="off"
            onChange={handleNameChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.inputContainer}>
          <label>
            <strong>E-mail</strong>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
            onChange={handleEmailChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.inputContainer}>
          <label>
            <strong>Password</strong>
          </label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <button type="button" className={styles.signup} onClick={handleSubmit}>
          Sign up
        </button>
      </form>

      <div className={styles.loginContainer}>
        <p>Already have an Account ?</p>
        <Link to="/Login" className={styles.login}>
          Login
        </Link>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Signup;
