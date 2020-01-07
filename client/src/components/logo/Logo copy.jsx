import React from 'react';
import './Logo.css';

const Logo = props => {
    return (
        <div className="logo-container">
            <div className=" h-100 d-flex align-items-center justify-content-center">
                <div>
                    <h1 className="text-center logo-title my-auto">
                        <i className="fas fa-book-medical mx-2 fa-lg"></i>
                        {props.title}
                        <i className="fas fa-address-book mx-2 fa-lg"></i>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Logo;
