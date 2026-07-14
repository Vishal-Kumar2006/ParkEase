import { useNavigate } from "react-router-dom";
import "./ShowParkings.css";

const ShowParkings = ({ parkings }) => {
  // ✅ Accept `parkings` as a prop
  const navigate = useNavigate();

  return (
    <div className="Parkings">
      {parkings.map((parking) => (
        <div
          key={parking._id}
          className={`parking-card electric-${parking.isElectric} parking-open-${parking.isOpen}`}
          onClick={() => navigate(`/parkings/${parking._id}`)}>
          <div className="parking-img-div">
            {parking.image ? (
              <img src={parking.image} alt="Parking" className="parking-img" />
            ) : (
              <img
                src="https://thumbs.dreamstime.com/b/web-324671543.jpg"
                alt="Parking"
                className="parking-img"
              />
            )}
          </div>

          <div className="detail">
            <div className="parking-details">
              <h2 className="parking-name">{parking.name}</h2>
              <p className="parking-status">
                {parking.isOpen ? (
                  <span className="parking-status-open">Opened</span>
                ) : (
                  <span className="parking-status-close">Closed</span>
                )}
              </p>
            </div>
            <div className="parking-sub-details">
              <div className="">
                <p className="parking-address">
                  <strong> Location: </strong>
                  {parking.location}
                </p>
              </div>

              <div className="">
                <p>
                  <strong>
                    {parking.isElectric ? "Electric " : "Non-Electric "}
                  </strong>
                  Parking
                </p>
                <p>
                  <strong>₹{parking.pricePerHour} / slot </strong>
                </p>
              </div>
              <div className="parking-date-div">
                <p className="parking-date-createdAt">
                  <strong>
                    {new Date(parking.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowParkings;
