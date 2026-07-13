import "./AllReview.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";
import Rating from "@mui/material/Rating";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Review = ({ review, onDelete }) => {
  const { user } = useAuth();

  const isOwner = user && review.userId._id === user._id;

  const handleDeleteReview = async () => {
    try {
      await axios.delete(`${API_URL}/reviews/${review._id}`, {
        withCredentials: true,
      });
      onDelete(review._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Review">
      <div className="review-user-details">
        <img src={review.userId.photo} alt="User Image" />
      </div>

      <div className="review-content">
        <div className="review-user-controlls">
          <h4>{review.userId.name}</h4>
          {isOwner && (
            <>
              <button className="delete-btn" onClick={handleDeleteReview}>
                <MoreHorizIcon />
                <div className=""></div>
              </button>
            </>
          )}
        </div>
        <div className="review-content-details">
          <div className="rating">
            <Rating name="read-only" value={review.rating} readOnly max={10} />
          </div>
          <p>{review.review}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
