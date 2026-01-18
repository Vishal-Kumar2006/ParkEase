const LoadUser = () => {
  return (
    <div className="profile">
      <div className="profile-data">
        <img
          className="user-photo"
          src={
            "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          }
          alt="User Image"
        />

        <h2 className="user-name"></h2>
      </div>
      {/* Here will be LoadParking.jsx */}
      {/* Here will be LoadBooking.jsx */}

      <div className="user-parking">
        <h3 className="user">Parkings</h3>
        {parkings.length > 0 ? (
          <ShowParkings parkings={parkings} />
        ) : (
          <div className="user-no-parkings">
            <p>No Parking Found</p>
          </div>
        )}
        <button
          onClick={() => navigate("/parkings/new")}
          className="new-parkin-btn">
          Create a new Parking
        </button>
      </div>

      <div className="user-bookings">
        <h3>Bookings</h3>
        {bookings.length > 0 ? (
          <ShowBookings parkings={bookedParking} bookings={bookings} />
        ) : (
          <p className="no-parking-msg">No bookings found.</p>
        )}

        <button
          onClick={() => navigate("/parkings")}
          className="new-parkin-btn">
          Create a new Boking
        </button>
      </div>

      <button className="log-out-btn"></button>
    </div>
  );
};

export default Profile;
