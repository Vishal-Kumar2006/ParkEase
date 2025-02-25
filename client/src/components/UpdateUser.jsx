import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No user data found!");
    navigate("/login");
    return null;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("No token found! Please log in again.");
    navigate("/login");
    return null;
  }

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
    password: "",
    photoUrl: user.photoUrl || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/user/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        console.log("Updated User:", data.user);

        localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));

        navigate("/profile", { state: { user: { ...user, ...formData } } });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Mobile:</label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

        <label>New Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter new password (optional)" />

        <label>Profile Photo URL:</label>
        <input type="text" name="photoUrl" value={formData.photoUrl} onChange={handleChange} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;