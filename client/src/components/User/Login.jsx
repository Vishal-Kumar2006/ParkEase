import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import axios from "axios";
import "./Login.css";

const Login = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const redirectSignUp = () => {
    navigate("/user/signup");
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!user) return;
    navigate("/user/profile");
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        formData,
        {
          withCredentials: true,
        },
      );
      console.log(user);
      setUser(response.data.user);
      alert("Login Successful");
      navigate("/parkings");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="log-in-page">
      <h2 className="log-in-heading">Login to ParkEase</h2>
      <form onSubmit={handleLogin} className="log-in-form">
        <div className="input-field">
          <label htmlFor="email" className="input-label">
            Enter E-mail
          </label>
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
        </div>

        <div className="input-field">
          <label htmlFor="password" className="input-label">
            Enter Password
          </label>
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
        </div>

        <div className="btns">
          <button type="submit" className="log-in-btn">
            Login
          </button>
        </div>
      </form>

      <div className="sign-up">
        Or
        <a onClick={redirectSignUp}> Create new Account</a>
      </div>
    </div>
  );
};

export default Login;
