import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewForm from "../Review/ReviewForm.jsx";
import AllReviews from "../Review/AllReviews.jsx";
import "./Parking.css";

const Parking = () => {
  const { id } = useParams();
  const [parking, setParking] = useState(null);
  const [currUser, setCurrUser] = useState(null);
  const [parkingAdmin, setParkingAdmin] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch parking and user details in parallel
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

  // ✅ Fetch Admin Data When `parking.user` is Available
  useEffect(() => {
    if (parking?.user) {
      axios
        .get(`http://localhost:5000/user/${parking.user}`, {
          withCredentials: true,
        })
        .then((response) => {
          setParkingAdmin(response.data); // ✅ Store admin data in state
        })
        .catch((error) => {
          console.error("Error fetching admin user:", error);
        });
    }
  }, [parking]);

  if (!parking) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div
        className={`parking-details ${parking.isElectric ? "electric" : ""}`}
      >
        {/* ✅ Display Admin Name When Available */}
        <div className="parking-admin">
          <img
            src={parkingAdmin ? parkingAdmin.photo : "Loading..."}
            alt=""
            className="parking-admin-photo"
          />
          <p className="parking-admin-name">
            {" "}
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
            <strong>Charges Per Hour:</strong> ${parking.pricePerHour}
          </p>
          <p className="p-d">
            Electric Parking:{" "}
            {parking.isElectric ? (
              <span className="open">Yes</span>
            ) : (
              <span className="close">No</span>
            )}
          </p>

          <div className="slots-container">
            <h3>24-Hour Slots</h3>
            <div className="slots-grid">
              {parking.totalSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`slot-btn ${slot ? "available" : "booked"}`}
                >
                  {index} to {index + 1} {slot ? "🟢" : "🔴"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Conditionally Render Update & Delete Buttons if User is Authorized */}
      {currUser && parking.user && currUser._id === parking.user ? (
        <div className="parking-update-btn">
          <button
            id="parking-update"
            onClick={() =>
              navigate(`/parkings/${parking._id}/update`, {
                state: { parking },
              })
            }
          >
            Update Parking
          </button>
          <button
            id="parking-delete"
            onClick={async () => {
              if (
                window.confirm("Are you sure you want to delete this parking?")
              ) {
                try {
                  await axios.delete(
                    `http://localhost:5000/parkings/${id}/delete`,
                    { withCredentials: true }
                  );
                  alert("Parking deleted successfully.");
                  navigate("/parkings");
                } catch (error) {
                  console.error("Error deleting parking:", error);
                  alert(
                    `Error: ${error.response?.data?.message || error.message}`
                  );
                }
              }
            }}
          >
            Delete Parking
          </button>
        </div>
      ) : (
        <div className="parking-update-btn">
          <button
            id="parking-update"
            onClick={() => navigate(`/booking/${parking._id}`)}
          >
            Book Parking
          </button>

          <ReviewForm parkingId={parking._id}/>
          <AllReviews allReviews={parking.review} />
        </div>
      )}
    </>
  );
};

export default Parking;
