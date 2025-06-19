import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import ShowParkings from "../Parking/ShowParkings.jsx";
import ShowBookings from "../Booking/ShowBookings.jsx";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [parkings, setParkings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookedParking, setBookedParking] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
          // console.log(res.data.user);
        } else {
          navigate("/user/login");
        }
      })
      .catch(() => navigate("/user/login"));
  }, [navigate]);

  useEffect(() => {
    if (user?.parkings?.length) {
      Promise.all(
        user.parkings.map(
          (parkingId) =>
            axios
              .get(`http://localhost:5000/parkings/${parkingId}`, {
                withCredentials: true,
              })
              .then((res) => res.data)
              .catch(() => null) // Handle errors
        )
      ).then((results) => setParkings(results.filter(Boolean))); // Remove null values
    }
  }, [user]);

  useEffect(() => {
    if (user?.bookings?.length > 0) {
      Promise.all(
        user.bookings.map((bookingId) =>
          axios
            .get(`http://localhost:5000/bookings/${bookingId}`, {
              withCredentials: true,
            })
            .then((response) => response.data) // Extract data
            .catch((error) => {
              console.error(`Error fetching booking ${bookingId}:`, error);
              return null; // Prevents breaking Promise.all()
            })
        )
      ).then((results) => {
        const validBookings = results.filter((booking) => booking !== null);
        setBookings(validBookings); // Set only valid bookings
      });
    }
  }, [user]);

  useEffect(() => {
    if (bookings.length > 0) {
      Promise.all(
        bookings.map((booking) =>
          axios
            .get(`http://localhost:5000/parkings/${booking.parkingId}`, {
              withCredentials: true,
            })
            .then((response) => response.data) // Extract parking data
            .catch((error) => {
              console.error(
                `Error fetching parking ${booking.parkingId}:`,
                error
              );
              return null; // Prevent breaking the entire Promise.all()
            })
        )
      ).then((results) => {
        const validParkings = results.filter((parking) => parking !== null);
        setBookedParking(validParkings); // Store fetched parking data
      });
    }
  }, [bookings]);

  const handleLogOut = () => {
    axios
      .post("http://localhost:5000/user/logout", {}, { withCredentials: true })
      .then(() => navigate("/user/login"))
      .catch((err) => console.log(err));
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile">
      <img
        className="user-photo"
        src={
          user?.photo ||
          "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        }
        alt="User Image"
      />
      <h2 className="user-name">{user?.name || "User Name"}</h2>

      <div className="user-parking">
        <h3 className="user">Parkings</h3>
        {parkings.length > 0 ? (
          <ShowParkings parkings={parkings} />
        ) : (
          <div className="user-no-parkings">
            <p>No Parking Found</p>
          </div>
        )}
        <button
          onClick={() => navigate("/parkings/new")}
          className="new-parkin-btn"
        >
          Create a new Parking
        </button>
      </div>

      <div className="user-bookings">
        <h3>Bookings</h3>
        {bookings.length > 0 ? (
          <ShowBookings parkings={bookedParking} bookings={bookings} />
        ) : (
          <p className="no-parking-msg">No bookings found.</p>
        )}

<button
          onClick={() => navigate("/parkings")}
          className="new-parkin-btn"
        >
          Create a new Boking
        </button>
      </div>

      <button onClick={handleLogOut} className="log-out-btn">Log Out</button>
    </div>
  );
};

export default Profile;
