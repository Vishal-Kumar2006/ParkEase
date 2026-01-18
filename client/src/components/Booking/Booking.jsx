import { useLocation } from "react-router-dom";
import "./Booking.css";

const Booking = () => {
  const { state } = useLocation();

  if (!state) return <p>Invalid Booking</p>;

  const { booking, parking } = state;

  const hoursPassed =
    (new Date() - new Date(booking.bookingTime)) / (1000 * 60 * 60);

  const isValid = hoursPassed < 24;

  return (
    <div className="Booking">
      <div className="BookingDetails">
        <div className="booking-img">
          <img src={parking.image} alt={parking.name} />
        </div>

        <div className="booking-details">
          <h2>{parking.name}</h2>

          <div className="booking-details-block">
            <p>
              {" "}
              <b>Location: </b>
              {parking.location}
            </p>
            <p className={parking.isOpen ? "Valid" : "Expired"}>
              <b> {parking.isOpen ? "Opened" : "Closed"} </b>{" "}
            </p>
          </div>
          <p>
            <b>
              {parking.isElectric
                ? "Electric Parking Available"
                : "Electric Parking Not Available"}
            </b>
          </p>
        </div>

        <div className="booking-info">
          <h3>Booking Info</h3>
          <div className="booking-info-block">
            <p>Status: {booking.status}</p>
            <p className={isValid ? "Valid" : "Expired"}>
              Time: {hoursPassed.toFixed(2)} hours ago{" "}
              {isValid ? "(Valid)" : "(Expired)"}
            </p>
          </div>
        </div>

        <hr />

        <div className="booking-info">
          <h4>Booked Slots</h4>
          <div className="slots">
            {booking.bookedSlots.map((slot, index) => (
              <p className={isValid ? "Valid" : "Expired"} key={index}>
                Slot {slot} - {slot + 1}
              </p>
            ))}
          </div>
          <div className="booking-info-block">
            <p>
              Per Slot Amount :{" "}
              <b> ₹{booking.totalAmount / booking.bookedSlots.length} / Slot</b>
            </p>
            <p>
              Total Amount: <b> ₹{booking.totalAmount} </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
