import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import ShowParkings from "../Parking/ShowParkings.jsx";
import ShowBookings from "../Booking/ShowBookings.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const Profile = () => {
  // All Storage area

  const { user, setUser } = useAuth();

  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);

  const [parkings, setParkings] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [bookedParking, setBookedParking] = useState([]);

  const navigate = useNavigate();

  // Step 1: Check if the user is Logged in
  useEffect(() => {
    if (!user) {
      navigate("/user/login");
    }
  }, []);

  // Step 2: Collect User data from backend if user is Logged In
  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setUserData(res.data.user);
          setUserDataLoading(false);
        } else {
          navigate("/user/login");
        }
      })
      .catch(() => navigate("/user/login"));
  }, [user, navigate]);

  // Step 2: Collect Parking's data Created by User
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5000/parkings/getParking-byUserId`, {
          withCredentials: true,
        })
        .then((res) => {
          setParkings(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [user, userData]);

  // Step 3: Collect Booking data booked by user
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5000/bookings/getBooking_byUserId`, {
          withCredentials: true,
        })
        .then((res) => {
          setBookings(res.data);
        })
        .catch((error) => {
          setBookings(null);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, [user, userData]);

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
                error,
              );
              return null; // Prevent breaking the entire Promise.all()
            }),
        ),
      ).then((results) => {
        const validParkings = results.filter((parking) => parking !== null);
        setBookedParking(validParkings);
      });
    }
  }, [bookings]);

  // Handle if user Try to Logout
  const handleLogOut = () => {
    axios
      .post("http://localhost:5000/user/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate("/user/login");
      })
      .catch((err) => console.log(err));
  };

  // If User is loggedin and it's data is loading
  if (!userData && userDataLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile">
      {/* Profile Data of User */}
      <div className="profile-data">
        <div className="profile-image">
          <img
            className="user-photo"
            src={
              userData?.photo ||
              "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            }
            alt="User Image"
          />
        </div>
        <div className="profile-data-info">
          <h2 className="user-name">{userData?.name || "User Name"}</h2>
          <div className="parking-and-booking">
            <div className="parking-data">
              <h2>{parkings.length ? parkings.length : 0} </h2>
              <p>Parkings </p>
            </div>

            <div className="booking-data">
              <h2>{bookings.length ? bookings.length : 0} </h2>
              <p>Bookings </p>
            </div>
          </div>
        </div>
      </div>

      {/* Parkings created by this user */}
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
          className="new-parking-btn">
          Create a new Parking
        </button>
      </div>

      {/* Booked Parking by the User */}
      <div className="user-bookings">
        <h3>Bookings</h3>
        {bookings.length > 0 ? (
          <ShowBookings parkings={bookedParking} bookings={bookings} />
        ) : (
          <p className="no-parking-msg">No bookings found.</p>
        )}

        <button
          onClick={() => navigate("/parkings")}
          className="new-parking-btn">
          Create a new Boking
        </button>
      </div>

      <button onClick={handleLogOut} className="log-out-btn">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
