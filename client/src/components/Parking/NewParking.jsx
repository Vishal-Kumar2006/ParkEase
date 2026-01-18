import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./NewParking.css";

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
      navigate("/user/login");
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
    console.log("Cloudinary response:", result);

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
      const response = await axios.post(
        "http://localhost:5000/parkings/new",
        payload,
        { withCredentials: true },
      );

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
        navigate("/user/login");
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
          <label>Image :</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="input"
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
                }}>
                {index} to {index + 1} {slot ? "🟢" : "🔴"}
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
