import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewHome from "../Review/ReviewHome.jsx";
import "./Parking.css";
import { useAuth } from "../../context/AuthContext.jsx";
import API_URL from "../../config/api.js";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CarRepairIcon from "@mui/icons-material/CarRepair";

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
      .get(`${API_URL}/parkings/${id}`, {
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
            {parking?.user.name || "Anonyms"}
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

          <div className="parking-slots-div">
            <h4>24 Hour's Parking Slot</h4>
            <div className="slots-container-grid">
              {parking.totalSlots.map((slot, index) => (
                <div
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
        </div>
      </div>

      <div className="about-slots">
        <div className="">
          <div className={`grid-available`}>
            <button className={`parking-slot-btn available`}>
              <DirectionsCarIcon className="about-slots-icons" />
            </button>
            <p className="">Time</p>
          </div>
          <h3>Available</h3>
        </div>

        <div className="">
          <div className={`grid-booked`}>
            <button className={`parking-slot-btn available`}>
              <CarRepairIcon className="about-slots-icons" />
            </button>
            <p className="">Time</p>
          </div>
          <h3>Not-Available</h3>
          <p></p>
        </div>
      </div>

      {/* Conditionally Render Update & Delete Buttons if User is Authorized */}
      {user && parking.user && user._id === parking.user._id ? (
        <div className="parking-controll-btn-div">
          <button
            className="parking-controll-btn"
            onClick={() =>
              navigate(`/parkings/${parking._id}/update`, {
                state: { parking },
              })
            }>
            Update Parking
          </button>

          <button
            className="parking-controll-btn"
            onClick={async () => {
              if (
                window.confirm("Are you sure you want to delete this parking?")
              ) {
                try {
                  await axios.delete(`${API_URL}/parkings/${id}/delete`, {
                    withCredentials: true,
                  });
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
        <div className="parking-controll-btn-div">
          <button
            className="parking-controll-btn"
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
