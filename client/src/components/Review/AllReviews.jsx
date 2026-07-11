import Review from "./Review.jsx";
import "./AllReview.css";

const AllReviews = ({ reviews, onDeleteReview }) => {
  return (
    <div className="AllReviews">
      {reviews.length === 0 ? (
        <></>
      ) : (
        <>
          <h4 id="reviews-heading">All Reviews are given below</h4>
          {reviews.map((review) => (
            <Review
              key={review._id}
              review={review}
              onDelete={onDeleteReview}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default AllReviews;
