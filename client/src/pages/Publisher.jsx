import React from 'react';
import PublisherForm from '../components/PublisherForm';

const Publisher = ({ match: { params } }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PublisherForm _id={params._id} />
        </div>
    );
};

export default Publisher;
