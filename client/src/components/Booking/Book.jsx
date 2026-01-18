import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../Parking/Parking.css";

const Book = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [parking, setParking] = useState(null);

  const [avilableSlots, setAvilableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const fetchData = async () => {
    axios
      .get(`http://localhost:5000/parkings/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setParking(res.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.error("Unauthorized access. Redirecting to login...");
          navigate("/user/login");
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
      return navigate("/user/login");
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
        "http://localhost:5000/bookings/book",
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
        className={`parking-details ${parking.isElectric ? "electric" : ""}`}>
        {/*  Display Admin Name When Available */}
        <div className="parking-admin">
          <div className="parking-admin-image">
            <img
              src={
                parking.user.photo
                  ? parking.user.photo
                  : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              }
              alt=""
              className="parking-admin-photo"
            />
          </div>

          <p className="parking-admin-name">
            {" "}
            {parking.user.name ? parking.user.name : "Anonyms"}
          </p>
        </div>

        <img
          src={parking.image}
          alt="Parking Image"
          className="parking-image"
        />
        <div className="parking-info">
          <div className="detail">
            <div className="detail-header">
              <h2 className="parking-name">{parking.name}</h2>
              <p className="parking-status">
                {parking.isOpen ? (
                  <span className="open">Opened</span>
                ) : (
                  <span className="close">Closed</span>
                )}
              </p>
            </div>

            <p className="p-d">
              <strong>Address:</strong> {parking.location}
            </p>
            <p className="p-d">
              <b>Total Slots:</b> {parking.totalSlots.length}
            </p>
            <p className="p-d">
              <b>Available Slots:</b> {parking.availableSlots}
            </p>
            <p className="p-d">
              <strong>Hourly Rate:</strong> ${parking.pricePerHour}
            </p>
            <p className="p-d">
              Electric Parking:{" "}
              {parking.isElectric ? (
                <span className="open">Yes</span>
              ) : (
                <span className="close">No</span>
              )}
            </p>
          </div>

          {/* ✅ Slot Selection */}
          <div className="slots-container">
            <h3>All Available Slots are given Below</h3>
            <div className="slots-grid">
              {avilableSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`slot-btn booking-slot-btn ${
                    selectedSlots.includes(slot) ? "booked" : "available"
                  }`}
                  onClick={() => handleSlot(slot)}>
                  {slot} to {slot + 1}{" "}
                  {selectedSlots.includes(slot) ? "✅" : "🟢"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="parking-update-btn">
        <button onClick={handleBooking} id="parking-booking">
          Book Parking
        </button>
      </div>
    </>
  );
};

export default Book;
