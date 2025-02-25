import "./Card.css";

export default function Card({ card }) {
  // Set default image if card.image is null
  let image = card.image ? card.image : "https://compote.slate.com/images/22ce4663-4205-4345-8489-bc914da1f272.jpeg?crop=1560%2C1040%2Cx0%2Cy0&width=960";

  return (
    <div className="card">
      <h2>{card.title}</h2>
      <img src={image} alt="Parking Image" /> {/* Corrected syntax */}
      <p className="description">{card.description}</p>
    </div>
  );
}
