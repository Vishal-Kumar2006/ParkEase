import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoadParking from "../Loading/LoadParking";
import ShowParkings from "./ShowParkings";

const AllParkings = () => {
  const [allParkings, setAllParkings] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch Parking's data
  useEffect(() => {
    axios
      .get("http://localhost:5000/parkings", { withCredentials: true })
      .then((response) => {
        setAllParkings(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/user/login");
        }
      });
  }, []);

  return (
    <div>
      {allParkings.length == 0 || allParkings == null ? (
        <LoadParking />
      ) : (
        <ShowParkings parkings={allParkings} />
      )}
    </div>
  );
};

export default AllParkings;
