import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./Review.css";

const Review = ({ reviewId }) => {
  const [currReview, setCurrReview] = useState(null);
  const [error, setError] = useState(null);
  const [reviewAdmin, setReviewAdmin] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/reviews/${reviewId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setCurrReview(response.data);
        setError(null); // Clear errors if successful
      })
      .catch((error) => {
        console.log("Error", error);
        setError("Failed to fetch review. Please try again.");
      });
  }, [reviewId]);

  useEffect(() => {
    if (currReview?.userId) {
      // Check if userId exists
      axios
        .get(`http://localhost:5000/user/${currReview.userId}`, {
          withCredentials: true,
        })
        .then((response) => {
          setReviewAdmin(response.data);
          setError(null); // Clear previous errors
        })
        .catch(() => {
          setError("Error fetching Review admin!");
        });
    }
  }, [currReview]);

  const handleDeleteReview = () => {
    axios
      .delete(`http://localhost:5000/reviews/${reviewId}`)
      .then((res) => {
        alert("Review deletd sucessfully.");
      });
  };

  return (
    <div className="Review">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {currReview ? (
        <div>
          {reviewAdmin ? (
            <div className="review-admin">
              <img src={reviewAdmin.photo} alt="" />
              <h3>{reviewAdmin.name}</h3>
            </div>
          ) : (
            ""
          )}
          <div className="review-content">
            <p>{currReview.review}</p>
            <div>
              <FaHeart />
              <p> {currReview.rating}</p>
            </div>
          </div>
          <button id="delete-btn" onClick={handleDeleteReview}>
            delete
          </button>
        </div>
      ) : !error ? (
        <p>Loading review...</p>
      ) : null}
    </div>
  );
};

export default Review;
