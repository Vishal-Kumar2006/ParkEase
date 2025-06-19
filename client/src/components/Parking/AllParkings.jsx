import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ShowParkings from "./ShowParkings";

const AllParkings = () => {
  const [allParkings, setAllParkings] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    axios.get("http://localhost:5000/parkings", { withCredentials: true })
    .then(response => {
        setAllParkings(response.data)
    })
    .catch(error => {
        if (error.response && error.response.status === 401) {
            navigate("/user/login");
        } else {
            console.error("Error fetching parkings:", error);
        }
    });
  }, []);

  return (
    <div>
      <ShowParkings parkings={allParkings} />
    </div>
  );
};

export default AllParkings;
