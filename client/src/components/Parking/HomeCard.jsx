import "./HomeCard.css";

const HomeCard = ({ card }) => {
  if (!card) return null;

  return (
    <div className="HomeCard">
      <div className="HomeCard-Left">
        <img src={card.image} alt={card.name} />
      </div>

      <div className="HomeCard-Right">
        <h3>{card.name}</h3>
        <p className="HomeCard-Detail">{card.detail}</p>
      </div>
    </div>
  );
};

export default HomeCard;
