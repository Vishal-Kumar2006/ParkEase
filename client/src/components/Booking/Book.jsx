import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";
import "../Parking/Parking.css";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CarRepairIcon from "@mui/icons-material/CarRepair";

const Book = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [parking, setParking] = useState(null);

  const [avilableSlots, setAvilableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const fetchData = async () => {
    axios
      .get(`${API_URL}/parkings/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setParking(res.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.error("Unauthorized access. Redirecting to login...");
          navigate("/user/signup");
        } else {
          console.error("Error fetching data:", error);
        }
      });
  };

  // Fetch parking and user(Admin) details in
  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!parking) return;
    const updatedSlots = parking.totalSlots
      .map((isAvailable, index) => (isAvailable ? index : null))
      .filter((slot) => slot !== null);

    setAvilableSlots(updatedSlots);
  }, [parking]);

  if (!parking) return <h2>Loading...</h2>;

  const handleSlot = (slot) => {
    setSelectedSlots(
      (prevSlots) =>
        prevSlots.includes(slot)
          ? prevSlots.filter((s) => s !== slot) // Remove slot if already selected
          : [...prevSlots, slot], // Add slot if not selected
    );
  };

  // Updated Booking Function
  const handleBooking = async () => {
    if (!user) {
      alert("You need to log in to book a parking slot.");
      return navigate("/user/signup");
    }

    if (selectedSlots.length === 0) {
      alert("Please select at least one slot.");
      return;
    }

    const bookingData = {
      userId: user._id,
      parkingId: id,
      bookedSlots: selectedSlots,
      totalAmount: selectedSlots.length * parking.pricePerHour,
      status: "Booked",
    };

    try {
      const response = await axios.post(
        `${API_URL}/bookings/book`,
        bookingData,
        {
          withCredentials: true,
        },
      );

      alert("Booking successful!");
      navigate("/parkings"); // Redirect to user bookings page
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <>
      <div
        className={`view-parking-details parking-isElectric-${parking.isElectric}`}>
        {/*  Display Admin Name When Available */}
        <div className="parking-admin">
          <div className="parking-admin-image">
            <img
              src={
                parking.user.photo
                  ? parking.user.photo
                  : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              }
              alt="parking-admin-photo"
              className="parking-admin-photo"
            />
          </div>

          <p className="parking-admin-name">
            {parking.user.name ? parking.user.name : "Anonyms"}
          </p>
        </div>

        <div className="">
          <img
            src={parking.image}
            alt="Parking Image"
            className="view-parking-image"
          />
        </div>

        <div className="parking-info">
          <div className="parking-detail-header">
            <h2 className="parking-name">{parking.name}</h2>
            <p className="view-parking-status">
              {parking.isOpen ? (
                <span className="open">Opened</span>
              ) : (
                <span className="close">Closed</span>
              )}
            </p>
          </div>

          <div className="view-parking-sub-details">
            <p>
              <strong>Address:</strong> {parking.location}
            </p>

            <p>
              <strong>Charges Per Hour:</strong> ₹{parking.pricePerHour}
            </p>
          </div>

          <div className="view-parking-sub-details">
            <p>
              <strong>Created At : </strong>
              {new Date(parking.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            <p>
              Electric Parking
              <strong>
                : {parking.isElectric ? " Available" : " Not-Available"}
              </strong>
            </p>
          </div>

          {/* ✅ Slot Selection */}

          <div className="parking-slots-div">
            <h4>All Available Slots are given Below</h4>
            <div className="slots-container-grid">
              {avilableSlots.map((slot, index) => (
                <div
                  onClick={() => handleSlot(slot)}
                  style={{ cursor: "pointer" }}
                  className={`slots-container-single-grid ${selectedSlots.includes(slot) ? "grid-booked" : "grid-available"}`}>
                  <button
                    style={{ cursor: "pointer" }}
                    key={index}
                    className={`parking-slot-btn ${selectedSlots.includes(slot) ? "booked" : "available"}`}>
                    {selectedSlots.includes(slot) ? (
                      <CarRepairIcon className="slot-btn" />
                    ) : (
                      <DirectionsCarIcon className="slot-btn" />
                    )}
                  </button>
                  <p className="">
                    {index} - {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="parking-controll-btn-div">
        <button onClick={handleBooking} className="parking-controll-btn">
          Book Parking
        </button>
      </div>
    </>
  );
};

export default Book;
