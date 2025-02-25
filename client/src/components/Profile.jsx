import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state || JSON.parse(localStorage.getItem("user")); // ✅ Get user from state or localStorage

  if (!user) {
    alert("No user data found! Please log in.");
    navigate("/login");
    return null;
  }

  const handleUpdateClick = () => {
    navigate("/update-profile", { state: { user } });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Welcome, {user.name || "User"}!</h2>
      <p>Email: {user.email}</p>
      <p>Mobile: {user.mobile}</p>
      <img
        src={user.photoUrl || "https://via.placeholder.com/150"}
        alt="Profile"
        width="150"
      />

      <br />
      <button
        onClick={handleUpdateClick}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Update Profile
      </button>

      <button onClick={handleLogout} className="btn logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Profile;