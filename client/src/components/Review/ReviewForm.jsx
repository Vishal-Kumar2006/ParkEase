import { useState } from "react";
import axios from "axios";
import "./ReviewForm.css";

const ReviewForm = ({ parkingId }) => {
  const [reviewData, setReviewData] = useState({
    rating: 0,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reviewData);

    axios
      .post(`http://localhost:5000/parkings/${parkingId}/review/new`, reviewData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setReviewData({
      rating: 0,
      review: "",
      parkingId: parkingId,
    });
  };

  return (
    <div className="ReviewForm-div">
      <h2>Create a Review</h2>
      <form className="ReviewForm">
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
          Review{" "}
        </label>
        <textarea
          name="review"
          id="review"
          className="input"
          onChange={handleChange}
          value={reviewData.review}
        ></textarea>

        <button onClick={handleSubmit}
        className="review-btn">Create Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
