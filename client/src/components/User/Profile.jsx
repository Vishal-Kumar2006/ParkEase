import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import ShowParkings from "../Parking/ShowParkings";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [parkings, setParkings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get("http://localhost:5000/user", { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          navigate("/user/login");
        }
      })
      .catch(() => navigate("/user/login"));
  }, [navigate]);

  useEffect(() => {
    if (user?.parkings?.length) {
      Promise.all(
        user.parkings.map((parkingId) =>
          axios.get(`http://localhost:5000/parkings/${parkingId}`, { withCredentials: true })
            .then((res) => res.data)
            .catch(() => null) // Handle errors
        )
      ).then((results) => setParkings(results.filter(Boolean))); // Remove null values
    }
  }, [user]);

  useEffect(() => {
    if (user?.bookings?.length) {
      Promise.all(
        user.bookings.map((bookingId) =>
          axios.get(`http://localhost:5000/bookings/${bookingId}`, { withCredentials: true })
            .then((res) => res.data)
            .catch(() => null) 
        )
      ).then((results) => setBookings(results.filter(Boolean)));
    }
  }, [user]);

  const handleLogOut = () => {
    axios.post("http://localhost:5000/user/logout", {}, { withCredentials: true })
      .then(() => navigate("/user/login"))
      .catch((err) => console.log(err));
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile">
      <img 
        src={user?.profileImage || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} 
        alt="User Image" 
      />
      <h2>{user?.name || "User Name"}</h2>

      <h3>Parkings</h3>
      {parkings.length > 0 ? (
        <ShowParkings parkings={parkings} />
      ) : (
        <p>No parkings found.</p>
      )}

      <h3>Bookings</h3>
      {bookings.length > 0 ? (
        <ShowParkings parkings={bookings} />
      ) : (
        <p>No bookings found.</p>
      )}

      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default Profile;
