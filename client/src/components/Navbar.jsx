import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg"; // Profile Icon
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // ✅ Fetch user data & update Navbar on Login/Logout
  const checkUser = () => {
    const storedUser = localStorage.getItem("user");
    try {
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser(); // Initial check

    // ✅ Listen for changes in localStorage
    const handleStorageChange = (e) => {
      if (e.key === "user") checkUser();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar">
      <h2 id="heading">ParkEase</h2>
      <ul id="links">
        <li className="link"> <Link to="/">Home</Link> </li>
        <li className="link"> <Link to="/about">About</Link> </li>
        <li className="link"> <Link to="/contact">Contact</Link> </li>
        <li className="link"> <Link to="/parking-spots">Parking Spots</Link> </li>

        {user ? (
          <li className="link">
            <Link to="/profile">
              <CgProfile className="user-avatar"/> {user.name || "Profile"}
            </Link>
          </li>
        ) : (
          <li className="link logIn">
            <Link to="/login"> <CgProfile className="user-avatar"/> Login </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;