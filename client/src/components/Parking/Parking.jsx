import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Parking.css";

const Parking = () => {
  const { id } = useParams(); // Get parking ID from URL
  const [parking, setParking] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/parkings/${id}`)
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



  return (
    <>
      <div className="parking-details">
        <img src={parking.image} alt="Parking Image" className="parking-img" />
        <div className="parking-info">
          <div className="detail">
            <h2 className="parking-name">{parking.name}</h2>
            <p className="parking-status">{parking.isOpen ? <p className="open">Opened</p>  : <p className="close">Closed</p> }</p>
          </div>
          <p className="p-d"><strong>Address:</strong> {parking.location}</p>
          <p className="p-d"> <b>Total Slots:</b> {parking.totalSlots} </p>
          <p className="p-d"> <b> Available Slots: </b>{parking.availableSlots} </p>
          <p className="p-d"><strong>Hourly Rate:</strong> ${parking.pricePerHour}</p>
          <p className="p-d">Electric Parking: {parking.isElectric ?  <p className="open">Yes</p>  : <p className="close">No</p> }</p>
        </div>
      </div>

      <div className="parking-update-btn">
        <div><button id="parking-update">Update Parking</button></div>
        <div><button id="parking-delete">Delete Parking</button></div>
      </div>
      
    </>
  );
};

export default Parking;
