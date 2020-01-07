import React from 'react';

const LogoTitle = props => {
    return (
        <div>
            <h1 className="text-center logo-title my-auto">
                <i className="fas fa-book-medical mx-2 fa-lg"></i>
                {props.title}
                <i className="fas fa-address-book mx-2 fa-lg"></i>
            </h1>
        </div>
    );
};

export default LogoTitle;
