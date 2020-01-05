import React from 'react';
import CategoryForm from '../components/CategoryForm';

const Category = ({ match: { params } }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CategoryForm _id={params._id} />
        </div>
    );
};

export default Category;
