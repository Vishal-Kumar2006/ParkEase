import { useNavigate } from "react-router-dom";
import "./ShowBookings.css";

const ShowBookings = ({ parkings, bookings }) => {
  const navigate = useNavigate();

  if (!bookings || bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <div className="ShowBookings">
      {bookings.map((booking) => {
        const parking = parkings.find(
          (p) => p._id.toString() === booking.parkingId.toString()
        );

        if (!parking) return null;

        return (
          <div key={booking._id} className="booking-card">
            <img src={parking.image} alt={parking.name} />
            <div className="card-details">
              <h3>{parking.name}</h3>
              <p>
                <b>Location</b>: {parking.location}
              </p>
              <p>
                {" "}
                <b>Location</b> {booking.status}
              </p>
              <p>
                {" "}
                <b>Total Amount:</b> ₹{booking.totalAmount}
              </p>

              <button
                onClick={() =>
                  navigate(`/show-booking/${booking._id}`, {
                    state: { booking, parking },
                  })
                }>
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowBookings;
