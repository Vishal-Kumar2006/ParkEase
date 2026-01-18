import "./AllReview.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Review = ({ review, onDelete }) => {
  const { user } = useAuth();

  const isOwner = user && review.userId._id === user._id;

  const handleDeleteReview = async () => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${review._id}`, {
        withCredentials: true,
      });
      onDelete(review._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Review">
      <div className="review-header">
        <div className="review-user">
          <img src={review.userId.photo} alt="User Image" />
          <h4>{review.userId.name}</h4>
        </div>

        {isOwner && (
          <button className="delete-btn" onClick={handleDeleteReview}>
            Delete
          </button>
        )}
      </div>

      <div className="review-content">
        <p>{review.review}</p>
        <div className="rating">
          <p id="heart">❤️</p>
          <p id="rating-count">{review.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
