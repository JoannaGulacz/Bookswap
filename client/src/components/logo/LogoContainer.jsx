import React from 'react';

const LogoContainer = props => {
    return (
        <div className="logo-container">
            <div className=" h-100 d-flex align-items-center justify-content-center">{props.children}</div>
        </div>
    );
};

export default LogoContainer;
