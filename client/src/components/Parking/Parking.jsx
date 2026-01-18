import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewHome from "../Review/ReviewHome.jsx";
import "./Parking.css";
import { useAuth } from "../../context/AuthContext.jsx";

const Parking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [parking, setParking] = useState(null);

  useEffect(() => {
    if (!user || user == null) {
      alert("Please login first");
      navigate("/user/login");
    }
  }, []);

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

  if (!parking) {
    return <h2>Loading...</h2>;
  }

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
                  className={`slot-btn ${slot ? "available" : "booked"}`}>
                  {index} to {index + 1} {slot ? "🟢" : "🔴"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {console.log(user._id === parking.user._id)}
      {/* Conditionally Render Update & Delete Buttons if User is Authorized */}
      {user && parking.user && user._id === parking.user._id ? (
        <div className="parking-update-btn">
          <button
            id="parking-update"
            onClick={() =>
              navigate(`/parkings/${parking._id}/update`, {
                state: { parking },
              })
            }>
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
                    { withCredentials: true },
                  );
                  alert("Parking deleted successfully.");
                  navigate("/parkings");
                } catch (error) {
                  console.error("Error deleting parking:", error);
                  alert(
                    `Error: ${error.response?.data?.message || error.message}`,
                  );
                }
              }
            }}>
            Delete Parking
          </button>
        </div>
      ) : (
        <div className="parking-update-btn">
          <button
            id="parking-update"
            onClick={() => navigate(`/booking/${parking._id}`)}>
            Book Parking
          </button>
        </div>
      )}

      <ReviewHome parkingId={id} />
    </>
  );
};

export default Parking;
