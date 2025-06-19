import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ElectricParking.css";

const ElectricParking = () => {
  const [allParkings, setAllParkings] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    axios.get("http://localhost:5000/parkings", { withCredentials: true })
    .then(response => {
        setAllParkings(response.data)
    })
    .catch(error => {
        if (error.response && error.response.status === 401) {
            navigate("/user/login");
        } else {
            console.error("Error fetching parkings:", error);
        }
    });
  }, []);

  return (
    <div className="Electric-Parkings">
      {allParkings
        .filter((parking) => parking.isElectric) // ✅ Filter only electric parkings
        .map((parking) => (
          <div key={parking._id} className="Electric-parking-card">
            {parking.image ? (
              <img src={parking.image} alt="Parking" className="Electric-parking-img" />
            ) : null}

            <div className="Electric-detail">
              <h2 className="Electric-parking-name">{parking.name}</h2>
              <p className="Electric-parking-status">
                {parking.isOpen ? (
                  <span className="open">Opened</span>
                ) : (
                  <span className="close">Closed</span>
                )}
              </p>
            </div>
            <p className="Electric-parking-address">
              <strong>Address:</strong> {parking.location}
            </p>
            <div className="Electric-parkings-btn">
              <button
                onClick={() => navigate(`/parkings/${parking._id}`)}
                className="Electric-parking-btn"
              >
                See Parking
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ElectricParking;
