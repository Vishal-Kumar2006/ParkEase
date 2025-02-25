import "./Signup.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    photoUrl: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(formData.password) || !/\d/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) {
      return "Password must contain at least one uppercase letter, one number, and one special character.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match!";
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      return "Mobile number must be exactly 10 digits.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Sign Up Successful! Redirecting...");

        // ✅ Store user data (not just token)
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        setTimeout(() => navigate("/profile"), 1000);
      } else {
        setError(data.message || "Sign Up Failed! Please try again.");
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" autoComplete="name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" autoComplete="email" onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile" autoComplete="tel" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" autoComplete="new-password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete="new-password" onChange={handleChange} required />
        <input type="text" name="photoUrl" placeholder="Photo URL (optional)" autoComplete="image" onChange={handleChange} />

        <button type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default SignUp;