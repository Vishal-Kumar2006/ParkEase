import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./NewParking.css";
import API_URL from "../../config/api";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import Checkbox from "@mui/material/Checkbox";

const NewParking = () => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  const [parkingData, setParkingData] = useState({
    name: "",
    image: "",
    location: "",
    totalSlots: new Array(24).fill(true), // 24-hour slots (default: all available)
    pricePerHour: "",
    isOpen: true,
    isElectric: true,
  });

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      navigate("/user/signup");
    }
  }, []);

  const uploadImage = async () => {
    if (!imageFile) {
      console.log("Image:", imageFile);
      throw new Error("No image selected");
    }

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "ParkEase");
    data.append("folder", "Parking");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhj0i3rr1/image/upload",
      {
        method: "POST",
        body: data,
      },
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error?.message || "Image upload failed");
    }

    return result.secure_url;
  };

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
    let imageUrl = "";

    if (imageFile) {
      imageUrl = await uploadImage();
    }

    const payload = {
      ...parkingData,
      image: imageUrl,
    };
    try {
      // Create new parking entry
      const response = await axios.post(`${API_URL}/parkings/new`, payload, {
        withCredentials: true,
      });

      // Add this Parking id into user info
      const newParkingId = response.data.newParking._id;

      alert("Parking Created Successfully!");
      navigate(`/parkings/${newParkingId}`);

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
        alert("Unauthorized! Please log in");
        navigate("/user/signup");
      } else {
        alert("Failed to create parking.");
      }
    }
  };

  return (
    <div className="NewParking">
      <h2 className="NewParking-heading">Create New Parking</h2>
      <form onSubmit={handleSubmit} className="new-parking-form">
        <div className="newParking-singleInput-div">
          <label className="newParking-label">Parking Name</label>
          <input
            type="text"
            name="name"
            className="newParking-input"
            placeholder="Enter Parking Name"
            value={parkingData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="newParking-singleInput-div">
          <label className="newParking-label">Parking Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter Parking Location"
            className="newParking-input"
            value={parkingData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="newParking-dualInput-div">
          <div className="">
            <label className="newParking-label">Select Parking Image </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="newParking-dual-input"
              id="newParking-Image"
            />
          </div>

          <div className="">
            <label className="newParking-label">Per Hour Charges</label>
            <input
              type="number"
              name="pricePerHour"
              className="newParking-dual-input"
              value={parkingData.pricePerHour}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="newParking-dualInput-div">
          <div className="form-check form-switch">
            <input
              className="form-check-input newParking-input"
              type="checkbox"
              role="switch"
              id="isOpenSwitch"
              name="isOpen"
              checked={parkingData.isOpen}
              onChange={handleChange}
            />
            <label
              className="form-check-label newParking-label"
              htmlFor="isOpenSwitch">
              Open Status
            </label>
          </div>

          <div className="form-check form-switch">
            <input
              className="form-check-input newParking-input"
              type="checkbox"
              role="switch"
              id="isOpenSwitch"
              name="isElectric"
              checked={parkingData.isElectric}
              onChange={handleChange}
            />
            <label
              className="form-check-label newParking-label"
              htmlFor="isOpenSwitch">
              Is Electric Parking
            </label>
          </div>
        </div>

        {/* ✅ Slots Section */}
        <div className="parking-slots-div">
          <h4>Fix 24 hour Available Parking Slot</h4>
          <div className="slots-container-grid">
            {parkingData.totalSlots.map((slot, index) => (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  toggleSlot(index);
                }}
                className={`slots-container-single-grid ${slot ? "grid-available" : "grid-booked"}`}>
                <button
                  key={index}
                  className={`parking-slot-btn ${slot ? "available" : "booked"}`}>
                  {slot ? (
                    <DirectionsCarIcon className="slot-btn" />
                  ) : (
                    <CarRepairIcon className="slot-btn" />
                  )}
                </button>
                <p className="">
                  {index} - {index + 1}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="create-newParking-btn">
          Create Parking
        </button>
      </form>
    </div>
  );
};

export default NewParking;
