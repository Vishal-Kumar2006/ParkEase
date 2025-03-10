import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const redirectSignUp = () => {
    navigate("/user/signup");
  }

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      const response = await axios.post("http://localhost:5000/user/login", formData, {
        withCredentials: true,
      });
      alert("Login Successful");
      navigate("/parkings");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="log-in-page">
      <h2 className="log-in-heading">Login</h2>
      <form onSubmit={handleLogin} className="log-in-form">
        <label htmlFor="email" className="input-label">Enter E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="log-in-input"
          required
          autoComplete="email"
        />

        <label htmlFor="password" className="input-label">Enter Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="log-in-input"
          required
          autoComplete="current-password"
        />

        <button type="submit" className="log-in-btn">Login</button>
      </form>
      <button onClick={redirectSignUp} className="sign-up-btn">Create new Account</button>
    </div>
  );
};

export default Login;