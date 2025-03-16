import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "", // Added photo field
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/signup", formData);
      alert("User Created Successfully");
      navigate("/parkings");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="sign-up-page">
      <h2 className="sign-up-heading">Sign Up</h2>
      <form onSubmit={handleSubmit} className="sign-up-form">

        <label htmlFor="name" className="input-label">Enter User Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="sign-up-input"
          required
          autoComplete="name"
        />

        <label htmlFor="email" className="input-label">Enter E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="sign-up-input"
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
          className="sign-up-input"
          required
          autoComplete="password"
        />

        {/* New field for photo */}
        <label htmlFor="photo" className="input-label">Profile Photo URL</label>
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={formData.photo}
          onChange={handleChange}
          className="sign-up-input"
          required
        />

        <button type="submit" className="sign-up-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;