import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./AllParkings.css";

const AllParkings = () => {
  const [allParkings, setAllParkings] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    axios.get("http://localhost:5000/parkings")
      .then((response) => {
        setAllParkings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parkings:", error);
      });
  }, []);

  return (
    <div className="Parkings">
      {allParkings.map((parking) => (
        <div key={parking._id} className="parking-card">
          <img src={parking.image} alt="Parking Image" className="parking-img" />
          <div className="detail">
            <h2 className="parking-name">{parking.name}</h2>
            <p className="parking-status">{parking.isOpen ? <p className="open">Opened</p>  : <p className="close">Closed</p> }</p>
          </div>
          <p className="parking-address"><strong>Address:</strong> {parking.location}</p>
          <div className="parkings-btn">
            <button onClick={() => navigate(`/parkings/${parking._id}`)} className="parking-btn">See Parking</button> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllParkings;

