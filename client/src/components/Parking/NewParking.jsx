import { useState } from "react";
import axios from "axios";
import "./NewParking.css";

const NewParking = () => {
  const [parkingData, setParkingData] = useState({
    name: "",
    image: "",
    location: "",
    totalSlots: new Array(24).fill(true), // 24-hour slots (default: all available)
    pricePerHour: "",
    isOpen: true,
    isElectric: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParkingData({
      ...parkingData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Toggle Slot Availability (True/False)
  const toggleSlot = (index) => {
    setParkingData((prevData) => {
      const updatedSlots = [...prevData.totalSlots];
      updatedSlots[index] = !updatedSlots[index]; // Toggle the slot
      return { ...prevData, totalSlots: updatedSlots };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Create new parking entry
      const response = await axios.post(
        "http://localhost:5000/parkings/new",
        parkingData,
        { withCredentials: true }
      );
      
    
      // Add this Parking id into user info
      const newParkingId = response.data.newParking._id; 
  
      // Fetch the current user data
      const userResponse = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
      });
  
      let userData = userResponse.data.user;

      // Update the user's parking array with the new parking ID
      const updatedParkings = [...userData.parkings, newParkingId];
  
      // Send the update request to the backend (to add this parking in user's info)
      await axios.put(
        `http://localhost:5000/user/${userData._id}/update`, 
        { parkings: updatedParkings }, 
        { withCredentials: true }
      );
  
      alert("Parking Created and User Updated Successfully!");

      window.location.href = `http://localhost:5173/parkings/${newParkingId}`;
  
      // Reset Form
      setParkingData({
        name: "",
        image: "",
        location: "",
        totalSlots: new Array(24).fill(true),
        pricePerHour: "",
        isOpen: true,
        isElectric: true,
      });
    } catch (error) {
      console.error("Error creating parking:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized! Please log in again.");
        window.location.href = "http://localhost:5173/user/login";
      } else {
        alert("Failed to create parking.");
      }
    }
  };  

  return (
    <div className="NewParking">
      <h2 className="NewParking-heading">Create New Parking</h2>
      <form onSubmit={handleSubmit}>
        <div className="newParking-input">
          <label>Parking Name:</label>
          <input
            type="text"
            name="name"
            className="input"
            value={parkingData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="newParking-input">
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            className="input"
            value={parkingData.image}
            onChange={handleChange}
            placeholder="Optional (Default Image Used)"
          />
        </div>

        <div className="newParking-input">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            className="input"
            value={parkingData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="newParking-input">
          <label>Price Per Hour:</label>
          <input
            type="number"
            name="pricePerHour"
            className="input"
            value={parkingData.pricePerHour}
            onChange={handleChange}
            required
          />
        </div>

        <div className="newParking-dual-input">
          <div className="newParking-input check">
            <label>Open Status</label>
            <input
              type="checkbox"
              name="isOpen"
              className="check-input"
              checked={parkingData.isOpen}
              onChange={handleChange}
            />
          </div>

          <div className="newParking-input check">
            <label>Is Electric Parking</label>
            <input
              type="checkbox"
              name="isElectric"
              className="check-input"
              checked={parkingData.isElectric}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* ✅ Slots Section */}
        <div className="slots-container">
          <h3>24-Hour Slots</h3>
          <div className="slots-grid">
            {parkingData.totalSlots.map((slot, index) => (
              <button
                key={index}
                className={`slot-btn ${slot ? "available" : "booked"}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleSlot(index);
                }}
              >
                {index}  to {index + 1} {slot ? "🟢" : "🔴"}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="newParking-btn">
          Create Parking
        </button>
      </form>
    </div>
  );
};

export default NewParking;