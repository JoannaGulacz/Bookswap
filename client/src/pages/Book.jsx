import React from 'react';
import BookForm from '../components/BookForm';

const Book = ({ match: { params } }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BookForm _id={params._id} />
        </div>
    );
};

export default Book;
