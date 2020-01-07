import React from 'react';
import BookcasesForm from '../components/BookcasesForm';
import AddBookcaseButton from '../components/AddBookcaseButton';

const Bookcases = () => {
    return (
        <div>
            <AddBookcaseButton />
            <BookcasesForm />
        </div>
    );
};

export default Bookcases;
