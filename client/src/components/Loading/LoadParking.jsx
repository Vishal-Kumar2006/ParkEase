import "./LoadParking.css";

const LoadParking = () => {
  const Card = () => {
    return (
      <div className={`parking-card-loading`}>
        <div className="parking-img-loading"></div>
        <div className="detail-loading"></div>
        <p className="parking-address-loading"></p>
        <p className="parking-address-loading-half"></p>
      </div>
    );
  };

  const cards = [];
  for (let i = 0; i < 6; i++) {
    cards.push(<Card key={i} />);
  }

  return <div className="LoadParking">{cards}</div>;
};
export default LoadParking;
