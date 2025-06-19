import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShowBookings.css";

const ShowBookings = ({ parkings, bookings }) => {
  const navigate = useNavigate();
  const [uniqueParkings, setUniqueParkings] = useState([]);

  // ✅ Remove duplicate parkings
  useEffect(() => {
    const filteredParkings = Array.from(
      new Map(parkings.map((p) => [p._id, p])).values()
    );
    setUniqueParkings(filteredParkings);
  }, [parkings]);

  return (
    <div className="ShowBookings">
      {uniqueParkings.length > 0 ? (
        uniqueParkings.map((parking) => {
          // ✅ Filter bookings for the current parking
          const filteredBookings = bookings.filter(
            (booking) => booking.parkingId.toString() === parking._id.toString()
          );

          return (
            <div
              key={parking._id}
              className={`bookedParking ${
                parking.isElectric ? "electric" : ""
              }`}
            >
              <img src={parking.image} alt="Booking Image" />

              <div className="bookedParking-status">
                <h3>{parking.name}</h3>
                <div>
                  {parking.isOpen ? (
                    <span className="open">Opened</span>
                  ) : (
                    <span className="close">Closed</span>
                  )}
                </div>
              </div>

              <div className="booking-info">
                <p>
                  {parking.isElectric
                    ? "Electric Parking Avilable"
                    : "Electric Parking Not-Avilable"}
                </p>
                <p className="booking-location">Location: {parking.location}</p>
                <p>Parice {parking.pricePerHour} Rs/Slot</p>
              </div>

              <h2 className="booking-slots-h">Your Booked Slots's</h2>

              {/* ✅ Display booked slots */}
              {filteredBookings.length > 0 ? (
                <div className="all-booking-slots">
                  {filteredBookings.map((booking, idx) => {
                    const validity =
                      24 >
                      (new Date() - new Date(booking.bookingTime)) /
                        (1000 * 60 * 60);

                    return (
                      <div
                        key={booking._id}
                        className={`booking ${
                          validity ? "valid" : "not-valid"
                        }`}
                      >
                        <p>
                          Time{" "}
                          {(
                            (new Date() - new Date(booking.bookingTime)) /
                            (1000 * 60 * 60)
                          ).toFixed(2)}{" "}
                          hours ago
                          {validity ? " (Valid) " : " (Expired) "}
                        </p>

                        <p>Booking No.{idx + 1}</p>
                        <p>Status : {booking.status}</p>

                        <div>
                          <h5 className="total-slots">Total Slots</h5>
                          <div className="booking-slots-time">
                            {" "}
                            {booking.bookedSlots.map((slot, index) => (
                              <p key={index}>
                                {slot} - {slot + 1}{" "}
                              </p>
                            ))}
                          </div>
                        </div>

                        <p>Total Amount : {booking.totalAmount} Rs.</p>
                        <p>
                          {booking.totalAmount / booking.bookedSlots.length} Rs
                          / Slots
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No bookings for this parking.</p>
              )}
            </div>
          );
        })
      ) : (
        <p>No unique parkings found.</p>
      )}
    </div>
  );
};

export default ShowBookings;
