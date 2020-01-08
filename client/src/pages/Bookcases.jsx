import React from 'react';
import BookcasesForm from '../components/bookcases/BookcasesForm';
import AddBookcaseButton from '../components/bookcases/AddBookcaseButton';

const Bookcases = () => {
    return (
        <div>
            <AddBookcaseButton />
            <BookcasesForm />
        </div>
    );
};

export default Bookcases;
