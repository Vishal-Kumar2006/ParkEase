import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import "./Parking.css";

const Parking = () => {
  const { id } = useParams(); // Get parking ID from URL
  const [parking, setParking] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`http://localhost:5000/parkings/${id}`)
      .then((response) => {
        setParking(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parking details:", error);
      });
  }, [id]);

  if (!parking) {
    return <h2>Loading...</h2>;
  }

  const handleUpdate = () => {
    navigate(`/parkings/${parking._id}/update`, { state: { parking } });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/parkings/${id}/delete`)
      .then(() => {
        alert("Parking deleted successfully.");
        window.location.href = "http://localhost:5173/parkings"; // ✅ Corrected redirect
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      });
  };

  return (
    <>
      <div className="parking-details">
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
            {" "}
            <b>Total Slots:</b> {parking.totalSlots}{" "}
          </p>
          <p className="p-d">
            {" "}
            <b> Available Slots: </b>
            {parking.availableSlots}{" "}
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
      </div>

      <div className="parking-update-btn">
        <div>
          <button id="parking-update" onClick={handleUpdate}>
            Update Parking
          </button>
        </div>
        <div>
          <button id="parking-delete" onClick={() => handleDelete()}>
            Delete Parking
          </button>
        </div>
      </div>
    </>
  );
};

export default Parking;
