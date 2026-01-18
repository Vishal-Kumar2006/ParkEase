import { useNavigate } from "react-router-dom";
import "./ShowParkings.css";

const ShowParkings = ({ parkings }) => {
  // ✅ Accept `parkings` as a prop
  const navigate = useNavigate();

  return (
    <div className="Parkings">
      {parkings.map((parking) => (
        <div key={parking._id} className={`parking-card`}>
          {parking.image ? (
            <img src={parking.image} alt="Parking" className="parking-img" />
          ) : null}

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

          <p className="parking-address">
            <strong>Address:</strong> {parking.location}
          </p>

          <div className="parkings-btn">
            <button
              onClick={() => navigate(`/parkings/${parking._id}`)}
              className="parking-btn">
              See Parking
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowParkings;
