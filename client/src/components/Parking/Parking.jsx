import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Parking.css";

const Parking = () => {
  const { id } = useParams(); // Get parking ID from URL
  const [parking, setParking] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch parking and user details in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [parkingRes, userRes] = await Promise.all([
          axios.get(`http://localhost:5000/parkings/${id}`, { withCredentials: true }),
          axios.get("http://localhost:5000/user/", { withCredentials: true })
        ]);
        setParking(parkingRes.data);
        setUser(userRes.data.user);
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

  if (!parking) {
    return <h2>Loading...</h2>;
  }

  // ✅ Handle update navigation
  const handleUpdate = () => {
    navigate(`/parkings/${parking._id}/update`, { state: { parking } });
  };

  // ✅ Handle delete operation
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this parking?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/parkings/${id}/delete`, {
        withCredentials: true,
      });
      alert("Parking deleted successfully.");
      navigate("/parkings");
    } catch (error) {
      console.error("Error deleting parking:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <>
      <div className="parking-details">
        {console.log(user)} {/* Debugging purpose */}

        <img src={parking.image} alt="Parking Image" className="parking-img" />
        <div className="parking-info">
          <div className="detail">
            <h2 className="parking-name">{parking.name}</h2>
            <p className="parking-status">
              {parking.isOpen ? <span className="open">Opened</span> : <span className="close">Closed</span>}
            </p>
          </div>
          <p className="p-d"><strong>Address:</strong> {parking.location}</p>
          <p className="p-d"><b>Total Slots:</b> {parking.totalSlots}</p>
          <p className="p-d"><b>Available Slots:</b> {parking.availableSlots}</p>
          <p className="p-d"><strong>Hourly Rate:</strong> ${parking.pricePerHour}</p>
          <p className="p-d">
            Electric Parking: {parking.isElectric ? <span className="open">Yes</span> : <span className="close">No</span>}
          </p>

          <div className="slots-container">
          <h3>24-Hour Slots</h3>
          <div className="slots-grid">
            {parking.totalSlots.map((slot, index) => (
              <button
                key={index}
                className={`slot-btn ${slot ? "available" : "booked"}`}
              >
                {index}  to {index + 1} {slot ? "🟢" : "🔴"}
              </button>
            ))}
          </div>
        </div>
          
        </div>

      </div>

      {/* ✅ Conditionally Render Update & Delete Buttons if User is Authorized */}
      {user && (
        <div className="parking-update-btn">
          <button id="parking-update" onClick={handleUpdate}>Update Parking</button>
          <button id="parking-delete" onClick={handleDelete}>Delete Parking</button>
        </div>
      )}
    </>
  );
};

export default Parking;