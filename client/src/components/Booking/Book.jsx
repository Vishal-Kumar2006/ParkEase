import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Parking/Parking.css";

const Book = () => {
  const { id } = useParams();
  const [parking, setParking] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [parkingAdmin, setParkingAdmin] = useState(null);
  const [avilableSlots, setAvilableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [parkingRes, userRes] = await Promise.all([
          axios.get(`http://localhost:5000/parkings/${id}`, {
            withCredentials: true,
          }),
          axios.get("http://localhost:5000/user/", { withCredentials: true }),
        ]);
        setParking(parkingRes.data);
        setCurrUser(userRes.data.user);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("Unauthorized access. Redirecting to login...");
          navigate("/user/login");
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    if (parking?.user) {
      axios
        .get(`http://localhost:5000/user/${parking.user}`, {
          withCredentials: true,
        })
        .then((response) => {
          setParkingAdmin(response.data);
          const updatedSlots = parking.totalSlots
            .map((isAvailable, index) => (isAvailable ? index : null))
            .filter((slot) => slot !== null); // Remove null values
          setAvilableSlots(updatedSlots);
        })
        .catch((error) => {
          console.error("Error fetching admin user:", error);
        });
    }
  }, [parking]);

  if (!parking) return <h2>Loading...</h2>;

  const handleSlot = (slot) => {
    console.log(selectedSlots.includes(slot));

    setSelectedSlots((prevSlots) =>
      prevSlots.includes(slot)
        ? prevSlots.filter((s) => s !== slot) // Remove slot if already selected
        : [...prevSlots, slot] // Add slot if not selected
    );
  }

  // ✅ Updated Booking Function
  const handleBooking = async () => {
    if (!currUser) {
      alert("You need to log in to book a parking slot.");
      return navigate("/user/login");
    }
    if (selectedSlots.length === 0) {
      alert("Please select at least one slot.");
      return;
    }

    const bookingData = {
      userId: currUser._id,
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
        }
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
        className={`parking-details ${parking.isElectric ? "electric" : ""}`}
      >
        <div className="parking-admin">
          <img
            src={parkingAdmin ? parkingAdmin.photo : "Loading..."}
            alt=""
            className="parking-admin-photo"
          />
          <p className="parking-admin-name">
            {parkingAdmin ? parkingAdmin.name : "Loading..."}
          </p>
        </div>
        <img src={parking.image} alt="Parking Image" className="parking-img" />
        <div className="parking-info">
          <div className="detail">
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
            <b>Total Slots:</b> {parking.totalSlots}
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

          {/* ✅ Slot Selection */}
          {console.log(avilableSlots)}
          <div className="slots-container">
            <h3>All Available Slots are given Below</h3>
            <div className="slots-grid">
              {avilableSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`slot-btn booking-slot-btn ${selectedSlots.includes(slot)  ? "booked" : "available"}`}
                  onClick={() => handleSlot(slot)}
                >
                  
                  {slot} to {slot + 1} {selectedSlots.includes(slot) ? "✅" : "🟢"}
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
