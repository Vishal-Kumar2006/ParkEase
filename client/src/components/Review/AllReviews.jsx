import Review from "../Review/Review.jsx";
import "./Review.css";


const AllReviews = ({ allReviews }) => {
  return (
    <div className="AllReviews">
      {allReviews.length == 0 ? (
        <h1 >There is no Review Created</h1>
      ) : (
        <div>
            <h4 id="reviews-heading">All Reviews are given below</h4>
            
            <h6 id="reviews-sub-heading">Refresh to see new Review's</h6>
          {allReviews.map((review, id) => (<Review key={id} reviewId={review} />))}

        </div>
      )}
    </div>
  );
};

export default AllReviews;
