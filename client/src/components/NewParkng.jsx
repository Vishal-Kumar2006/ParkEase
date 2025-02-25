import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Redirect after success
import AuthContext from "../context/AuthContext";

const NewParking = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [parking, setParking] = useState({
    name: "",
    location: "",
    price: "",
    slots: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setParking({ ...parking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/parking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parking, owner: user._id }),
      });

      if (!res.ok) throw new Error("Failed to create parking post");

      navigate("/profile"); // Redirect to Profile after success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Parking</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Parking Name" value={parking.name} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={parking.location} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price per hour" value={parking.price} onChange={handleChange} required />
        <input type="number" name="slots" placeholder="Total Slots" value={parking.slots} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Parking"}</button>
      </form>
      <button onClick={() => navigate("/profile")}>Cancel</button>
    </div>
  );
};

export default NewParking;
