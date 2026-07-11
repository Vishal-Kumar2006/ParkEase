import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoadParking from "../Loading/LoadParking";
import ShowParkings from "./ShowParkings";
import API_URL from "../../config/api";
import ReviewForm from "../Review/ReviewForm";
import PagePagination from "../Body/PagePagination";
import "./AllParking.css";

const AllParkings = () => {
  const [allParkings, setAllParkings] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Fetch Parking's data
  useEffect(() => {
    axios
      .get(`${API_URL}/parkings/all-parkings?page=${page}`, {
        withCredentials: true,
      })
      .then((response) => {
        setAllParkings(response.data.allPakings);
        setCount(response.data.totalPages);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/user/login");
        }
      });
  }, [page]);

  return (
    <div>
      {allParkings.length == 0 || allParkings == null ? (
        <LoadParking />
      ) : (
        <div className="show-All-Parking">
          <ShowParkings parkings={allParkings} />
          <div className="Pagination">
            <PagePagination setPage={setPage} count={count} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParkings;
