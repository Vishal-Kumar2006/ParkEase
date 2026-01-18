import { useState } from "react";
import axios from "axios";
import "./ReviewForm.css";

const ReviewForm = ({ parkingId, onReviewAdded }) => {
  const [reviewData, setReviewData] = useState({
    rating: 5,
    review: "",
    parkingId: parkingId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]:
        name === "rating" ? Math.min(5, Math.max(1, Number(value))) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewData.review.trim()) {
      alert("Review cannot be empty");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/parkings/${parkingId}/review/new`,
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
      <h2>Create a Review</h2>
      <form className="ReviewForm">
        <div className="form-data">
          <label htmlFor="rating" className="form-label">
            Parking Rating
          </label>
          <input
            className="form-range"
            id="customRange1"
            type="range"
            min={1}
            max={5}
            name="rating"
            onChange={handleChange}
            value={reviewData.rating}
          />

          <label htmlFor="review" className="form-label">
            Review
          </label>

          <textarea
            name="review"
            id="review"
            className="input"
            onChange={handleChange}
            value={reviewData.review}
            required
          />
        </div>

        <button onClick={handleSubmit} className="review-btn">
          Create Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
