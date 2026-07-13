import { useState } from "react";
import axios from "axios";
import "./ReviewForm.css";
import API_URL from "../../config/api";
import Rating from "@mui/material/Rating";
import { useAuth } from "../../context/AuthContext";

const ReviewForm = ({ parkingId, onReviewAdded }) => {
  const [reviewData, setReviewData] = useState({
    rating: 5,
    review: "",
    parkingId: parkingId,
  });

  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]:
        name === "rating" ? Math.min(5, Math.max(1, Number(value))) : value,
    }));
    console.log(reviewData.rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewData.review.trim()) {
      alert("Review cannot be empty");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/parkings/${parkingId}/review/new`,
        reviewData,
        { withCredentials: true },
      );

      onReviewAdded();
    } catch (error) {
      console.log(error);
    }

    setReviewData({
      rating: 5,
      review: "",
      parkingId,
    });
  };

  return (
    <div className="ReviewForm-div">
      <img className="review-user-img" src={user.photo} alt="User Image" />

      <form className="ReviewForm">
        <div className="form-data">
          <Rating
            name="size-medium"
            defaultValue={2}
            max={10}
            min={1}
            onChange={(_, newValue) => {
              setReviewData({
                ...reviewData,
                rating: newValue,
              });
            }}
          />
          <textarea
            name="review"
            className="review-input-textArea"
            onChange={handleChange}
            value={reviewData.review}
            required
          />
        </div>

        <div className="review-Button-div">
          <button onClick={handleSubmit} className="review-btn">
            Create Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
