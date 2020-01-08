import React from 'react';
import AddReviewForm from '../components/reviews/AddReviewForm';

const Review = ({ match: { params } }) => {
    return (
        <div>
            <AddReviewForm _id={params._id} />
        </div>
    );
};

export default Review;
