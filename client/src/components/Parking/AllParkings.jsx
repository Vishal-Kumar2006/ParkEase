import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoadParking from "../Loading/LoadParking";
import ShowParkings from "./ShowParkings";
import API_URL from "../../config/api";
import PagePagination from "../Body/PagePagination";
import SearchPage from "../Body/SearchPage";
import Reveal from "../Body/Reveal.jsx";
import "./AllParking.css";

const AllParkings = () => {
  const [allParkings, setAllParkings] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  // Fetch Parking's data
  useEffect(() => {
    if (query === "") {
      axios
        .get(`${API_URL}/parkings/all-parkings?page=${page}`, {
          withCredentials: true,
        })
        .then((response) => {
          setAllParkings(response.data.optimizedParkings);
          setCount(response.data.totalPages);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            navigate("/user/signup");
          }
        });
    } else {
      axios
        .get(
          `${API_URL}/parkings/search-parking?location=${query}?&page=${page}`,
        )
        .then((response) => {
          setAllParkings(response.data.optimizedParkings);
          setCount(response.data.totalPages);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            navigate("/user/signup");
          }
        });
    }
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .get(`${API_URL}/parkings/search-parking?location=${query}&page=${page}`)
      .then((response) => {
        setAllParkings(response.data.allParkings);
        setCount(response.data.totalPages);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/user/signup");
        }
      });
  };

  return (
    <div>
      <Reveal>
        <SearchPage
          placeHolder={"Search Parking by Location"}
          quequeryrry={query}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
        />
      </Reveal>

      {allParkings == null || allParkings.length == 0 ? (
        <LoadParking />
      ) : (
        <div className="">
          <ShowParkings parkings={allParkings} />
          <div className="Pagination">
            <Reveal>
              <PagePagination setPage={setPage} count={count} />
            </Reveal>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParkings;
