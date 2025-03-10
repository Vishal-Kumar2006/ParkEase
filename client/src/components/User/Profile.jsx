import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ Hook for navigation

  useEffect(() => {
    fetch("http://localhost:5000/user", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          navigate("/user/login"); // ✅ Redirect to login if no user
        }
      })
      .catch(() => navigate("/user/login")); // ✅ Handle errors by redirecting
  }, [navigate]);

  return user ? <h1>Welcome, {user.name}!</h1> : null;
};

export default Profile;
