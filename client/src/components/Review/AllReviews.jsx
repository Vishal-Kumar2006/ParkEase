import Review from "./Review.jsx";
import "./AllReview.css";

const AllReviews = ({ reviews, onDeleteReview }) => {
  return (
    <div className="AllReviews">
      {reviews.length === 0 ? (
        <></>
      ) : (
        <>
          <h4 id="reviews-heading">
            {reviews.length} Review's on this Parking
          </h4>
          <hr />
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
