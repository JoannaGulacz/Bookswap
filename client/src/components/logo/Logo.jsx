import React from 'react';

const Logo = props => {
    return (
        <h1 className="text-center">
            <i className="fas fa-book-medical mx-2"></i>
            {props.title}
            <i className="fas fa-address-book mx-2"></i>
        </h1>
    );
};

export default Logo;
