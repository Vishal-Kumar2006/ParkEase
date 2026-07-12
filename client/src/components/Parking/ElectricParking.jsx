import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AllParking.css";
import "./ElectricParking.css";
import LoadParking from "../Loading/LoadParking";
import API_URL from "../../config/api";
import PagePagination from "../Body/PagePagination";
import SearchPage from "../Body/SearchPage";

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
            navigate("/user/login");
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
            navigate("/user/login");
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
        setAllParkings(response.data.allPakings);
        setCount(response.data.totalPages);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/user/login");
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
        <div className="show-All-Parking">
          <div className="Electric-Parkings">
            {allParkings
              .filter((parking) => parking.isElectric) // ✅ Filter only electric parkings
              .map((parking) => (
                <div key={parking._id} className="Electric-parking-card">
                  {parking.image ? (
                    <img
                      src={parking.image}
                      alt="Parking"
                      className="Electric-parking-img"
                    />
                  ) : null}

                  <div className="Electric-detail">
                    <h2 className="Electric-parking-name">{parking.name}</h2>
                    <p className="Electric-parking-status">
                      {parking.isOpen ? (
                        <span className="open">Opened</span>
                      ) : (
                        <span className="close">Closed</span>
                      )}
                    </p>
                  </div>
                  <p className="Electric-parking-address">
                    <strong>Address:</strong> {parking.location}
                  </p>
                  <div className="Electric-parkings-btn">
                    <button
                      onClick={() => navigate(`/parkings/${parking._id}`)}
                      className="Electric-parking-btn">
                      See Parking
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="Pagination">
            <PagePagination setPage={setPage} count={count} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectricParking;
