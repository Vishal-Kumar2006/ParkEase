import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoadParking from "../Loading/LoadParking";
import API_URL from "../../config/api";
import PagePagination from "../Body/PagePagination";
import SearchPage from "../Body/SearchPage";
import ShowParkings from "./ShowParkings";
import "./AllParking.css";

const ElectricParking = () => {
  const [allParkings, setAllParkings] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (query === "") {
      axios
        .get(`${API_URL}/parkings/electric-parking?page=${page}`, {
          withCredentials: true,
        })
        .then((response) => {
          setAllParkings(response.data.allParkings);
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
          `${API_URL}/parkings/search-electric-parking?location=${query}?&page=${page}`,
        )
        .then((response) => {
          setAllParkings(response.data.allPakings);
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
      .get(
        `${API_URL}/parkings/search-electric-parking?location=${query}?&page=${page}`,
      )
      .then((response) => {
        setAllParkings(
          response.data.allPakings.filter((parking) => parking.isElectric),
        );
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
      <SearchPage
        placeHolder={"Search Electric Parking by Location"}
        quequeryrry={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />

      {allParkings.length == 0 || allParkings == null ? (
        <LoadParking />
      ) : (
        <div className="">
          <ShowParkings parkings={allParkings} />
          <div className="Pagination">
            <PagePagination setPage={setPage} count={count} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectricParking;
