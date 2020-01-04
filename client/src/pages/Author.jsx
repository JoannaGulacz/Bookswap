import React from 'react';
import AuthorForm from '../components/AuthorForm';

const Author = ({ match: { params } }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AuthorForm _id={params._id} />
        </div>
    );
};

export default Author;
