import { useNavigate } from "react-router-dom";
import "./HomeCard.css";

const HomeCard = ({ card }) => {
  const navigate = useNavigate();
  if (!card) return null;

  return (
    <div className="HomeCard">
      <div className="HomeCard-Left">
        <img src={card.image} alt={card.name} />
      </div>

      <div className="HomeCard-Right">
        <div className="HomeCard-Details">
          <h3>{card.name}</h3>
          <p className="card-detail">{card.detail}</p>
        </div>

        {card.button && (
          <div
            onClick={() => navigate(`/${card.button}`)}
            className="HomeCard-Button">
            {`Go to ${card.name}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCard;
