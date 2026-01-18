import { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import AllReviews from "./AllReviews";
import "./AllReview.css";

const ReviewHome = ({ parkingId }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await axios.get(
      `http://localhost:5000/reviews/parking/${parkingId}`,
      { withCredentials: true },
    );
    setReviews(res.data);
  };

  useEffect(() => {
    if (parkingId) fetchReviews();
  }, [parkingId]);

  // CREATE
  const handleReviewCreated = () => {
    fetchReviews();
  };

  // DELETE
  const handleReviewDeleted = (reviewId) => {
    setReviews((prev) => prev.filter((review) => review._id !== reviewId));
  };

  // UPDATE
  //   const handleReviewUpdated = (updatedReview) => {
  //     setReviews((prev) =>
  //       prev.map((review) =>
  //         review._id === updatedReview._id ? updatedReview : review,
  //       ),
  //     );
  //   };

  return (
    <div className="ReviewHome">
      <ReviewForm parkingId={parkingId} onReviewAdded={handleReviewCreated} />
      <AllReviews reviews={reviews} onDeleteReview={handleReviewDeleted} />
    </div>
  );
};

export default ReviewHome;
